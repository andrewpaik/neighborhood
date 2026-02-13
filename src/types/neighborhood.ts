import type { Timestamp } from "firebase/firestore";

export interface NeighborhoodStats {
  activeMembers7d: number;
  messagesPerDay: number;
  missionParticipationRate: number;
  irlMeetupsCount: number;
}

export interface Neighborhood {
  id: string;
  name: string;
  members: string[];
  createdAt: Timestamp;
  currentMissionId: string;
  missionWeek: number;
  healthScore: number;
  stats: NeighborhoodStats;
}
