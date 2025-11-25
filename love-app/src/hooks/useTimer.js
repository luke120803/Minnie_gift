import { useState, useEffect } from 'react';

export const useTimer = (anniversaryDate) => {
  const [timeUnits, setTimeUnits] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const diff = now - new Date(anniversaryDate);

      const seconds = Math.floor(diff / 1000) % 60;
      const minutes = Math.floor(diff / (1000 * 60)) % 60;
      const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24)) % 30.44;
      const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30.44)) % 12;
      const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));

      setTimeUnits({
        years,
        months: Math.floor(months),
        days: Math.floor(days),
        hours,
        minutes,
        seconds,
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, [anniversaryDate]);

  return timeUnits;
};
