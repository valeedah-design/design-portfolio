import React, { useState, useEffect, useRef } from 'react';
import './DigitalHandshake.css';

// A real TCP handshake is SYN -> SYN-ACK -> ACK, which is exactly what a
// "digital handshake" is. Each step lights up in sequence, then we hand off
// to the contact form.
const STEPS = [
  { id: 'syn', label: 'SYN', direction: 'right', note: 'reaching out' },
  { id: 'synack', label: 'SYN-ACK', direction: 'left', note: 'valeed responds' },
  { id: 'ack', label: 'ACK', direction: 'right', note: 'connection agreed' },
];

const STEP_MS = 620;
const SETTLE_MS = 900;

const DigitalHandshake = ({ onComplete }) => {
  const [step, setStep] = useState(-1);
  const [done, setDone] = useState(false);

  // The Connect page re-renders on every mouse move (for its trail effect),
  // which hands us a brand new onComplete each time. Keeping it in a ref lets
  // the effect below run exactly once instead of restarting the animation.
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const timers = [];

    STEPS.forEach((_, i) => {
      timers.push(setTimeout(() => setStep(i), i * STEP_MS));
    });

    timers.push(
      setTimeout(() => setDone(true), STEPS.length * STEP_MS)
    );

    timers.push(
      setTimeout(() => onCompleteRef.current(), STEPS.length * STEP_MS + SETTLE_MS)
    );

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="handshake-overlay" role="status" aria-live="polite">
      <div className="handshake-stage">
        <div className="handshake-nodes">
          <div className={`handshake-node ${step >= 0 ? 'live' : ''}`}>
            <div className="handshake-node-dot" />
            <span className="handshake-node-label">YOU</span>
          </div>

          <div className="handshake-wire">
            {STEPS.map((s, i) => (
              <div
                key={s.id}
                className={`handshake-packet ${s.direction} ${step === i ? 'active' : ''} ${step > i ? 'sent' : ''}`}
              >
                {s.label}
              </div>
            ))}
            <div className={`handshake-line ${done ? 'established' : ''}`} />
          </div>

          <div className={`handshake-node ${step >= 1 ? 'live' : ''}`}>
            <div className="handshake-node-dot" />
            <span className="handshake-node-label">VALEED</span>
          </div>
        </div>

        <div className="handshake-status">
          {done ? (
            <span className="handshake-established">
              ✓ CONNECTION ESTABLISHED
            </span>
          ) : (
            <span className="handshake-step-note">
              {step >= 0 ? STEPS[step].note : 'initiating handshake...'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default DigitalHandshake;
