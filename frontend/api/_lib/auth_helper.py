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


def _get_db():
    from pymongo import MongoClient
    client = MongoClient(os.environ.get("MONGO_URL"), serverSelectionTimeoutMS=8000)
    return client, client[os.environ.get("DB_NAME", "portfolio_db")]


def get_stored_credentials():
    """Credentials saved from the admin panel (settings collection), or None.
    When none are saved yet, the ADMIN_USERNAME / ADMIN_PASSWORD_HASH env vars apply."""
    try:
        client, db = _get_db()
        doc = db.settings.find_one({"_id": "admin_credentials"})
        client.close()
    except Exception:
        return None
    if doc and doc.get("username") and doc.get("password_hash"):
        return doc["username"], doc["password_hash"]
    return None


def _expected_credentials():
    stored = get_stored_credentials()
    if stored:
        return stored
    username = (os.environ.get("ADMIN_USERNAME") or "").strip()
    pw_hash = (os.environ.get("ADMIN_PASSWORD_HASH") or "").strip().strip('"').strip("'")
    if not username or not pw_hash:
        raise RuntimeError("ADMIN_USERNAME / ADMIN_PASSWORD_HASH not configured")
    return username, pw_hash


def check_credentials(username, password):
    """Verify a submitted username/password. Credentials changed from the admin
    panel (stored in MongoDB) take priority over the env vars.
    The username check ignores case and surrounding spaces."""
    expected_username, expected_hash = _expected_credentials()

    if (username or "").strip().lower() != expected_username.strip().lower():
        return False

    try:
        return bcrypt.checkpw(password.encode("utf-8"), expected_hash.encode("utf-8"))
    except ValueError:
        return False


def save_credentials(username, new_password):
    """Hash and store new admin credentials in MongoDB."""
    pw_hash = bcrypt.hashpw(new_password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")
    client, db = _get_db()
    db.settings.update_one(
        {"_id": "admin_credentials"},
        {"$set": {
            "username": username.strip(),
            "password_hash": pw_hash,
            "updatedAt": datetime.now(timezone.utc).isoformat(),
        }},
        upsert=True,
    )
    client.close()


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
