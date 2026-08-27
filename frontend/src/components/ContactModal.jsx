import React, { useState, useEffect } from 'react';
import './ContactModal.css';

const STAR_LABELS = ['Not for me', 'Meh', 'Good', 'Great', 'Loved it'];

const ContactModal = ({ service, onClose }) => {
  const [form, setForm] = useState({ name: '', email: '', website: '' });
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
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

    if (rating === 0) {
      setError('Pick a star rating first.');
      setStatus('error');
      return;
    }

    setStatus('sending');
    setError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, rating, service }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Could not send that.');

      setStatus('sent');
    } catch (err) {
      setError(err.message);
      setStatus('error');
    }
  };

  const displayRating = hoverRating || rating;

  return (
    <div className="contact-overlay" onClick={onClose} role="presentation">
      <div
        className="contact-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Rate my work"
      >
        <button className="contact-close" onClick={onClose} aria-label="Close">×</button>

        {status === 'sent' ? (
          <div className="contact-success">
            <div className="contact-success-mark">✓</div>
            <h2 className="contact-title">Thanks!</h2>
            <p className="contact-subtitle">
              Your rating just landed in my inbox.
            </p>
            <button className="contact-submit" onClick={onClose}>Close</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <h2 className="contact-title">Rate my work</h2>
            <p className="contact-subtitle">
              Name, email, and a quick rating — that's it.
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

            <div className="contact-label">
              Rating
              <div
                className="contact-stars"
                role="radiogroup"
                aria-label="Rating out of 5 stars"
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    className={`contact-star ${n <= displayRating ? 'filled' : ''}`}
                    role="radio"
                    aria-checked={rating === n}
                    aria-label={`${n} star${n > 1 ? 's' : ''}`}
                    onClick={() => setRating(n)}
                    onMouseEnter={() => setHoverRating(n)}
                    onMouseLeave={() => setHoverRating(0)}
                    onFocus={() => setHoverRating(n)}
                    onBlur={() => setHoverRating(0)}
                  >
                    ★
                  </button>
                ))}
              </div>
              {displayRating > 0 && (
                <span className="contact-star-note">{STAR_LABELS[displayRating - 1]}</span>
              )}
            </div>

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
              {status === 'sending' ? 'Sending...' : 'Send'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactModal;
