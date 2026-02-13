"use client";

import { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuthContext } from "@/components/shared/auth-provider";
import type { User } from "@/types";

export const useUser = () => {
  const { user: authUser } = useAuthContext();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authUser) {
      setUser(null);
      setLoading(false);
      return;
    }

    const unsubscribe = onSnapshot(
      doc(db, "users", authUser.uid),
      (snap) => {
        setUser(
          snap.exists() ? ({ id: snap.id, ...snap.data() } as User) : null
        );
        setLoading(false);
      },
      (error) => {
        console.error("User subscription error:", error);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [authUser]);

  return { user, loading };
};
