import { useEffect, useState } from "react";

export default function useCountDown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const timeLeft = targetDate.getTime() - Date.now();
      setTimeLeft(timeLeft > 0 ? timeLeft : 0);
    });

    return () => {
      clearInterval(interval);
    };
  }, []);

  return calculateTimeLeft(timeLeft);
}

// Calculate time left
function calculateTimeLeft(timeLeft: number) {
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return {
    days,
    hours,
    minutes,
    seconds,
  };
}
