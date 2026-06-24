import React, { useEffect, useState } from 'react';
import './MouseSpotlight.css';

const MouseSpotlight = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
    // handleMouseMove is defined in the effect, no external dependencies

  }, []);

  return (
    <div
      className="grid-reveal-layer"
      style={{
        maskImage: `radial-gradient(circle 80px at ${mousePosition.x}px ${mousePosition.y}px, black 0%, transparent 100%)`,
        WebkitMaskImage: `radial-gradient(circle 80px at ${mousePosition.x}px ${mousePosition.y}px, black 0%, transparent 100%)`,
      }}
    />
  );
};

export default MouseSpotlight;
