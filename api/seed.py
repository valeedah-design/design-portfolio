from http.server import BaseHTTPRequestHandler
from urllib.parse import urlparse, parse_qs
import os
import sys
import uuid
from datetime import datetime, timezone

sys.path.insert(0, os.path.dirname(__file__))
from _common import get_db, send_json, cors_headers, is_admin

# The projects that were previously hardcoded in WorksPage.jsx.
# This lets us migrate them into the database once, so nothing is lost
# when the site switches over to reading from the CMS.
DEFAULT_PROJECTS = [
    {"category": "Digital Designs", "subsection": "App Designs", "title": "FOODQ", "description": "Bringing Food and People Together", "tag": "Case study", "tags": [], "image": "https://customer-assets.emergentagent.com/job_work-gallery-139/artifacts/7uckbj7f_iPhone%2016%20Pro%20mockup%20natural%20titanium.png", "bgColor": "green", "type": "", "order": 1},
    {"category": "Digital Designs", "subsection": "App Designs", "title": "CCJournal", "description": "Find your career and passion", "tag": "", "tags": [], "image": "https://customer-assets.emergentagent.com/job_work-gallery-139/artifacts/hmaa12tg_jjjjj.png", "bgColor": "black", "type": "", "order": 2},
    {"category": "Digital Designs", "subsection": "App Designs", "title": "The Guardian", "description": "Redesign of the news app", "tag": "", "tags": ["Case study", "Redesign"], "image": "https://customer-assets.emergentagent.com/job_work-gallery-139/artifacts/zyxmw9wv_jjjjjjj.png", "bgColor": "black", "type": "", "order": 3},
    {"category": "Digital Designs", "subsection": "App Designs", "title": "Compocity", "description": "Foodwaste to compost", "tag": "", "tags": [], "image": "https://customer-assets.emergentagent.com/job_work-gallery-139/artifacts/d87y6hdm_comp.png", "bgColor": "black", "type": "", "order": 4},
    {"category": "Digital Designs", "subsection": "Web Design", "title": "Portfolio Website", "description": "Personal portfolio showcase", "tag": "Web", "tags": [], "image": "", "bgColor": "black", "type": "", "order": 1},
    {"category": "Digital Designs", "subsection": "Web Design", "title": "E-commerce Platform", "description": "Modern shopping experience", "tag": "Web", "tags": [], "image": "", "bgColor": "black", "type": "", "order": 2},
    {"category": "Digital Designs", "subsection": "Web Design", "title": "SaaS Dashboard", "description": "Analytics and insights", "tag": "Web", "tags": [], "image": "", "bgColor": "black", "type": "", "order": 3},
    {"category": "Research Lab", "subsection": "", "title": "FEAST TO YOUR EYES : Postmortem", "description": "", "tag": "", "tags": [], "image": "", "bgColor": "transparent", "type": "text", "order": 1},
    {"category": "Research Lab", "subsection": "", "title": "Card sorting experiment on Compocity app users", "description": "", "tag": "", "tags": [], "image": "", "bgColor": "transparent", "type": "text", "order": 2},
]


class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        if not is_admin(self):
            send_json(self, 401, {"error": "Unauthorized"})
            return
        try:
            db = get_db()
            query = parse_qs(urlparse(self.path).query)
            force = query.get('force', ['false'])[0].lower() == 'true'

            existing_count = db.projects.count_documents({})
            if existing_count > 0 and not force:
                send_json(self, 200, {
                    "skipped": True,
                    "message": f"Projects collection already has {existing_count} item(s). Nothing changed. Add ?force=true to seed anyway.",
                })
                return

            now = datetime.now(timezone.utc).isoformat()
            docs = []
            for item in DEFAULT_PROJECTS:
                doc = dict(item)
                doc["id"] = str(uuid.uuid4())
                doc["created_at"] = now
                doc["updated_at"] = now
                docs.append(doc)

            db.projects.insert_many(docs)
            send_json(self, 201, {"success": True, "inserted": len(docs)})
        except Exception as e:
            send_json(self, 500, {"error": str(e)})

    def do_OPTIONS(self):
        self.send_response(200)
        cors_headers(self)
        self.end_headers()
