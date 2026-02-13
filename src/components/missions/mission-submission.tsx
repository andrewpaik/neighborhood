"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface MissionSubmissionProps {
  userId: string;
  missionId: string;
  neighborhoodId: string;
  onSubmitted?: () => void;
}

export const MissionSubmission = ({
  userId,
  missionId,
  neighborhoodId,
  onSubmitted,
}: MissionSubmissionProps) => {
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!text.trim()) return;

    setSubmitting(true);
    try {
      await addDoc(collection(db, "mission_submissions"), {
        missionId,
        userId,
        neighborhoodId,
        content: {
          text: text.trim(),
          mediaURLs: [],
        },
        reactions: {},
        submittedAt: serverTimestamp(),
      });

      setText("");
      toast.success("Mission submitted!");
      onSubmitted?.();
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("Failed to submit");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="rounded-2xl border border-warmgray-200 bg-white p-4"
    >
      <p className="mb-2 text-sm font-medium text-warmgray-700">
        Your response
      </p>
      <Textarea
        placeholder="Share your response to this mission..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="mb-3 min-h-[80px] resize-none rounded-xl border-warmgray-200 text-sm focus-visible:ring-terracotta-300"
      />
      <div className="flex justify-end">
        <Button
          onClick={handleSubmit}
          disabled={submitting || !text.trim()}
          className="gap-2 rounded-full bg-terracotta-500 px-5 text-sm font-semibold text-white hover:bg-terracotta-600"
        >
          <Send className="h-3.5 w-3.5" />
          {submitting ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </motion.div>
  );
};
