"use client";

import { useState, useEffect } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Hangout } from "@/types";

export const useHangouts = (neighborhoodId: string | null | undefined) => {
  const [hangouts, setHangouts] = useState<Hangout[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!neighborhoodId) {
      setHangouts([]);
      setLoading(false);
      return;
    }

    // Only filter by neighborhoodId — sort client-side to avoid
    // needing a Firestore composite index
    const q = query(
      collection(db, "hangouts"),
      where("neighborhoodId", "==", neighborhoodId)
    );

    const unsubscribe = onSnapshot(
      q,
      (snap) => {
        const items: Hangout[] = [];
        snap.forEach((d) => {
          items.push({ id: d.id, ...d.data() } as Hangout);
        });
        // Sort by proposedTime ascending
        items.sort((a, b) => {
          const aTime = a.proposedTime?.toDate?.() ?? new Date(0);
          const bTime = b.proposedTime?.toDate?.() ?? new Date(0);
          return aTime.getTime() - bTime.getTime();
        });
        setHangouts(items);
        setLoading(false);
      },
      (error) => {
        console.error("Hangouts subscription error:", error);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [neighborhoodId]);

  return { hangouts, loading };
};
