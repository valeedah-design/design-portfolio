from http.server import BaseHTTPRequestHandler
import os
import sys
import uuid
from datetime import datetime, timezone

sys.path.insert(0, os.path.dirname(__file__))
from _common import get_db, send_json, read_json_body, cors_headers, is_admin


class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        try:
            db = get_db()
            projects = list(
                db.projects.find({}, {"_id": 0}).sort([("category", 1), ("subsection", 1), ("order", 1)])
            )
            send_json(self, 200, projects)
        except Exception as e:
            send_json(self, 500, {"error": str(e)})

    def do_POST(self):
        if not is_admin(self):
            send_json(self, 401, {"error": "Unauthorized"})
            return
        try:
            data = read_json_body(self)
            db = get_db()

            project = {
                "id": str(uuid.uuid4()),
                "category": data.get("category", "Digital Designs"),
                "subsection": data.get("subsection", "App Designs"),
                "title": data.get("title", ""),
                "description": data.get("description", ""),
                "tag": data.get("tag", ""),
                "tags": data.get("tags", []),
                "image": data.get("image", ""),
                "bgColor": data.get("bgColor", "black"),
                "type": data.get("type", ""),
                "order": data.get("order", 0),
                "created_at": datetime.now(timezone.utc).isoformat(),
                "updated_at": datetime.now(timezone.utc).isoformat(),
            }

            db.projects.insert_one(dict(project))
            send_json(self, 201, project)
        except Exception as e:
            send_json(self, 500, {"error": str(e)})

    def do_OPTIONS(self):
        self.send_response(200)
        cors_headers(self)
        self.end_headers()
