import React from 'react';

const Spinner = ({ size = 20, color = 'white' }) => {
  const spinnerStyle = {
    width: `${size}px`,
    height: `${size}px`,
    border: `2px solid ${color}40`,
    borderTop: `2px solid ${color}`,
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    display: 'inline-block',
    flexShrink: 0,
  };

  return (
    <>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      <div style={spinnerStyle}></div>
    </>
  );
};

export default Spinner; 