"""
Shared helpers for the Vercel Python serverless functions in this folder.
This file is NOT itself an API route (Vercel ignores files starting with "_"),
it's just imported by the other files.
"""
import os
import json
from pymongo import MongoClient

_client = None


def get_db():
    """Return a MongoDB database handle, reusing the connection across warm invocations."""
    global _client
    if _client is None:
        mongo_url = os.environ.get('MONGO_URL')
        _client = MongoClient(mongo_url)
    db_name = os.environ.get('DB_NAME', 'portfolio_db')
    return _client[db_name]


def cors_headers(handler, extra_methods="GET, POST, PUT, DELETE, OPTIONS"):
    """Send the standard CORS headers this project already uses everywhere."""
    handler.send_header('Access-Control-Allow-Origin', '*')
    handler.send_header('Access-Control-Allow-Methods', extra_methods)
    handler.send_header('Access-Control-Allow-Headers', 'Content-Type, X-Admin-Password')


def send_json(handler, status, payload):
    handler.send_response(status)
    handler.send_header('Content-type', 'application/json')
    cors_headers(handler)
    handler.end_headers()
    handler.wfile.write(json.dumps(payload, default=str).encode())


def is_admin(handler):
    """Check the X-Admin-Password header against the ADMIN_PASSWORD env var."""
    admin_password = os.environ.get('ADMIN_PASSWORD')
    if not admin_password:
        # No password configured on the server -> lock everything down by default.
        return False
    supplied = handler.headers.get('X-Admin-Password')
    return supplied is not None and supplied == admin_password


def read_json_body(handler):
    length = int(handler.headers.get('Content-Length', 0))
    if length == 0:
        return {}
    raw = handler.rfile.read(length)
    return json.loads(raw.decode('utf-8'))
