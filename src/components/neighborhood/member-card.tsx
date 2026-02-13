"use client";

import { UserAvatar } from "@/components/shared/user-avatar";
import type { User } from "@/types";

interface MemberCardProps {
  member: User;
  onSelect: (member: User) => void;
}

const getFirstName = (fullName: string) => {
  return fullName.split(" ")[0] || fullName;
};

export const MemberCard = ({ member, onSelect }: MemberCardProps) => {
  return (
    <button
      onClick={() => onSelect(member)}
      className="flex aspect-square w-full flex-col items-center justify-center rounded-2xl bg-white p-3 text-center transition-shadow duration-200 hover:shadow-md"
    >
      <UserAvatar user={member} size="md" className="mb-2" />
      <p className="w-full truncate text-sm font-semibold text-warmgray-900">
        {getFirstName(member.displayName)}
      </p>
      <p className="mt-0.5 w-full truncate text-xs text-warmgray-500">
        {member.bio || "\u00A0"}
      </p>
    </button>
  );
};
