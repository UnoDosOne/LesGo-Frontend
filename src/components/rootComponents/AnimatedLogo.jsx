import React, { useEffect, useState } from 'react';

const AnimatedLogo = () => {
  const [showShape, setShowShape] = useState([false, false, false]);

  useEffect(() => {
    // Show each shape one by one with a delay
    const timers = [
      setTimeout(() => setShowShape((prev) => [true, prev[1], prev[2]]), 1000),
      setTimeout(() => setShowShape((prev) => [prev[0], true, prev[2]]), 2000),
      setTimeout(() => setShowShape((prev) => [prev[0], prev[1], true]), 3000),
    ];

    return () => timers.forEach((timer) => clearTimeout(timer));
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <svg
       
        viewBox="0 0 200 200"
        className="w-64 h-64"
      >
        {showShape[0] && (
          <polygon
            points="100,10 40,190 190,190"
            fill="#FFD700"
            className="transition-opacity duration-500"
            style={{ opacity: showShape[0] ? 1 : 0 }}
          />
        )}
        {showShape[1] && (
          <polygon
            points="100,10 40,190 100,100"
            fill="#1E3A8A"
            className="transition-opacity duration-500"
            style={{ opacity: showShape[1] ? 1 : 0 }}
          />
        )}
        {showShape[2] && (
          <polygon
            points="100,10 100,100 190,190"
            fill="#B0BEC5"
            className="transition-opacity duration-500"
            style={{ opacity: showShape[2] ? 1 : 0 }}
          />
        )}
      </svg>
    </div>
  );
};

export default AnimatedLogo;
