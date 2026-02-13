"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

const REACTIONS = [
  { emoji: "fire", label: "Fire", icon: "\uD83D\uDD25" },
  { emoji: "heart", label: "Love", icon: "\u2764\uFE0F" },
  { emoji: "laugh", label: "Haha", icon: "\uD83D\uDE02" },
  { emoji: "clap", label: "Clap", icon: "\uD83D\uDC4F" },
  { emoji: "hundred", label: "100", icon: "\uD83D\uDCAF" },
];

interface ReactionBarProps {
  reactions: Record<string, string[]>;
  currentUserId: string;
  onReact: (emoji: string) => void;
}

export const ReactionBar = ({
  reactions,
  currentUserId,
  onReact,
}: ReactionBarProps) => {
  const [pending, setPending] = useState<string | null>(null);

  const handleReact = async (emoji: string) => {
    setPending(emoji);
    onReact(emoji);
    // Reset pending after a short delay for UI feedback
    setTimeout(() => setPending(null), 300);
  };

  return (
    <div className="flex flex-wrap gap-1.5">
      {REACTIONS.map(({ emoji, icon }) => {
        const users = reactions[emoji] || [];
        const hasReacted = users.includes(currentUserId);
        const count = users.length;

        return (
          <button
            key={emoji}
            onClick={() => handleReact(emoji)}
            disabled={pending === emoji}
            className={cn(
              "flex items-center gap-1 rounded-full px-2.5 py-1 text-xs transition-all",
              hasReacted
                ? "bg-terracotta-100 ring-1 ring-terracotta-300"
                : "bg-warmgray-100 hover:bg-warmgray-200"
            )}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={`${emoji}-${hasReacted}`}
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.5 }}
                transition={{ type: "spring", stiffness: 500, damping: 15 }}
              >
                {icon}
              </motion.span>
            </AnimatePresence>
            {count > 0 && (
              <span
                className={cn(
                  "font-medium",
                  hasReacted ? "text-terracotta-700" : "text-warmgray-600"
                )}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
