from http.server import BaseHTTPRequestHandler
import json
import os
import sys

sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from _lib.auth_helper import (
    verify_token_from_header,
    check_credentials,
    save_credentials,
    get_stored_credentials,
)

MIN_PASSWORD_LENGTH = 10


class handler(BaseHTTPRequestHandler):
    def _send_json(self, status, payload):
        self.send_response(status)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.end_headers()
        self.wfile.write(json.dumps(payload).encode())

    # POST /api/change_password  (login required)
    # body: { currentUsername, currentPassword, newUsername?, newPassword }
    def do_POST(self):
        if not verify_token_from_header(self.headers):
            self._send_json(401, {"error": "Unauthorized"})
            return
        try:
            length = int(self.headers.get('Content-Length', 0))
            data = json.loads((self.rfile.read(length) if length else b'{}').decode('utf-8'))

            current_username = (data.get('currentUsername') or '').strip()
            current_password = data.get('currentPassword') or ''
            new_username = (data.get('newUsername') or '').strip() or current_username
            new_password = data.get('newPassword') or ''

            if not current_username or not current_password or not new_password:
                self._send_json(400, {"error": "Fill in your current username, current password and new password."})
                return
            if len(new_password) < MIN_PASSWORD_LENGTH:
                self._send_json(400, {"error": f"New password must be at least {MIN_PASSWORD_LENGTH} characters."})
                return
            if not check_credentials(current_username, current_password):
                self._send_json(403, {"error": "Current username or password is wrong."})
                return

            save_credentials(new_username, new_password)
            if not get_stored_credentials():
                self._send_json(500, {"error": "Could not save the new password. Try again."})
                return
            self._send_json(200, {"ok": True, "username": new_username})
        except Exception:
            self._send_json(500, {"error": "Could not change the password. Try again."})

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.end_headers()
