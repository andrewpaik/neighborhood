"use client";

import { UserAvatar } from "@/components/shared/user-avatar";
import type { Hangout, User } from "@/types";

interface RsvpTrackerProps {
  hangout: Hangout;
  members: User[];
}

export const RsvpTracker = ({ hangout, members }: RsvpTrackerProps) => {
  const getMember = (userId: string) => members.find((m) => m.id === userId);

  const sections = [
    { label: "Going", ids: hangout.rsvps.going, color: "text-teal-600" },
    { label: "Maybe", ids: hangout.rsvps.maybe, color: "text-amber-600" },
    {
      label: "Can't make it",
      ids: hangout.rsvps.cantMakeIt,
      color: "text-warmgray-500",
    },
  ];

  return (
    <div className="space-y-3">
      {sections.map(
        ({ label, ids, color }) =>
          ids.length > 0 && (
            <div key={label}>
              <p className={`mb-1.5 text-xs font-semibold ${color}`}>
                {label} ({ids.length})
              </p>
              <div className="flex flex-wrap gap-2">
                {ids.map((userId) => {
                  const member = getMember(userId);
                  if (!member) return null;
                  return (
                    <div
                      key={userId}
                      className="flex items-center gap-1.5 rounded-full bg-warmgray-100 py-1 pl-1 pr-3"
                    >
                      <UserAvatar user={member} size="sm" className="h-6 w-6" />
                      <span className="text-xs text-warmgray-700">
                        {member.displayName.split(" ")[0]}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )
      )}
    </div>
  );
};
