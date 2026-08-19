"""
Run this locally once to generate the ADMIN_PASSWORD_HASH value you'll set
as an environment variable in Vercel.

Usage:
    pip install bcrypt
    python scripts/generate_password_hash.py
"""
import bcrypt
import getpass

password = getpass.getpass("Choose your admin password: ")
confirm = getpass.getpass("Confirm password: ")

if password != confirm:
    print("Passwords don't match. Try again.")
else:
    hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    print("\nAdd this to your Vercel Environment Variables as ADMIN_PASSWORD_HASH:\n")
    print(hashed.decode('utf-8'))
