import { useEffect, useState } from 'react';

export const useCountup = (start = 0): number => {
  const [countup, setCountup] = useState(start);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountup(countup + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [countup]);

  return countup;
};

export default useCountup;
