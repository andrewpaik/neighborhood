"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ChatInputProps {
  onSend: (text: string) => void;
  disabled?: boolean;
}

export const ChatInput = ({ onSend, disabled }: ChatInputProps) => {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || disabled) return;
    onSend(text.trim());
    setText("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 border-t border-warmgray-200 bg-white px-3 py-2"
    >
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Say something..."
        className="flex-1 rounded-full border-warmgray-200 text-sm focus-visible:ring-sage-300"
        disabled={disabled}
      />
      <Button
        type="submit"
        size="icon"
        disabled={disabled || !text.trim()}
        className="h-9 w-9 rounded-full bg-sage-500 hover:bg-sage-600"
      >
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
};
