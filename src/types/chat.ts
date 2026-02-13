import type { Timestamp } from "firebase/firestore";

export interface ChatMessage {
  id: string;
  neighborhoodId: string;
  userId: string;
  text: string;
  mediaURL?: string;
  replyTo?: string;
  createdAt: Timestamp;
}
