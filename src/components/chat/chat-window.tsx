"use client";

import { useEffect, useRef } from "react";
import { MessageBubble } from "./message-bubble";
import { ChatInput } from "./chat-input";
import type { ChatMessage, User } from "@/types";

interface ChatWindowProps {
  messages: ChatMessage[];
  members: User[];
  currentUserId: string;
  onSend: (text: string) => void;
  loading?: boolean;
}

export const ChatWindow = ({
  messages,
  members,
  currentUserId,
  onSend,
  loading,
}: ChatWindowProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages.length]);

  const getMember = (userId: string) => members.find((m) => m.id === userId);

  return (
    <div className="flex h-[60vh] flex-col overflow-hidden rounded-2xl border border-warmgray-200 bg-white">
      {/* Messages area */}
      <div
        ref={scrollRef}
        className="flex-1 space-y-3 overflow-y-auto px-3 py-4"
      >
        {loading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`flex gap-2 ${i % 3 === 0 ? "flex-row-reverse" : ""}`}
              >
                <div className="h-10 w-10 animate-pulse rounded-full bg-warmgray-200" />
                <div className="h-10 w-32 animate-pulse rounded-2xl bg-warmgray-200" />
              </div>
            ))}
          </div>
        ) : messages.length === 0 ? (
          <div className="flex h-full items-center justify-center text-sm text-warmgray-400">
            No messages yet. Say hi to your neighbors!
          </div>
        ) : (
          messages.map((msg, index) => (
            <MessageBubble
              key={msg.id}
              message={msg}
              sender={getMember(msg.userId)}
              isOwnMessage={msg.userId === currentUserId}
              index={index}
            />
          ))
        )}
      </div>

      {/* Input */}
      <ChatInput onSend={onSend} />
    </div>
  );
};
