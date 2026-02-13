"use client";

import { useState } from "react";
import { Users, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { useUser } from "@/hooks/use-user";
import { useNeighborhood } from "@/hooks/use-neighborhood";
import { useChat } from "@/hooks/use-chat";
import { useAuthContext } from "@/components/shared/auth-provider";
import { NeighborhoodHeader } from "@/components/neighborhood/neighborhood-header";
import { NeighborhoodPulse } from "@/components/neighborhood/neighborhood-pulse";
import { MemberGrid } from "@/components/neighborhood/member-grid";
import { MemberGridSkeleton } from "@/components/shared/loading-skeleton";
import { MemberDetail } from "@/components/neighborhood/member-detail";
import { EmptyState } from "@/components/shared/empty-state";
import { ChatWindow } from "@/components/chat/chat-window";
import { cn } from "@/lib/utils";
import type { User } from "@/types";

export default function NeighborhoodPage() {
  const { user: authUser } = useAuthContext();
  const { user, loading: userLoading } = useUser();
  const { neighborhood, members, loading: neighborhoodLoading } =
    useNeighborhood(user?.neighborhoodId);
  const { messages, loading: chatLoading, sendMessage } = useChat(
    user?.neighborhoodId
  );
  const [activeTab, setActiveTab] = useState<"members" | "chat">("members");
  const [selectedMember, setSelectedMember] = useState<User | null>(null);

  const isLoading = userLoading || neighborhoodLoading;

  const handleSendMessage = async (text: string) => {
    if (!authUser) return;
    try {
      await sendMessage(authUser.uid, text);
    } catch {
      toast.error("Failed to send message");
    }
  };

  return (
    <div className="px-4 pt-6 sm:px-6">
      {isLoading ? (
        <>
          <div className="mb-6">
            <div className="mb-1 h-4 w-28 animate-pulse rounded bg-warmgray-200" />
            <div className="h-7 w-40 animate-pulse rounded bg-warmgray-200" />
          </div>
          <MemberGridSkeleton />
        </>
      ) : !user?.neighborhoodId || !neighborhood ? (
        <EmptyState
          icon={Users}
          title="You haven't been placed yet"
          description="We're building your neighborhood right now. You'll be matched with people who connect like you do."
        />
      ) : (
        <>
          <NeighborhoodHeader name={neighborhood.name} />
          <NeighborhoodPulse
            activeCount={neighborhood.stats.activeMembers7d}
            totalCount={members.length}
          />

          {/* Custom tab switcher to avoid Radix mounting issues */}
          <div className="mt-4 mb-4 flex w-full rounded-full bg-warmgray-100 p-1">
            <button
              onClick={() => setActiveTab("members")}
              className={cn(
                "flex flex-1 items-center justify-center gap-1.5 rounded-full py-2 text-sm font-medium transition-all",
                activeTab === "members"
                  ? "bg-white text-warmgray-900 shadow-sm"
                  : "text-warmgray-500"
              )}
            >
              <Users className="h-4 w-4" />
              Members
            </button>
            <button
              onClick={() => setActiveTab("chat")}
              className={cn(
                "flex flex-1 items-center justify-center gap-1.5 rounded-full py-2 text-sm font-medium transition-all",
                activeTab === "chat"
                  ? "bg-white text-warmgray-900 shadow-sm"
                  : "text-warmgray-500"
              )}
            >
              <MessageCircle className="h-4 w-4" />
              Chat
            </button>
          </div>

          {activeTab === "members" && (
            <MemberGrid key={members.length} members={members} onSelect={setSelectedMember} />
          )}

          <MemberDetail member={selectedMember} onClose={() => setSelectedMember(null)} />

          {activeTab === "chat" && (
            <ChatWindow
              messages={messages}
              members={members}
              currentUserId={authUser?.uid || ""}
              onSend={handleSendMessage}
              loading={chatLoading}
            />
          )}
        </>
      )}
      <Toaster position="top-center" richColors />
    </div>
  );
}
