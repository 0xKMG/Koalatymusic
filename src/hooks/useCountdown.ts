import { useEffect, useState } from 'react';

export const useCountdown = (start: number, end = 0): number => {
  const [countDown, setCountDown] = useState(start);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countDown - 1);
    }, 1000);

    if (countDown === end) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [countDown]);

  return countDown;
};

export default useCountdown;
