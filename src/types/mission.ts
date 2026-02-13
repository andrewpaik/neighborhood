import type { Timestamp } from "firebase/firestore";

export type MissionType =
  | "low-stakes-intro"
  | "parallel-challenge"
  | "creative-collab"
  | "physical-goal"
  | "discussion"
  | "skill-share"
  | "irl-bridge"
  | "reflection";

export type SubmissionFormat = "photo" | "text" | "video" | "poll" | "mixed";

export interface Mission {
  id: string;
  week: number;
  title: string;
  description: string;
  type: MissionType;
  prompt: string;
  submissionFormat: SubmissionFormat;
  startsAt: Timestamp;
  endsAt: Timestamp;
  neighborhoodId: string;
}

export interface MissionSubmission {
  id: string;
  missionId: string;
  userId: string;
  neighborhoodId: string;
  content: {
    text?: string;
    mediaURLs?: string[];
    mediaType?: "photo" | "video";
  };
  reactions: Record<string, string[]>; // emoji -> userId[]
  submittedAt: Timestamp;
}
