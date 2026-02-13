"use client";

import { useState, useEffect, useCallback } from "react";
import { Send, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { UserAvatar } from "@/components/shared/user-avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { User } from "@/types";

interface Comment {
  id: string;
  submissionId: string;
  userId: string;
  text: string;
  createdAt: Timestamp | null;
}

interface SubmissionCommentsProps {
  submissionId: string;
  members: User[];
  currentUserId: string;
}

const formatTimeAgo = (timestamp: Timestamp | null | undefined) => {
  if (!timestamp) return "now";
  const date = timestamp.toDate();
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "now";
  if (diffMins < 60) return `${diffMins}m`;
  if (diffHours < 24) return `${diffHours}h`;
  return `${diffDays}d`;
};

export const SubmissionComments = ({
  submissionId,
  members,
  currentUserId,
}: SubmissionCommentsProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const getMember = useCallback(
    (userId: string) => members.find((m) => m.id === userId),
    [members]
  );

  // Subscribe to comments for this submission
  useEffect(() => {
    if (submissionId.startsWith("mock-")) return;

    const q = query(
      collection(db, "submission_comments"),
      where("submissionId", "==", submissionId)
    );

    const unsubscribe = onSnapshot(q, (snap) => {
      const items: Comment[] = [];
      snap.forEach((d) => {
        items.push({ id: d.id, ...d.data() } as Comment);
      });
      items.sort((a, b) => {
        const aTime = a.createdAt?.toMillis?.() ?? 0;
        const bTime = b.createdAt?.toMillis?.() ?? 0;
        return aTime - bTime;
      });
      setComments(items);
    });

    return unsubscribe;
  }, [submissionId]);

  const handleSend = async () => {
    if (!text.trim() || !currentUserId) return;

    setSending(true);
    try {
      if (submissionId.startsWith("mock-")) {
        // Local-only comment for mock data
        setComments((prev) => [
          ...prev,
          {
            id: `local-${Date.now()}`,
            submissionId,
            userId: currentUserId,
            text: text.trim(),
            createdAt: null,
          },
        ]);
      } else {
        await addDoc(collection(db, "submission_comments"), {
          submissionId,
          userId: currentUserId,
          text: text.trim(),
          createdAt: serverTimestamp(),
        });
      }
      setText("");
      setExpanded(true);
    } catch (error) {
      console.error("Comment error:", error);
    } finally {
      setSending(false);
    }
  };

  const commentCount = comments.length;
  const visibleComments = expanded ? comments : comments.slice(-2);

  return (
    <div className="mt-3 border-t border-warmgray-100 pt-3">
      {/* Comment count toggle */}
      {commentCount > 0 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mb-2 flex items-center gap-1 text-xs text-warmgray-400 hover:text-warmgray-600"
        >
          <MessageCircle className="h-3 w-3" />
          {commentCount === 1
            ? "1 comment"
            : `${commentCount} comments`}
          {!expanded && commentCount > 2 && " — view all"}
        </button>
      )}

      {/* Comments list */}
      <AnimatePresence>
        {visibleComments.map((comment) => {
          const author = getMember(comment.userId);
          return (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-2 flex gap-2"
            >
              {author && (
                <UserAvatar
                  user={author}
                  size="sm"
                  className="mt-0.5 h-6 w-6 flex-shrink-0"
                />
              )}
              <div className="min-w-0 flex-1">
                <p className="text-sm text-warmgray-800">
                  <span className="font-semibold text-warmgray-900">
                    {author?.displayName.split(" ")[0] ?? "You"}
                  </span>{" "}
                  {comment.text}
                </p>
                <p className="text-[10px] text-warmgray-400">
                  {formatTimeAgo(comment.createdAt)}
                </p>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Comment input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex items-center gap-2"
      >
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a comment..."
          className="h-8 flex-1 rounded-full border-warmgray-200 text-xs focus-visible:ring-warmgray-300"
          disabled={sending}
        />
        <Button
          type="submit"
          size="icon"
          disabled={sending || !text.trim()}
          variant="ghost"
          className="h-8 w-8 text-warmgray-400 hover:text-terracotta-500"
        >
          <Send className="h-3.5 w-3.5" />
        </Button>
      </form>
    </div>
  );
};
