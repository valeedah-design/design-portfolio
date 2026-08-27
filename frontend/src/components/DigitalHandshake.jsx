import React, { useState, useEffect, useRef } from 'react';
import './DigitalHandshake.css';

// A literal handshake, staged in three beats:
// 'approach' -> two hands slide in from opposite edges
// 'clasp'    -> they meet, lock, and shake
// 'greet'    -> a settled confirmation, then onComplete opens the contact form.
const APPROACH_MS = 650;
const CLASP_MS = 1050;
const GREET_MS = 800;

const STATUS_COPY = {
  approach: 'reaching out...',
  clasp: 'shaking on it...',
  greet: null,
};

const DigitalHandshake = ({ onComplete }) => {
  const [phase, setPhase] = useState('approach');

  // ConnectPage re-renders on every mouse move (its trail effect), handing us
  // a fresh onComplete each time. A ref keeps the timers below from restarting.
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase('clasp'), APPROACH_MS),
      setTimeout(() => setPhase('greet'), APPROACH_MS + CLASP_MS),
      setTimeout(() => onCompleteRef.current(), APPROACH_MS + CLASP_MS + GREET_MS),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  // Let people skip straight to the form if they don't want to wait.
  const skip = () => onCompleteRef.current();

  return (
    <div
      className="handshake-overlay"
      role="status"
      aria-live="polite"
      onClick={skip}
    >
      <div className="handshake-stage">
        <div className={`handshake-hands phase-${phase}`}>
          {phase !== 'approach' && (
            <>
              <span className="handshake-spark" />
              <span className="handshake-ring ring-a" />
              <span className="handshake-ring ring-b" />
            </>
          )}

          {phase === 'approach' && (
            <span className="handshake-link">
              <span className="handshake-link-dot" />
              <span className="handshake-link-dot" />
              <span className="handshake-link-dot" />
            </span>
          )}

          {phase === 'approach' ? (
            <>
              <span className="handshake-hand hand-left" role="img" aria-label="hand reaching out">🤚</span>
              <span className="handshake-hand hand-right" role="img" aria-label="hand reaching back">✋</span>
            </>
          ) : (
            <span className="handshake-clasp" role="img" aria-label="handshake">🤝</span>
          )}
        </div>

        <div className="handshake-status">
          {phase === 'greet' ? (
            <span className="handshake-greet">✓ CONNECTION ESTABLISHED</span>
          ) : (
            <span className="handshake-note">{STATUS_COPY[phase]}</span>
          )}
        </div>

        <span className="handshake-skip">click anywhere to skip</span>
      </div>
    </div>
  );
};

export default DigitalHandshake;
