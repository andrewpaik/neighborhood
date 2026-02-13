"use client";

import { UserAvatar } from "@/components/shared/user-avatar";
import type { User } from "@/types";

interface MissionProgressProps {
  participants: User[];
  totalMembers: number;
}

export const MissionProgress = ({
  participants,
  totalMembers,
}: MissionProgressProps) => {
  const displayCount = Math.min(participants.length, 5);
  const remaining = participants.length - displayCount;

  return (
    <div className="flex items-center gap-3">
      {/* Overlapping avatar stack */}
      <div className="flex -space-x-2">
        {participants.slice(0, displayCount).map((user) => (
          <UserAvatar
            key={user.id}
            user={user}
            size="sm"
            className="ring-2 ring-white"
          />
        ))}
        {remaining > 0 && (
          <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-warmgray-200 text-xs font-medium text-warmgray-600">
            +{remaining}
          </div>
        )}
      </div>
      <p className="text-sm text-warmgray-500">
        <span className="font-semibold text-warmgray-700">
          {participants.length}
        </span>{" "}
        of {totalMembers} participated
      </p>
    </div>
  );
};
