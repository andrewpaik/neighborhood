import type { Timestamp } from "firebase/firestore";

export interface WaitlistSignup {
  id: string;
  email: string;
  signedUpAt: Timestamp;
  source: string;
  quizCompleted: boolean;
  quizResponseId: string | null;
}

export interface QuizQuestion {
  id: string;
  text: string;
  subtext?: string;
  type: "single-choice" | "scale" | "multi-choice";
  options: QuizOption[];
  category: string;
}

export interface QuizOption {
  id: string;
  label: string;
  emoji?: string;
  description?: string;
}

export interface QuizResponse {
  questionId: string;
  questionText: string;
  answer: string;
  answerId: string;
}

export interface QuizSubmission {
  email: string;
  responses: QuizResponse[];
  connectionPreferences: ConnectionPreferences;
  completedAt: Timestamp;
}

export interface ConnectionPreferences {
  warmupStyle: string;
  activityVsConversation: string;
  socialTime: string;
  energyLevel: string;
  groupSize: string;
  geographicArea: string;
}
