from http.server import BaseHTTPRequestHandler
import json
import os
import html
import re
import urllib.request
import urllib.error

# Where enquiries get sent. Falls back to the site owner's address if the
# env var isn't set, so this still works without extra configuration.
TO_EMAIL = os.environ.get('CONTACT_TO_EMAIL', 'valeedah@gmail.com')

# Resend's shared sender works without verifying a domain, but it can only
# deliver to the address that owns the Resend account. Set CONTACT_FROM_EMAIL
# to something like "Portfolio <hello@valeedah.com>" once your domain is verified.
FROM_EMAIL = os.environ.get('CONTACT_FROM_EMAIL', 'Portfolio <onboarding@resend.dev>')

EMAIL_RE = re.compile(r'^[^@\s]+@[^@\s]+\.[^@\s]+$')

MAX_NAME = 100
MAX_EMAIL = 200
MAX_MESSAGE = 5000


class handler(BaseHTTPRequestHandler):
    def _send_json(self, status, payload):
        self.send_response(status)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
        self.wfile.write(json.dumps(payload).encode())

    def do_POST(self):
        try:
            length = int(self.headers.get('Content-Length', 0))
            if length == 0 or length > 20000:
                self._send_json(400, {"error": "Invalid request."})
                return

            data = json.loads(self.rfile.read(length).decode('utf-8'))

            # Honeypot: real people never fill this in, bots usually do.
            if data.get('website'):
                self._send_json(200, {"success": True})
                return

            name = (data.get('name') or '').strip()[:MAX_NAME]
            email = (data.get('email') or '').strip()[:MAX_EMAIL]
            message = (data.get('message') or '').strip()[:MAX_MESSAGE]
            service = (data.get('service') or 'General').strip()[:100]

            if not name or not email or not message:
                self._send_json(400, {"error": "Please fill in every field."})
                return

            if not EMAIL_RE.match(email):
                self._send_json(400, {"error": "That email address doesn't look right."})
                return

            api_key = os.environ.get('RESEND_API_KEY')
            if not api_key:
                self._send_json(500, {"error": "Email is not configured on the server yet."})
                return

            safe_name = html.escape(name)
            safe_email = html.escape(email)
            safe_service = html.escape(service)
            safe_message = html.escape(message).replace('\n', '<br>')

            body_html = f"""
              <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6;">
                <h2 style="margin-bottom: 4px;">New {safe_service} enquiry</h2>
                <p style="color:#666; margin-top:0;">From your portfolio at valeedah.com</p>
                <table cellpadding="6" style="border-collapse: collapse; margin: 16px 0;">
                  <tr><td><strong>Name</strong></td><td>{safe_name}</td></tr>
                  <tr><td><strong>Email</strong></td><td><a href="mailto:{safe_email}">{safe_email}</a></td></tr>
                  <tr><td><strong>Interested in</strong></td><td>{safe_service}</td></tr>
                </table>
                <p><strong>Message</strong></p>
                <p style="background:#f5f5f5; padding:12px; border-radius:6px;">{safe_message}</p>
              </div>
            """

            payload = {
                "from": FROM_EMAIL,
                "to": [TO_EMAIL],
                "subject": f"New {service} enquiry from {name}",
                "html": body_html,
                # Lets you hit reply and answer the person directly.
                "reply_to": email,
            }

            req = urllib.request.Request(
                'https://api.resend.com/emails',
                data=json.dumps(payload).encode('utf-8'),
                headers={
                    'Authorization': f'Bearer {api_key}',
                    'Content-Type': 'application/json',
                    # Resend sits behind Cloudflare, which blocks the default
                    # "Python-urllib/x.y" agent outright (error code 1010).
                    'User-Agent': 'valeedah-portfolio/1.0',
                },
                method='POST',
            )

            try:
                with urllib.request.urlopen(req, timeout=15) as resp:
                    if 200 <= resp.status < 300:
                        self._send_json(200, {"success": True})
                        return
                    self._send_json(502, {"error": "Could not send the message. Please try again."})
            except urllib.error.HTTPError as e:
                detail = e.read().decode('utf-8', errors='replace')[:500]
                print(f"Resend error {e.code}: {detail}")
                self._send_json(502, {"error": "Could not send the message. Please try again."})
            except Exception as e:
                print(f"Resend request failed: {e}")
                self._send_json(502, {"error": "Could not send the message. Please try again."})

        except Exception as e:
            print(f"Contact handler error: {e}")
            self._send_json(500, {"error": "Something went wrong. Please try again."})

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
