"use client";

import { useState, useEffect } from "react";
import {
  doc,
  collection,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Mission, MissionSubmission } from "@/types";

export const useMission = (
  neighborhoodId: string | null | undefined,
  missionId: string | null | undefined
) => {
  const [mission, setMission] = useState<Mission | null>(null);
  const [submissions, setSubmissions] = useState<MissionSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  // Subscribe to mission document
  useEffect(() => {
    if (!missionId) {
      setMission(null);
      setLoading(false);
      return;
    }

    const unsubscribe = onSnapshot(
      doc(db, "missions", missionId),
      (snap) => {
        if (snap.exists()) {
          setMission({ id: snap.id, ...snap.data() } as Mission);
        } else {
          setMission(null);
        }
        setLoading(false);
      },
      (error) => {
        console.error("Mission subscription error:", error);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [missionId]);

  // Subscribe to mission submissions
  useEffect(() => {
    if (!neighborhoodId || !missionId) {
      setSubmissions([]);
      return;
    }

    const q = query(
      collection(db, "mission_submissions"),
      orderBy("submittedAt", "desc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snap) => {
        const subs: MissionSubmission[] = [];
        snap.forEach((d) => {
          const data = { id: d.id, ...d.data() } as MissionSubmission;
          // Filter client-side for this mission + neighborhood
          if (
            data.missionId === missionId &&
            data.neighborhoodId === neighborhoodId
          ) {
            subs.push(data);
          }
        });
        setSubmissions(subs);
      },
      (error) => {
        console.error("Submissions subscription error:", error);
      }
    );

    return unsubscribe;
  }, [neighborhoodId, missionId]);

  return { mission, submissions, loading };
};
