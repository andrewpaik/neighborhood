"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Sprout } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { UserAvatar } from "@/components/shared/user-avatar";
import { ProfileSkeleton } from "@/components/shared/loading-skeleton";
import { HandwrittenText } from "@/components/shared/handwritten-text";
import { useUser } from "@/hooks/use-user";
import { useAuthContext } from "@/components/shared/auth-provider";
import { logOut } from "@/lib/auth";

export default function ProfilePage() {
  const { user: authUser } = useAuthContext();
  const { user, loading } = useUser();
  const router = useRouter();
  const [isSeeding, setIsSeeding] = useState(false);

  const handleLogout = async () => {
    await logOut();
    router.push("/waitlist");
  };

  const handleSeed = async () => {
    if (!authUser) return;
    setIsSeeding(true);
    try {
      const response = await fetch("/api/seed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: authUser.uid }),
      });
      const result = await response.json();
      if (response.ok) {
        toast.success(
          `Neighborhood created with ${result.memberCount} members!`
        );
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error("Failed to seed data");
    } finally {
      setIsSeeding(false);
    }
  };

  if (loading) {
    return <ProfileSkeleton />;
  }

  return (
    <div className="px-6 pt-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center text-center"
      >
        {user && (
          <>
            <UserAvatar user={user} size="lg" className="mb-4" />
            <h1 className="mb-1 text-2xl font-bold text-warmgray-900">
              {user.displayName.split(" ")[0]}
            </h1>
            <p className="text-warmgray-500">
              {user.bio || (
                <span className="italic text-warmgray-400">
                  No bio yet — add one soon!
                </span>
              )}
            </p>

            <Separator className="my-6 w-full max-w-xs" />

            <div className="mb-8 space-y-2 text-sm text-warmgray-500">
              <p>
                {user.neighborhoodId
                  ? "Placed in a neighborhood"
                  : "Not placed yet"}
              </p>
              <p>
                {user.missionsCompleted} mission
                {user.missionsCompleted === 1 ? "" : "s"} completed
              </p>
            </div>
          </>
        )}

        {/* Dev-only seed button */}
        {process.env.NODE_ENV !== "production" && !user?.neighborhoodId && (
          <Button
            onClick={handleSeed}
            disabled={isSeeding}
            variant="outline"
            className="mb-4 gap-2 rounded-full border-sage-300 text-sage-700 hover:bg-sage-50"
          >
            <Sprout className="h-4 w-4" />
            {isSeeding ? "Seeding..." : "Seed test neighborhood"}
          </Button>
        )}

        <Button
          onClick={handleLogout}
          variant="ghost"
          className="gap-2 text-warmgray-500 hover:text-warmgray-700"
        >
          <LogOut className="h-4 w-4" />
          Log out
        </Button>

        <HandwrittenText className="mt-8 block text-sm text-warmgray-300">
          Neighborhood v0.1
        </HandwrittenText>
      </motion.div>
      <Toaster position="top-center" richColors />
    </div>
  );
}
