import os
import jwt
import bcrypt
from datetime import datetime, timezone, timedelta

JWT_ALGORITHM = "HS256"
TOKEN_LIFETIME_HOURS = 24 * 7  # 7 days


def _get_secret():
    secret = os.environ.get("JWT_SECRET")
    if not secret:
        raise RuntimeError("JWT_SECRET environment variable is not set")
    return secret


def check_credentials(username, password):
    """Verify a submitted username/password against env vars.
    ADMIN_USERNAME is plain text.
    ADMIN_PASSWORD_HASH is a bcrypt hash (generate with generate_password_hash.py).
    """
    expected_username = os.environ.get("ADMIN_USERNAME")
    expected_hash = os.environ.get("ADMIN_PASSWORD_HASH")

    if not expected_username or not expected_hash:
        raise RuntimeError("ADMIN_USERNAME / ADMIN_PASSWORD_HASH not configured")

    if username != expected_username:
        return False

    try:
        return bcrypt.checkpw(password.encode("utf-8"), expected_hash.encode("utf-8"))
    except ValueError:
        return False


def create_token(username):
    payload = {
        "sub": username,
        "iat": datetime.now(timezone.utc),
        "exp": datetime.now(timezone.utc) + timedelta(hours=TOKEN_LIFETIME_HOURS),
    }
    return jwt.encode(payload, _get_secret(), algorithm=JWT_ALGORITHM)


def verify_token_from_header(headers):
    """headers: dict-like of request headers. Returns True if a valid Bearer token is present."""
    auth_header = headers.get("Authorization") or headers.get("authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        return False

    token = auth_header.split(" ", 1)[1].strip()
    try:
        jwt.decode(token, _get_secret(), algorithms=[JWT_ALGORITHM])
        return True
    except jwt.PyJWTError:
        return False
