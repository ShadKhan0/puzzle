import React, { useEffect, useState } from 'react';

const Timer = ({ isActive }) => {
  const [time, setTime] = useState(0); // Time in seconds

  useEffect(() => {
    let timer;
    if (isActive) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1); // Increment time every second
      }, 1000);
    }

    return () => clearInterval(timer); // Cleanup timer on unmount
  }, [isActive]);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <div className="timer">
      Time: {minutes < 10 ? '0' + minutes : minutes}:{seconds < 10 ? '0' + seconds : seconds}
    </div>
  );
};

export default Timer;