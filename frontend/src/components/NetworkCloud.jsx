import React from 'react';

const NetworkCloud = ({ label = "Network" }) => {
  return (
    <div className="network-cloud-container">
      <div className="cloud-svg-wrapper">
        <svg width="240" height="160" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M6 18c-3.31 0-6-2.69-6-6 0-2.82 1.94-5.18 4.59-5.83C5.62 2.51 8.6 0 12 0c3.11 0 5.85 2.11 6.74 5.06C21.42 5.57 24 8.24 24 11.5c0 3.31-2.69 6-6 6H6z" 
            transform="scale(0.85) translate(2, 3)"
            fill="url(#proCloudGradient)" 
            stroke="rgba(255,255,255,0.25)" 
            strokeWidth="0.5" 
          />
          <defs>
            <linearGradient id="proCloudGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
          </defs>
        </svg>
        <div className="cloud-label-inner">{label}</div>
      </div>
    </div>
  );
};

export default NetworkCloud;
