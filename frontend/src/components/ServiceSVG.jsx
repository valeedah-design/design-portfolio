// Helper component to properly handle SVG props without spreading
import React from 'react';

const ServiceSVG = ({ className, children }) => {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {children}
    </svg>
  );
};

export default ServiceSVG;
