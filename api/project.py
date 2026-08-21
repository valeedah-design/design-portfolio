from http.server import BaseHTTPRequestHandler
from urllib.parse import urlparse, parse_qs
import os
import sys
from datetime import datetime, timezone

sys.path.insert(0, os.path.dirname(__file__))
from _common import get_db, send_json, read_json_body, cors_headers, is_admin


def get_id(handler):
    query = parse_qs(urlparse(handler.path).query)
    values = query.get('id')
    return values[0] if values else None


class handler(BaseHTTPRequestHandler):
    def do_PUT(self):
        if not is_admin(self):
            send_json(self, 401, {"error": "Unauthorized"})
            return
        project_id = get_id(self)
        if not project_id:
            send_json(self, 400, {"error": "Missing ?id= in URL"})
            return
        try:
            data = read_json_body(self)
            db = get_db()

            update_fields = {}
            for field in ["category", "subsection", "title", "description", "tag", "tags", "image", "bgColor", "type", "order"]:
                if field in data:
                    update_fields[field] = data[field]
            update_fields["updated_at"] = datetime.now(timezone.utc).isoformat()

            result = db.projects.update_one({"id": project_id}, {"$set": update_fields})
            if result.matched_count == 0:
                send_json(self, 404, {"error": "Project not found"})
                return

            updated = db.projects.find_one({"id": project_id}, {"_id": 0})
            send_json(self, 200, updated)
        except Exception as e:
            send_json(self, 500, {"error": str(e)})

    def do_DELETE(self):
        if not is_admin(self):
            send_json(self, 401, {"error": "Unauthorized"})
            return
        project_id = get_id(self)
        if not project_id:
            send_json(self, 400, {"error": "Missing ?id= in URL"})
            return
        try:
            db = get_db()
            result = db.projects.delete_one({"id": project_id})
            if result.deleted_count == 0:
                send_json(self, 404, {"error": "Project not found"})
                return
            send_json(self, 200, {"success": True})
        except Exception as e:
            send_json(self, 500, {"error": str(e)})

    def do_OPTIONS(self):
        self.send_response(200)
        cors_headers(self)
        self.end_headers()
