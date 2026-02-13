"use client";

import { MapPin, Calendar, Users } from "lucide-react";
import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { UserAvatar } from "@/components/shared/user-avatar";
import type { Hangout, User } from "@/types";

interface HangoutCardProps {
  hangout: Hangout;
  members: User[];
  currentUserId: string;
  onRsvp: (hangoutId: string, status: "going" | "maybe" | "cantMakeIt") => void;
  index?: number;
}

const formatDate = (timestamp: { toDate: () => Date } | Date) => {
  const date = "toDate" in timestamp ? timestamp.toDate() : timestamp;
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

export const HangoutCard = ({
  hangout,
  members,
  currentUserId,
  onRsvp,
  index = 0,
}: HangoutCardProps) => {
  const proposer = members.find((m) => m.id === hangout.proposedBy);
  const goingCount = hangout.rsvps.going.length;
  const maybeCount = hangout.rsvps.maybe.length;

  const currentStatus = hangout.rsvps.going.includes(currentUserId)
    ? "going"
    : hangout.rsvps.maybe.includes(currentUserId)
      ? "maybe"
      : hangout.rsvps.cantMakeIt.includes(currentUserId)
        ? "cantMakeIt"
        : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="rounded-2xl border border-warmgray-200 bg-white p-5"
    >
      {/* Header */}
      <div className="mb-3 flex items-start justify-between">
        <div>
          <h3 className="text-lg font-bold text-warmgray-900">
            {hangout.title}
          </h3>
          {proposer && (
            <div className="mt-1 flex items-center gap-2">
              <UserAvatar user={proposer} size="sm" className="h-5 w-5" />
              <span className="text-xs text-warmgray-500">
                {proposer.displayName}
              </span>
            </div>
          )}
        </div>
        <Badge className="rounded-full bg-teal-100 text-teal-700 hover:bg-teal-100">
          {hangout.status}
        </Badge>
      </div>

      {hangout.description && (
        <p className="mb-3 text-sm text-warmgray-600">{hangout.description}</p>
      )}

      {/* Details */}
      <div className="mb-4 space-y-2 text-sm text-warmgray-500">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-teal-500" />
          {formatDate(hangout.proposedTime)}
        </div>
        {hangout.location.name && (
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-teal-500" />
            {hangout.location.name}
            {hangout.location.address && (
              <span className="text-warmgray-400">
                {" "}
                — {hangout.location.address}
              </span>
            )}
          </div>
        )}
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-teal-500" />
          {goingCount} going{maybeCount > 0 ? ` · ${maybeCount} maybe` : ""}
        </div>
      </div>

      {/* RSVP buttons */}
      <div className="flex gap-2">
        {(["going", "maybe", "cantMakeIt"] as const).map((status) => {
          const isActive = currentStatus === status;
          const labels = {
            going: "Going",
            maybe: "Maybe",
            cantMakeIt: "Can't",
          };
          return (
            <button
              key={status}
              onClick={() => onRsvp(hangout.id, status)}
              className={`flex-1 rounded-full px-3 py-2 text-xs font-semibold transition-all ${
                isActive
                  ? status === "going"
                    ? "bg-teal-500 text-white"
                    : status === "maybe"
                      ? "bg-amber-100 text-amber-700 ring-1 ring-amber-300"
                      : "bg-warmgray-200 text-warmgray-600"
                  : "bg-warmgray-100 text-warmgray-500 hover:bg-warmgray-200"
              }`}
            >
              {labels[status]}
            </button>
          );
        })}
      </div>
    </motion.div>
  );
};
