"use client";

import { useState, useEffect, useCallback } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { ChatMessage } from "@/types";

export const useChat = (neighborhoodId: string | null | undefined) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!neighborhoodId) {
      setMessages([]);
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, "chat_messages"),
      where("neighborhoodId", "==", neighborhoodId)
    );

    const unsubscribe = onSnapshot(
      q,
      (snap) => {
        const msgs: ChatMessage[] = [];
        snap.forEach((d) => {
          msgs.push({ id: d.id, ...d.data() } as ChatMessage);
        });
        // Sort by createdAt ascending (oldest first)
        msgs.sort((a, b) => {
          const aRaw = a.createdAt as unknown;
          const bRaw = b.createdAt as unknown;
          const aTime =
            aRaw instanceof Timestamp
              ? aRaw.toMillis()
              : aRaw && typeof aRaw === "object" && "toDate" in aRaw
                ? (aRaw as Timestamp).toDate().getTime()
                : 0;
          const bTime =
            bRaw instanceof Timestamp
              ? bRaw.toMillis()
              : bRaw && typeof bRaw === "object" && "toDate" in bRaw
                ? (bRaw as Timestamp).toDate().getTime()
                : 0;
          return aTime - bTime;
        });
        setMessages(msgs.slice(-100));
        setLoading(false);
      },
      (error) => {
        console.error("Chat subscription error:", error);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [neighborhoodId]);

  // Send a message directly via client-side Firestore write
  const sendMessage = useCallback(
    async (userId: string, text: string) => {
      if (!neighborhoodId || !text.trim()) return;

      await addDoc(collection(db, "chat_messages"), {
        neighborhoodId,
        userId,
        text: text.trim(),
        createdAt: serverTimestamp(),
      });
    },
    [neighborhoodId]
  );

  return { messages, loading, sendMessage };
};
