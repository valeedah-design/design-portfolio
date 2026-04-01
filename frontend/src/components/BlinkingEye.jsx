import React from 'react';
import './BlinkingEye.css';

const BlinkingEye = () => {
  return (
    <div className="blinking-eye-container">
      <div className="eye">
        <div className="eye-outer">
          <div className="eye-inner">
            <div className="pupil"></div>
          </div>
        </div>
        <div className="eyelid top"></div>
        <div className="eyelid bottom"></div>
      </div>
    </div>
  );
};

export default BlinkingEye;
