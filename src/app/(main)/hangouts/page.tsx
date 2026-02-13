"use client";

import { MapPin } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { EmptyState } from "@/components/shared/empty-state";
import { HangoutCard } from "@/components/hangouts/hangout-card";
import { ProposeForm } from "@/components/hangouts/propose-form";
import { useUser } from "@/hooks/use-user";
import { useNeighborhood } from "@/hooks/use-neighborhood";
import { useHangouts } from "@/hooks/use-hangouts";
import { useAuthContext } from "@/components/shared/auth-provider";

export default function HangoutsPage() {
  const { user: authUser } = useAuthContext();
  const { user, loading: userLoading } = useUser();
  const { members, loading: neighborhoodLoading } = useNeighborhood(
    user?.neighborhoodId
  );
  const { hangouts, loading: hangoutsLoading } = useHangouts(
    user?.neighborhoodId
  );

  const isLoading = userLoading || neighborhoodLoading || hangoutsLoading;

  const handleRsvp = async (
    hangoutId: string,
    status: "going" | "maybe" | "cantMakeIt"
  ) => {
    if (!authUser) return;
    try {
      await fetch("/api/hangouts/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          hangoutId,
          userId: authUser.uid,
          status,
        }),
      });
    } catch {
      // Silently fail — RSVP will retry on next tap
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4 px-4 pt-6 sm:px-6">
        <div className="h-12 w-40 animate-pulse rounded-full bg-warmgray-200" />
        <div className="h-56 animate-pulse rounded-2xl bg-warmgray-200" />
        <div className="h-56 animate-pulse rounded-2xl bg-warmgray-200" />
      </div>
    );
  }

  if (!user?.neighborhoodId) {
    return (
      <EmptyState
        icon={MapPin}
        title="Hangouts coming soon"
        description="You'll be meeting your neighbors IRL before you know it. Coffee, potlucks, park hangs — the good stuff."
      />
    );
  }

  return (
    <div className="px-4 pb-6 pt-6 sm:px-6">
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-xl font-bold text-warmgray-900">Hangouts</h1>
        {authUser && user.neighborhoodId && (
          <ProposeForm
            neighborhoodId={user.neighborhoodId}
            userId={authUser.uid}
          />
        )}
      </div>

      {hangouts.length === 0 ? (
        <EmptyState
          icon={MapPin}
          title="No hangouts yet"
          description="Be the first to propose a meetup! Coffee, a hike, potluck — whatever sounds fun."
        />
      ) : (
        <div className="space-y-4">
          {hangouts.map((hangout, index) => (
            <HangoutCard
              key={hangout.id}
              hangout={hangout}
              members={members}
              currentUserId={authUser?.uid || ""}
              onRsvp={handleRsvp}
              index={index}
            />
          ))}
        </div>
      )}

      <Toaster position="top-center" richColors />
    </div>
  );
}
