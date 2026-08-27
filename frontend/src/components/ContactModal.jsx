import React, { useState, useEffect } from 'react';
import './ContactModal.css';

const ContactModal = ({ service, onClose }) => {
  const [form, setForm] = useState({ name: '', email: '', message: '', website: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [error, setError] = useState('');

  // Close on Escape, and stop the page behind from scrolling while open.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  const handleChange = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, service }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Could not send your message.');

      setStatus('sent');
    } catch (err) {
      setError(err.message);
      setStatus('error');
    }
  };

  return (
    <div className="contact-overlay" onClick={onClose} role="presentation">
      <div
        className="contact-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`Enquire about ${service}`}
      >
        <button className="contact-close" onClick={onClose} aria-label="Close">×</button>

        {status === 'sent' ? (
          <div className="contact-success">
            <div className="contact-success-mark">✓</div>
            <h2 className="contact-title">Message sent</h2>
            <p className="contact-subtitle">
              Thanks for reaching out. I'll get back to you soon.
            </p>
            <button className="contact-submit" onClick={onClose}>Close</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <h2 className="contact-title">Let's talk</h2>
            <p className="contact-subtitle">
              You're enquiring about <span className="contact-service">{service}</span>
            </p>

            <label className="contact-label">
              Your name
              <input
                className="contact-input"
                value={form.name}
                onChange={handleChange('name')}
                required
                autoFocus
              />
            </label>

            <label className="contact-label">
              Your email
              <input
                className="contact-input"
                type="email"
                value={form.email}
                onChange={handleChange('email')}
                required
              />
            </label>

            <label className="contact-label">
              What do you have in mind?
              <textarea
                className="contact-input contact-textarea"
                value={form.message}
                onChange={handleChange('message')}
                rows={4}
                required
              />
            </label>

            {/* Honeypot field — hidden from people, tempting to bots. */}
            <input
              className="contact-honeypot"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={form.website}
              onChange={handleChange('website')}
              aria-hidden="true"
            />

            {error && <p className="contact-error">{error}</p>}

            <button className="contact-submit" type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending...' : 'Send message'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactModal;
