"use client";

import { motion } from "motion/react";
import { UserAvatar } from "@/components/shared/user-avatar";
import { cn } from "@/lib/utils";
import type { ChatMessage, User } from "@/types";

interface MessageBubbleProps {
  message: ChatMessage;
  sender: User | undefined;
  isOwnMessage: boolean;
  index: number;
}

const formatTime = (timestamp: { toDate: () => Date } | Date | null | undefined) => {
  if (!timestamp) return "now";
  const date = typeof timestamp === "object" && "toDate" in timestamp
    ? timestamp.toDate()
    : timestamp;
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
};

export const MessageBubble = ({
  message,
  sender,
  isOwnMessage,
  index,
}: MessageBubbleProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: Math.min(index * 0.02, 0.5) }}
      className={cn("flex gap-2", isOwnMessage ? "flex-row-reverse" : "")}
    >
      {!isOwnMessage && sender && (
        <UserAvatar user={sender} size="sm" className="mt-1 flex-shrink-0" />
      )}
      <div
        className={cn(
          "max-w-[75%] space-y-0.5",
          isOwnMessage ? "items-end" : "items-start"
        )}
      >
        {!isOwnMessage && sender && (
          <p className="text-xs font-medium text-warmgray-500">
            {sender.displayName.split(" ")[0]}
          </p>
        )}
        <div
          className={cn(
            "rounded-2xl px-3.5 py-2 text-sm",
            isOwnMessage
              ? "rounded-br-md bg-sage-500 text-white"
              : "rounded-bl-md bg-warmgray-100 text-warmgray-800"
          )}
        >
          {message.text}
        </div>
        <p
          className={cn(
            "text-[10px] text-warmgray-400",
            isOwnMessage ? "text-right" : ""
          )}
        >
          {formatTime(message.createdAt)}
        </p>
      </div>
    </motion.div>
  );
};
