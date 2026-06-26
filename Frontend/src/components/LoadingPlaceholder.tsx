// src/components/LoadingPlaceholder.tsx
import React from 'react';

const LoadingPlaceholder = () => {
  return (
    <div className="loading-placeholder">
      <div className="spinner"></div>
      <p>Loading content...</p>
    </div>
  );
};

export default LoadingPlaceholder;