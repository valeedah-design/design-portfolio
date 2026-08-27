import React, { useState, useEffect, useRef } from 'react';
import './DigitalHandshake.css';

// Phases: 'approach' (hands slide in) -> 'shake' (they clasp and shake)
// -> 'greet' (confirmation) -> onComplete opens the contact form.
const APPROACH_MS = 700;
const SHAKE_MS = 1200;
const GREET_MS = 800;

const DigitalHandshake = ({ onComplete }) => {
  const [phase, setPhase] = useState('approach');

  // The Connect page re-renders constantly (mouse-trail effect), handing us a
  // fresh onComplete each time. A ref keeps the timers below from restarting.
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase('shake'), APPROACH_MS),
      setTimeout(() => setPhase('greet'), APPROACH_MS + SHAKE_MS),
      setTimeout(() => onCompleteRef.current(), APPROACH_MS + SHAKE_MS + GREET_MS),
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
          {(phase === 'shake' || phase === 'greet') && (
            <>
              <span className="handshake-ring ring-a" />
              <span className="handshake-ring ring-b" />
            </>
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
          {phase === 'approach' && (
            <span className="handshake-note">reaching out...</span>
          )}
          {phase === 'shake' && (
            <span className="handshake-note">shaking on it...</span>
          )}
          {phase === 'greet' && (
            <span className="handshake-greet">✓ NICE TO MEET YOU</span>
          )}
        </div>

        <span className="handshake-skip">click anywhere to skip</span>
      </div>
    </div>
  );
};

export default DigitalHandshake;
