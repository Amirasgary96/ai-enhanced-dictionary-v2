import React from 'react';

const LoadingAnimation = () => {
  return (
    <div className="flex justify-center items-center h-24">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      <p className="ml-4 text-lg">AI is processing...</p>
    </div>
  );
};

export default LoadingAnimation;