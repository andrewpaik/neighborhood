"use client";

import { motion } from "motion/react";
import { UserAvatar } from "@/components/shared/user-avatar";
import { ReactionBar } from "./reaction-bar";
import { SubmissionComments } from "./submission-comments";
import type { MissionSubmission, User } from "@/types";

interface MissionFeedProps {
  submissions: MissionSubmission[];
  members: User[];
  currentUserId: string;
  onReact: (submissionId: string, emoji: string) => void;
}

const formatTimeAgo = (timestamp: { toDate: () => Date } | Date | null | undefined) => {
  if (!timestamp) return "just now";
  const date = typeof timestamp === "object" && "toDate" in timestamp ? timestamp.toDate() : timestamp;
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${diffDays}d ago`;
};

export const MissionFeed = ({
  submissions,
  members,
  currentUserId,
  onReact,
}: MissionFeedProps) => {
  const getMember = (userId: string) =>
    members.find((m) => m.id === userId);

  if (submissions.length === 0) {
    return (
      <div className="py-8 text-center text-sm text-warmgray-400">
        No submissions yet. Be the first!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {submissions.map((sub, index) => {
        const member = getMember(sub.userId);
        if (!member) return null;

        return (
          <motion.div
            key={sub.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="rounded-2xl border border-warmgray-200 bg-white p-4"
          >
            {/* Author row */}
            <div className="mb-3 flex items-center gap-3">
              <UserAvatar user={member} size="sm" />
              <div>
                <p className="text-sm font-semibold text-warmgray-900">
                  {member.displayName.split(" ")[0]}
                </p>
                <p className="text-xs text-warmgray-400">
                  {formatTimeAgo(sub.submittedAt)}
                </p>
              </div>
            </div>

            {/* Content */}
            {sub.content.text && (
              <p className="mb-3 text-sm leading-relaxed text-warmgray-700">
                {sub.content.text}
              </p>
            )}

            {/* Photo */}
            {sub.content.mediaURLs && sub.content.mediaURLs.length > 0 && (
              <div className="mb-3 overflow-hidden rounded-xl bg-warmgray-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={sub.content.mediaURLs[0]}
                  alt="Mission submission"
                  className="max-h-64 w-full rounded-xl object-contain"
                />
              </div>
            )}

            {/* Reactions */}
            <ReactionBar
              reactions={sub.reactions || {}}
              currentUserId={currentUserId}
              onReact={(emoji) => onReact(sub.id, emoji)}
            />

            {/* Comments */}
            <SubmissionComments
              submissionId={sub.id}
              members={members}
              currentUserId={currentUserId}
            />
          </motion.div>
        );
      })}
    </div>
  );
};
