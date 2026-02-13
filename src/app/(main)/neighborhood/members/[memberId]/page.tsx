"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import { getUser } from "@/lib/db";
import { UserAvatar } from "@/components/shared/user-avatar";
import { ProfileSkeleton } from "@/components/shared/loading-skeleton";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { User } from "@/types";

export default function MemberProfilePage() {
  const params = useParams<{ memberId: string }>();
  const router = useRouter();
  const [member, setMember] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMember = async () => {
      if (!params.memberId) return;
      const data = await getUser(params.memberId);
      setMember(data);
      setLoading(false);
    };
    fetchMember();
  }, [params.memberId]);

  if (loading) {
    return <ProfileSkeleton />;
  }

  if (!member) {
    return (
      <div className="px-6 pt-6">
        <p className="text-warmgray-500">Member not found.</p>
      </div>
    );
  }

  const joinedDate = member.joinedAt?.toDate
    ? member.joinedAt.toDate().toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "Recently";

  return (
    <div className="px-6 pt-6">
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="mb-6 -ml-2 text-warmgray-600 hover:text-warmgray-900"
      >
        <ArrowLeft className="mr-1 h-4 w-4" />
        Back
      </Button>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center text-center"
      >
        <UserAvatar user={member} size="lg" className="mb-4" />
        <h1 className="mb-1 text-2xl font-bold text-warmgray-900">
          {member.displayName}
        </h1>
        {member.bio && (
          <p className="mb-4 max-w-xs text-warmgray-500">{member.bio}</p>
        )}
        <Separator className="my-4 w-full max-w-xs" />
        <p className="text-sm text-warmgray-400">Joined {joinedDate}</p>
        {member.missionsCompleted > 0 && (
          <p className="mt-1 text-sm text-warmgray-400">
            {member.missionsCompleted} mission
            {member.missionsCompleted === 1 ? "" : "s"} completed
          </p>
        )}
      </motion.div>
    </div>
  );
}
