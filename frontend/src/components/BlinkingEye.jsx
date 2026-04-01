import React from 'react';
import './BlinkingEye.css';

const BlinkingEye = () => {
  return (
    <div className="blinking-eye-container">
      <div className="eye-wrapper">
        <div className="eye-ball">
          <div className="iris">
            <div className="pupil">
              <div className="pupil-highlight"></div>
            </div>
          </div>
        </div>
        <div className="upper-eyelid"></div>
        <div className="lower-eyelid"></div>
      </div>
    </div>
  );
};

export default BlinkingEye;
