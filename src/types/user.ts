import type { Timestamp } from "firebase/firestore";
import type { QuizResponse, ConnectionPreferences } from "./waitlist";

export interface User {
  id: string;
  displayName: string;
  bio: string;
  photoURL: string;
  neighborhoodId: string | null;
  quizResponses: QuizResponse[];
  connectionPreferences: Partial<ConnectionPreferences>;
  joinedAt: Timestamp;
  lastActiveAt: Timestamp;
  missionsCompleted: number;
  hangoutsAttended: number;
  mutualConnections: string[];
}
