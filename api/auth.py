from http.server import BaseHTTPRequestHandler
import json
import sys
import os

sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from _lib.auth_helper import check_credentials, create_token


class handler(BaseHTTPRequestHandler):
    def _send_json(self, status, payload):
        self.send_response(status)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.end_headers()
        self.wfile.write(json.dumps(payload).encode())

    def do_POST(self):
        try:
            content_length = int(self.headers.get('Content-Length', 0))
            post_data = self.rfile.read(content_length) if content_length else b'{}'
            data = json.loads(post_data.decode('utf-8'))

            username = data.get('username', '')
            password = data.get('password', '')

            if not username or not password:
                self._send_json(400, {"error": "username and password are required"})
                return

            if check_credentials(username, password):
                token = create_token(username)
                self._send_json(200, {"token": token})
            else:
                self._send_json(401, {"error": "Invalid username or password"})

        except Exception as e:
            self._send_json(500, {"error": str(e)})

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.end_headers()
