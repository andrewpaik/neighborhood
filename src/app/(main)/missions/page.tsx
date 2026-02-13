"use client";

import { useMemo, useState, useCallback } from "react";
import { Compass } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { EmptyState } from "@/components/shared/empty-state";
import { MissionCard } from "@/components/missions/mission-card";
import { MissionCountdown } from "@/components/missions/mission-countdown";
import { MissionSubmission } from "@/components/missions/mission-submission";
import { MissionFeed } from "@/components/missions/mission-feed";
import { MissionProgress } from "@/components/missions/mission-progress";
import { useUser } from "@/hooks/use-user";
import { useNeighborhood } from "@/hooks/use-neighborhood";
import { useMission } from "@/hooks/use-mission";
import { useAuthContext } from "@/components/shared/auth-provider";
import { MISSION_PROGRESSION } from "@/config/missions";
import type { Mission, MissionSubmission as MissionSubmissionType } from "@/types";
import { Timestamp } from "firebase/firestore";

// Generate a fake mission for demo purposes
const createMockMission = (neighborhoodId: string): Mission => {
  const template = MISSION_PROGRESSION[0];
  const now = new Date();
  const startsAt = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);
  const endsAt = new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000);

  return {
    id: "mock-mission-1",
    week: template.week,
    title: template.title,
    description: template.description,
    type: template.type,
    prompt: template.prompt,
    submissionFormat: template.submissionFormat,
    startsAt: Timestamp.fromDate(startsAt),
    endsAt: Timestamp.fromDate(endsAt),
    neighborhoodId,
  };
};

const MOCK_SUBMISSIONS_DATA: {
  text: string;
  image: string;
  reactions: Record<string, string[]>;
  hoursAgo: number;
}[] = [
  {
    text: "The rooftop of my apartment building at sunset. You can see downtown all the way to the mountains. I come up here when I need to think.",
    image: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&q=80&fit=crop",
    reactions: { fire: ["m1", "m2"], heart: ["m3", "m4", "m5"] },
    hoursAgo: 36,
  },
  {
    text: "Grand Central Market. Something about the chaos and the smells and everyone eating together. It feels like what a city should be.",
    image: "https://images.unsplash.com/photo-1567521464027-f127ff144326?w=800&q=80&fit=crop",
    reactions: { heart: ["m1", "m6"], clap: ["m7", "m8"] },
    hoursAgo: 30,
  },
  {
    text: "This little bench in Echo Park by the lake. I eat my lunch there every Tuesday. The ducks know me by now.",
    image: "https://images.unsplash.com/photo-1596566053310-3f1c8a0e5e5e?w=800&q=80&fit=crop",
    reactions: { laugh: ["m1", "m2"], heart: ["m3", "m9", "m10"] },
    hoursAgo: 24,
  },
  {
    text: "The Last Bookstore. Specifically the sci-fi section upstairs. I've spent entire Saturdays there and it never gets old.",
    image: "https://images.unsplash.com/photo-1526243741027-444d633d7365?w=800&q=80&fit=crop",
    reactions: { hundred: ["m4", "m5"], fire: ["m11"] },
    hoursAgo: 18,
  },
  {
    text: "Venice Beach boardwalk at 6am before all the tourists. It's so peaceful you can hear the waves.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80&fit=crop",
    reactions: { heart: ["m6", "m7", "m12"] },
    hoursAgo: 12,
  },
  {
    text: "My favorite taco truck on Figueroa. The al pastor is life-changing. I'll fight anyone who disagrees.",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&q=80&fit=crop",
    reactions: { fire: ["m1", "m8", "m13"], laugh: ["m9", "m14"] },
    hoursAgo: 8,
  },
];

const createMockSubmissions = (
  missionId: string,
  neighborhoodId: string,
  memberIds: string[]
): MissionSubmissionType[] => {
  const now = new Date();
  return MOCK_SUBMISSIONS_DATA.map((sub, i) => ({
    id: `mock-sub-${i}`,
    missionId,
    userId: memberIds[i] || `mock-user-${i}`,
    neighborhoodId,
    content: { text: sub.text, mediaURLs: [sub.image], mediaType: "photo" as const },
    reactions: sub.reactions,
    submittedAt: Timestamp.fromDate(
      new Date(now.getTime() - sub.hoursAgo * 60 * 60 * 1000)
    ),
  }));
};

export default function MissionsPage() {
  const { user: authUser } = useAuthContext();
  const { user, loading: userLoading } = useUser();
  const { neighborhood, members, loading: neighborhoodLoading } =
    useNeighborhood(user?.neighborhoodId);
  const { mission: liveMission, submissions: liveSubmissions, loading: missionLoading } =
    useMission(user?.neighborhoodId, neighborhood?.currentMissionId);

  const isLoading = userLoading || neighborhoodLoading || missionLoading;

  const neighborhoodId = user?.neighborhoodId || "mock-neighborhood";
  const memberIds = members.map((m) => m.id);

  const mockMission = useMemo(
    () => createMockMission(neighborhoodId),
    [neighborhoodId]
  );
  const initialMockSubmissions = useMemo(
    () => createMockSubmissions("mock-mission-1", neighborhoodId, memberIds),
    [neighborhoodId, memberIds]
  );

  // Local reaction state for mock submissions
  const [mockReactions, setMockReactions] = useState<Record<string, Record<string, string[]>>>({});

  const mission = liveMission || mockMission;
  const isUsingMockData = !liveMission;

  // Apply local reaction overrides to mock submissions
  const submissions = useMemo(() => {
    const base = liveSubmissions.length > 0 ? liveSubmissions : initialMockSubmissions;
    if (!isUsingMockData) return base;

    return base.map((sub) => {
      const overrides = mockReactions[sub.id];
      if (!overrides) return sub;
      return { ...sub, reactions: overrides };
    });
  }, [liveSubmissions, initialMockSubmissions, isUsingMockData, mockReactions]);

  const handleReact = useCallback(
    async (submissionId: string, emoji: string) => {
      if (!authUser) return;
      const userId = authUser.uid;

      if (submissionId.startsWith("mock-")) {
        // Toggle reaction locally for mock data
        setMockReactions((prev) => {
          const current = submissions.find((s) => s.id === submissionId);
          if (!current) return prev;

          const existingReactions = prev[submissionId] || { ...current.reactions };
          const emojiList = [...(existingReactions[emoji] || [])];

          if (emojiList.includes(userId)) {
            // Remove
            const updated = emojiList.filter((id) => id !== userId);
            return {
              ...prev,
              [submissionId]: { ...existingReactions, [emoji]: updated },
            };
          } else {
            // Add
            return {
              ...prev,
              [submissionId]: { ...existingReactions, [emoji]: [...emojiList, userId] },
            };
          }
        });
        return;
      }

      // Live data — use API
      try {
        await fetch("/api/missions/react", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ submissionId, userId, emoji }),
        });
      } catch {
        // Silently fail
      }
    },
    [authUser, submissions]
  );

  // Get unique participants
  const participantIds = [...new Set(submissions.map((s) => s.userId))];
  const participants = members.filter((m) => participantIds.includes(m.id));

  // Countdown: next mission = current mission end date
  const missionEndDate =
    mission.endsAt instanceof Timestamp
      ? mission.endsAt.toDate()
      : mission.endsAt;

  if (isLoading) {
    return (
      <div className="space-y-4 px-4 pt-6 sm:px-6">
        <div className="h-48 animate-pulse rounded-2xl bg-warmgray-200" />
        <div className="h-32 animate-pulse rounded-2xl bg-warmgray-200" />
        <div className="h-24 animate-pulse rounded-2xl bg-warmgray-200" />
      </div>
    );
  }

  if (!user?.neighborhoodId) {
    return (
      <EmptyState
        icon={Compass}
        title="No active mission"
        description="Your first mission drops when your neighborhood is activated. Get ready for something fun."
      />
    );
  }

  return (
    <div className="space-y-4 px-4 pb-6 pt-6 sm:px-6">
      <MissionCard
        mission={mission}
        participantCount={participantIds.length}
        totalMembers={members.length || 16}
      />

      <MissionCountdown endsAt={missionEndDate} />

      {/* Response bar — always visible */}
      {authUser && user?.neighborhoodId && (
        <MissionSubmission
          userId={authUser.uid}
          missionId={mission.id}
          neighborhoodId={user.neighborhoodId}
        />
      )}

      {members.length > 0 && (
        <MissionProgress
          participants={participants}
          totalMembers={members.length}
        />
      )}

      <div>
        <h3 className="mb-3 text-sm font-semibold text-warmgray-700">
          Neighborhood submissions
        </h3>
        <MissionFeed
          submissions={submissions}
          members={members}
          currentUserId={authUser?.uid || ""}
          onReact={handleReact}
        />
      </div>

      <Toaster position="top-center" richColors />
    </div>
  );
}
