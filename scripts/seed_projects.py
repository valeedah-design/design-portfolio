"""
One-time migration: loads the projects that used to be hardcoded in
WorksPage.jsx into MongoDB, so the admin panel has something to start with.

Usage:
    pip install pymongo
    MONGO_URL="mongodb+srv://..." DB_NAME="portfolio_db" python scripts/seed_projects.py
"""
import os
import uuid
from datetime import datetime, timezone
from pymongo import MongoClient

MONGO_URL = os.environ.get('MONGO_URL')
DB_NAME = os.environ.get('DB_NAME', 'portfolio_db')

if not MONGO_URL:
    raise SystemExit("Set the MONGO_URL environment variable before running this script.")

client = MongoClient(MONGO_URL)
db = client[DB_NAME]

now = datetime.now(timezone.utc).isoformat()

projects = [
    # --- Digital Designs > App Designs ---
    dict(category='Digital Designs', subsection='App Designs', title='FOODQ',
         description='Bringing Food and People Together', tag='Case study',
         image='https://customer-assets.emergentagent.com/job_work-gallery-139/artifacts/7uckbj7f_iPhone%2016%20Pro%20mockup%20natural%20titanium.png',
         bgColor='green', order=1),
    dict(category='Digital Designs', subsection='App Designs', title='CCJournal',
         description='Find your career and passion', tag=None,
         image='https://customer-assets.emergentagent.com/job_work-gallery-139/artifacts/hmaa12tg_jjjjj.png',
         bgColor='black', order=2),
    dict(category='Digital Designs', subsection='App Designs', title='The Guardian',
         description='Redesign of the news app', tags=['Case study', 'Redesign'],
         image='https://customer-assets.emergentagent.com/job_work-gallery-139/artifacts/zyxmw9wv_jjjjjjj.png',
         bgColor='black', order=3),
    dict(category='Digital Designs', subsection='App Designs', title='Compocity',
         description='Foodwaste to compost', tag=None,
         image='https://customer-assets.emergentagent.com/job_work-gallery-139/artifacts/d87y6hdm_comp.png',
         bgColor='black', order=4),

    # --- Digital Designs > App Icons ---
    dict(category='Digital Designs', subsection='App Icons', title='ADHD', description='', tag=None,
         image='https://customer-assets.emergentagent.com/job_work-gallery-139/artifacts/y1ednfmg_adhd.png',
         bgColor='black', order=1),
    dict(category='Digital Designs', subsection='App Icons', title='BET', description='', tag=None,
         image='https://customer-assets.emergentagent.com/job_work-gallery-139/artifacts/cnzkwtka_bet.png',
         bgColor='black', order=2),
    dict(category='Digital Designs', subsection='App Icons', title='CCJ', description='', tag=None,
         image='https://customer-assets.emergentagent.com/job_work-gallery-139/artifacts/8s6a6pof_ccj.png',
         bgColor='black', order=3),
    dict(category='Digital Designs', subsection='App Icons', title='FOODQ', description='', tag=None,
         image='https://customer-assets.emergentagent.com/job_work-gallery-139/artifacts/8j5ldjts_foodq.png',
         bgColor='black', order=4),

    # --- Digital Designs > Web Design ---
    dict(category='Digital Designs', subsection='Web Design', title='Portfolio Website',
         description='Personal portfolio showcase', tag='Web', image=None, bgColor='black', order=1),
    dict(category='Digital Designs', subsection='Web Design', title='E-commerce Platform',
         description='Modern shopping experience', tag='Web', image=None, bgColor='black', order=2),
    dict(category='Digital Designs', subsection='Web Design', title='SaaS Dashboard',
         description='Analytics and insights', tag='Web', image=None, bgColor='black', order=3),

    # --- Research Lab ---
    dict(category='Research Lab', subsection=None, title='FEAST TO YOUR EYES : Postmortem',
         description='', tag=None, image=None, bgColor='transparent', order=1),
    dict(category='Research Lab', subsection=None, title='Card sorting experiment on Compocity app users',
         description='', tag=None, image=None, bgColor='transparent', order=2),
]

inserted = 0
for p in projects:
    doc = {
        "id": str(uuid.uuid4()),
        "category": p['category'],
        "subsection": p.get('subsection'),
        "title": p['title'],
        "description": p.get('description', ''),
        "tag": p.get('tag'),
        "tags": p.get('tags', []),
        "image": p.get('image'),
        "bgColor": p.get('bgColor', 'black'),
        "order": p.get('order', 0),
        "createdAt": now,
    }
    db.projects.insert_one(doc)
    inserted += 1

print(f"Inserted {inserted} projects into '{DB_NAME}.projects'.")
client.close()
