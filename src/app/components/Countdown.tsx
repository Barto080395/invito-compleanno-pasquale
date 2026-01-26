import { useEffect, useState } from "react";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

type CountdownProps = {
  targetDate: string;
};

const calculateTimeLeft = (targetDate: string): TimeLeft => {
  const now = new Date();
  const difference = new Date(targetDate).getTime() - now.getTime();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
};

const Countdown = ({ targetDate }: CountdownProps) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft(targetDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);
  
  return (
  <div style={{ fontSize: "1.2rem", margin: "1rem 0" }}>
    {timeLeft.days + timeLeft.hours + timeLeft.minutes + timeLeft.seconds <= 0
      ? "Auguri di buon compleanno Pasquale!! 🥳🎉"
      : `Mancano: ${timeLeft.days} giorni, ${timeLeft.hours} ore, ${timeLeft.minutes} minuti, ${timeLeft.seconds} secondi`}
  </div>
);

};

export default Countdown;
