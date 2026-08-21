from http.server import BaseHTTPRequestHandler
import os
import sys

sys.path.insert(0, os.path.dirname(__file__))
from _common import send_json, read_json_body, cors_headers


class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            data = read_json_body(self)
            supplied = data.get('password', '')
            admin_password = os.environ.get('ADMIN_PASSWORD')

            if not admin_password:
                send_json(self, 500, {"error": "Admin password is not configured on the server."})
                return

            if supplied == admin_password:
                send_json(self, 200, {"success": True})
            else:
                send_json(self, 401, {"success": False, "error": "Incorrect password."})
        except Exception as e:
            send_json(self, 500, {"error": str(e)})

    def do_OPTIONS(self):
        self.send_response(200)
        cors_headers(self)
        self.end_headers()
