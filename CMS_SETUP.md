# Portfolio CMS — Setup Guide

This adds a password-protected `/admin` panel where you can add, edit, and delete
your project cards (with image upload) without touching code or redeploying.

## What was added

- `api/auth.py` — login endpoint, returns a JWT
- `api/projects.py` — CRUD API for your projects (GET is public, POST/PUT/DELETE need login)
- `api/upload.py` — image upload endpoint (stores images in Vercel Blob)
- `api/_lib/auth_helper.py` — shared password check + JWT helpers
- `frontend/src/components/AdminLogin.jsx` + `AdminDashboard.jsx` — the admin UI at `/admin`
- `frontend/src/components/WorksPage.jsx` — now fetches projects from `/api/projects` instead of a hardcoded list
- `scripts/generate_password_hash.py` — run once to create your admin password hash
- `scripts/seed_projects.py` — run once to load your existing projects into MongoDB

## 1. Install new Python dependencies

Already added to `api/requirements.txt`:
```
pymongo==4.6.1
PyJWT==2.9.0
bcrypt==4.2.0
vercel_blob==0.4.0
```
Vercel installs these automatically on deploy.

## 2. Create a Vercel Blob store (for image uploads)

1. In your Vercel project → **Storage** → **Create Database** → **Blob**
2. Connect it to this project. Vercel will automatically add a `BLOB_READ_WRITE_TOKEN`
   environment variable — you don't need to set this one manually.

## 3. Generate your admin password hash

Locally:
```bash
pip install bcrypt
python scripts/generate_password_hash.py
```
This prompts you for a password and prints a hash. Copy it.

## 4. Set environment variables in Vercel

Go to your Vercel project → **Settings** → **Environment Variables** and add:

| Variable | Value |
|---|---|
| `ADMIN_USERNAME` | whatever username you want to log in with |
| `ADMIN_PASSWORD_HASH` | the hash printed in step 3 |
| `JWT_SECRET` | any long random string (e.g. run `openssl rand -hex 32`) |

You should already have `MONGO_URL` and `DB_NAME` set from before.

## 5. Seed your existing projects into MongoDB

This is a one-time migration so the admin panel isn't empty on day one — it loads the
same projects that used to be hardcoded in `WorksPage.jsx`.

```bash
pip install pymongo
MONGO_URL="your-mongo-connection-string" DB_NAME="portfolio_db" python scripts/seed_projects.py
```

## 6. Deploy

```bash
git add .
git commit -m "Add CMS admin panel"
git push
```

Vercel will redeploy automatically.

## 7. Use it

- Go to `https://valeedah.com/admin`
- Log in with the username/password from step 3–4
- Add/edit/delete projects, upload images directly — the live site's `\works` section
  updates immediately since it reads from the same database.

### Notes
- `category` and `subsection` are free-text fields. If you type a new category name
  (e.g. "Branding"), it automatically shows up as a new tab on the site — no code
  changes needed. Leave "subsection" blank for projects that shouldn't have sub-tabs
  (like Research Lab items).
- Images upload directly to Vercel Blob and are capped at ~4MB per file (Vercel's
  server upload limit). That's plenty for web images — just export/compress if a
  photo is huge.
- The JWT login session lasts 7 days, then you'll need to log in again.
