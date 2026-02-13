"use client";

import { useState, useEffect } from "react";
import { Timer } from "lucide-react";
import { motion } from "motion/react";

interface MissionCountdownProps {
  endsAt: Date;
}

const getTimeLeft = (endsAt: Date) => {
  const now = new Date();
  const diff = endsAt.getTime() - now.getTime();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
};

const pad = (n: number) => String(n).padStart(2, "0");

export const MissionCountdown = ({ endsAt }: MissionCountdownProps) => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(endsAt));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(endsAt));
    }, 1000);
    return () => clearInterval(interval);
  }, [endsAt]);

  const isExpired =
    timeLeft.days === 0 &&
    timeLeft.hours === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.seconds === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-2xl border border-warmgray-200 bg-white p-4"
    >
      <div className="mb-3 flex items-center gap-2 text-sm font-medium text-warmgray-500">
        <Timer className="h-4 w-4 text-terracotta-500" />
        {isExpired ? "New mission dropping soon!" : "Time till new mission"}
      </div>

      <div className="flex justify-center gap-3">
        {[
          { value: timeLeft.days, label: "days" },
          { value: timeLeft.hours, label: "hrs" },
          { value: timeLeft.minutes, label: "min" },
          { value: timeLeft.seconds, label: "sec" },
        ].map(({ value, label }) => (
          <div key={label} className="flex flex-col items-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-terracotta-50 text-xl font-bold tabular-nums text-terracotta-700">
              {pad(value)}
            </div>
            <span className="mt-1 text-[10px] uppercase tracking-wider text-warmgray-400">
              {label}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
