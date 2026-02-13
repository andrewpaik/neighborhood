"use client";

import { useEffect } from "react";
import { X, Compass, Calendar, Users } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { UserAvatar } from "@/components/shared/user-avatar";
import { Separator } from "@/components/ui/separator";
import type { User } from "@/types";

interface MemberDetailProps {
  member: User | null;
  onClose: () => void;
}

export const MemberDetail = ({ member, onClose }: MemberDetailProps) => {
  // Close on escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (member) {
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [member, onClose]);

  const joinedDate =
    member?.joinedAt && "toDate" in member.joinedAt
      ? member.joinedAt.toDate().toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        })
      : "Recently";

  return (
    <AnimatePresence>
      {member && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/60"
            onClick={onClose}
          />

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            onClick={onClose}
          >
            <div
              className="relative w-full max-w-xs rounded-3xl bg-white p-6 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full bg-warmgray-100 text-warmgray-500 transition-colors hover:bg-warmgray-200 hover:text-warmgray-700"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Profile content */}
              <div className="flex flex-col items-center text-center">
                <UserAvatar user={member} size="lg" className="mb-4" />

                <h2 className="mb-1 text-xl font-bold text-warmgray-900">
                  {member.displayName}
                </h2>

                {member.bio && (
                  <p className="mb-4 text-sm leading-relaxed text-warmgray-500">
                    {member.bio}
                  </p>
                )}

                <Separator className="my-3 w-full" />

                {/* Stats */}
                <div className="w-full space-y-2.5">
                  <div className="flex items-center gap-3 text-sm text-warmgray-600">
                    <Calendar className="h-4 w-4 text-warmgray-400" />
                    <span>Joined {joinedDate}</span>
                  </div>

                  {member.missionsCompleted > 0 && (
                    <div className="flex items-center gap-3 text-sm text-warmgray-600">
                      <Compass className="h-4 w-4 text-terracotta-400" />
                      <span>
                        {member.missionsCompleted} mission
                        {member.missionsCompleted === 1 ? "" : "s"} completed
                      </span>
                    </div>
                  )}

                  {member.hangoutsAttended > 0 && (
                    <div className="flex items-center gap-3 text-sm text-warmgray-600">
                      <Users className="h-4 w-4 text-teal-400" />
                      <span>
                        {member.hangoutsAttended} hangout
                        {member.hangoutsAttended === 1 ? "" : "s"} attended
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
