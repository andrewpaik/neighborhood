"use client";

import { Clock, Flame } from "lucide-react";
import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import type { Mission } from "@/types";

interface MissionCardProps {
  mission: Mission;
  participantCount: number;
  totalMembers: number;
}

const getDaysRemaining = (endsAt: { toDate: () => Date } | Date) => {
  const end = "toDate" in endsAt ? endsAt.toDate() : endsAt;
  const now = new Date();
  const diff = end.getTime() - now.getTime();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return Math.max(0, days);
};

export const MissionCard = ({
  mission,
  participantCount,
  totalMembers,
}: MissionCardProps) => {
  const daysLeft = getDaysRemaining(mission.endsAt);
  const participationRate = totalMembers > 0 ? participantCount / totalMembers : 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl border border-terracotta-200 bg-gradient-to-br from-terracotta-50 to-white p-5"
    >
      <div className="mb-3 flex items-center justify-between">
        <Badge className="rounded-full bg-terracotta-100 text-terracotta-700 hover:bg-terracotta-100">
          <Flame className="mr-1 h-3 w-3" />
          Week {mission.week}
        </Badge>
        <div className="flex items-center gap-1 text-sm text-warmgray-500">
          <Clock className="h-3.5 w-3.5" />
          {daysLeft === 0 ? "Last day!" : `${daysLeft}d left`}
        </div>
      </div>

      <h2 className="mb-2 text-xl font-bold text-warmgray-900">
        {mission.title}
      </h2>
      <p className="mb-4 text-sm leading-relaxed text-warmgray-600">
        {mission.prompt}
      </p>

      {/* Participation progress */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs text-warmgray-500">
          <span>{participantCount} participated</span>
          <span>{Math.round(participationRate * 100)}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-terracotta-100">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${participationRate * 100}%` }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-full rounded-full bg-terracotta-400"
          />
        </div>
      </div>
    </motion.div>
  );
};
