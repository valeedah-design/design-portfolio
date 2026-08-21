from http.server import BaseHTTPRequestHandler
import json
import os
import sys
import uuid
from datetime import datetime, timezone
from urllib.parse import urlparse, parse_qs
from pymongo import MongoClient

sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from _lib.auth_helper import verify_token_from_header


def get_db():
    mongo_url = os.environ.get('MONGO_URL')
    db_name = os.environ.get('DB_NAME', 'portfolio_db')
    client = MongoClient(mongo_url)
    return client, client[db_name]


class handler(BaseHTTPRequestHandler):
    def _send_json(self, status, payload):
        self.send_response(status)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.end_headers()
        self.wfile.write(json.dumps(payload).encode())

    def _require_auth(self):
        if not verify_token_from_header(self.headers):
            self._send_json(401, {"error": "Unauthorized"})
            return False
        return True

    def _get_query_id(self):
        parsed = urlparse(self.path)
        qs = parse_qs(parsed.query)
        return qs.get('id', [None])[0]

    # ---- GET: public, list all projects ----
    def do_GET(self):
        try:
            client, db = get_db()
            projects = list(
                db.projects.find({}, {"_id": 0}).sort([("category", 1), ("subsection", 1), ("order", 1)])
            )
            client.close()
            self._send_json(200, projects)
        except Exception as e:
            self._send_json(500, {"error": str(e)})

    # ---- POST: create a project (auth required) ----
    def do_POST(self):
        if not self._require_auth():
            return
        try:
            content_length = int(self.headers.get('Content-Length', 0))
            post_data = self.rfile.read(content_length) if content_length else b'{}'
            data = json.loads(post_data.decode('utf-8'))

            if not data.get('title') or not data.get('category'):
                self._send_json(400, {"error": "title and category are required"})
                return

            project = {
                "id": str(uuid.uuid4()),
                "category": data.get('category'),
                "subsection": data.get('subsection'),
                "title": data.get('title'),
                "description": data.get('description', ''),
                "tag": data.get('tag'),
                "tags": data.get('tags', []),
                "image": data.get('image'),
                "bgColor": data.get('bgColor', 'black'),
                "order": data.get('order', 0),
                "createdAt": datetime.now(timezone.utc).isoformat(),
            }

            client, db = get_db()
            db.projects.insert_one(project)
            client.close()

            project.pop('_id', None)
            self._send_json(201, project)
        except Exception as e:
            self._send_json(500, {"error": str(e)})

    # ---- PUT: update a project by ?id= (auth required) ----
    def do_PUT(self):
        if not self._require_auth():
            return
        try:
            project_id = self._get_query_id()
            if not project_id:
                self._send_json(400, {"error": "id query parameter is required"})
                return

            content_length = int(self.headers.get('Content-Length', 0))
            post_data = self.rfile.read(content_length) if content_length else b'{}'
            data = json.loads(post_data.decode('utf-8'))

            allowed_fields = ['category', 'subsection', 'title', 'description', 'tag', 'tags', 'image', 'bgColor', 'order']
            update_doc = {k: v for k, v in data.items() if k in allowed_fields}

            if not update_doc:
                self._send_json(400, {"error": "No valid fields to update"})
                return

            client, db = get_db()
            result = db.projects.update_one({"id": project_id}, {"$set": update_doc})
            client.close()

            if result.matched_count == 0:
                self._send_json(404, {"error": "Project not found"})
                return

            self._send_json(200, {"id": project_id, "updated": True})
        except Exception as e:
            self._send_json(500, {"error": str(e)})

    # ---- DELETE: remove a project by ?id= (auth required) ----
    def do_DELETE(self):
        if not self._require_auth():
            return
        try:
            project_id = self._get_query_id()
            if not project_id:
                self._send_json(400, {"error": "id query parameter is required"})
                return

            client, db = get_db()
            result = db.projects.delete_one({"id": project_id})
            client.close()

            if result.deleted_count == 0:
                self._send_json(404, {"error": "Project not found"})
                return

            self._send_json(200, {"id": project_id, "deleted": True})
        except Exception as e:
            self._send_json(500, {"error": str(e)})

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.end_headers()
