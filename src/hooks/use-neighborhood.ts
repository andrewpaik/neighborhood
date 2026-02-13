"use client";

import { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { getNeighborhoodMembers } from "@/lib/db";
import type { Neighborhood, User } from "@/types";

export const useNeighborhood = (neighborhoodId: string | null | undefined) => {
  const [neighborhood, setNeighborhood] = useState<Neighborhood | null>(null);
  const [members, setMembers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!neighborhoodId) {
      setNeighborhood(null);
      setMembers([]);
      setLoading(false);
      return;
    }

    let cancelled = false;

    const unsubscribe = onSnapshot(
      doc(db, "neighborhoods", neighborhoodId),
      async (snap) => {
        if (cancelled) return;

        if (!snap.exists()) {
          setNeighborhood(null);
          setMembers([]);
          setLoading(false);
          return;
        }

        const data = { id: snap.id, ...snap.data() } as Neighborhood;
        let fetchedMembers: User[] = [];

        if (data.members.length > 0) {
          fetchedMembers = await getNeighborhoodMembers(data.members);
        }

        if (cancelled) return;

        // Set all state together so React batches a single re-render
        setNeighborhood(data);
        setMembers(fetchedMembers);
        setLoading(false);
      },
      (error) => {
        console.error("Neighborhood subscription error:", error);
        setLoading(false);
      }
    );

    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, [neighborhoodId]);

  return { neighborhood, members, loading };
};
