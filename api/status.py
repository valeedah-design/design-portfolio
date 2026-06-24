from http.server import BaseHTTPRequestHandler
import json
import os
from pymongo import MongoClient
from datetime import datetime, timezone
import uuid

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            # Read request body
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))
            
            # Connect to MongoDB
            mongo_url = os.environ.get('MONGO_URL')
            db_name = os.environ.get('DB_NAME', 'portfolio_db')
            
            client = MongoClient(mongo_url)
            db = client[db_name]
            
            # Create status check document
            status_check = {
                "id": str(uuid.uuid4()),
                "client_name": data.get('client_name', 'Anonymous'),
                "timestamp": datetime.now(timezone.utc).isoformat()
            }
            
            # Insert into database
            db.status_checks.insert_one(status_check)
            
            # Remove MongoDB _id for response
            status_check.pop('_id', None)
            
            # Send response
            self.send_response(201)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
            self.send_header('Access-Control-Allow-Headers', 'Content-Type')
            self.end_headers()
            
            self.wfile.write(json.dumps(status_check).encode())
            
            client.close()
            
        except Exception as e:
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            
            error_response = {"error": str(e)}
            self.wfile.write(json.dumps(error_response).encode())
    
    def do_GET(self):
        try:
            # Connect to MongoDB
            mongo_url = os.environ.get('MONGO_URL')
            db_name = os.environ.get('DB_NAME', 'portfolio_db')
            
            client = MongoClient(mongo_url)
            db = client[db_name]
            
            # Get status checks
            status_checks = list(db.status_checks.find({}, {"_id": 0}).limit(1000))
            
            # Send response
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
            self.send_header('Access-Control-Allow-Headers', 'Content-Type')
            self.end_headers()
            
            self.wfile.write(json.dumps(status_checks).encode())
            
            client.close()
            
        except Exception as e:
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            
            error_response = {"error": str(e)}
            self.wfile.write(json.dumps(error_response).encode())
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
