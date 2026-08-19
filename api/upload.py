from http.server import BaseHTTPRequestHandler
import json
import os
import sys
import cgi
import io
import uuid
import vercel_blob

sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from _lib.auth_helper import verify_token_from_header

ALLOWED_EXTENSIONS = {'.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg'}
MAX_BYTES = 4 * 1024 * 1024  # keep under Vercel's 4.5MB function body limit


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
        if not verify_token_from_header(self.headers):
            self._send_json(401, {"error": "Unauthorized"})
            return

        try:
            content_type = self.headers.get('Content-Type', '')
            if 'multipart/form-data' not in content_type:
                self._send_json(400, {"error": "Expected multipart/form-data with a 'file' field"})
                return

            content_length = int(self.headers.get('Content-Length', 0))
            if content_length > MAX_BYTES:
                self._send_json(413, {"error": "File too large. Max 4MB per upload."})
                return

            body = self.rfile.read(content_length)

            form = cgi.FieldStorage(
                fp=io.BytesIO(body),
                headers=self.headers,
                environ={'REQUEST_METHOD': 'POST', 'CONTENT_TYPE': content_type},
            )

            if 'file' not in form:
                self._send_json(400, {"error": "No 'file' field found in upload"})
                return

            file_field = form['file']
            filename = file_field.filename or 'upload'
            ext = os.path.splitext(filename)[1].lower()

            if ext not in ALLOWED_EXTENSIONS:
                self._send_json(400, {"error": f"Unsupported file type: {ext}"})
                return

            file_bytes = file_field.file.read()
            unique_name = f"projects/{uuid.uuid4().hex}{ext}"

            result = vercel_blob.put(unique_name, file_bytes, {"access": "public"})

            self._send_json(200, {"url": result.get("url")})

        except Exception as e:
            self._send_json(500, {"error": str(e)})

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.end_headers()
