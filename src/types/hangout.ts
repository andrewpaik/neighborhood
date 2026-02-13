import type { Timestamp } from "firebase/firestore";

export interface HangoutLocation {
  name: string;
  address: string;
  coordinates?: { lat: number; lng: number };
}

export interface Hangout {
  id: string;
  neighborhoodId: string;
  proposedBy: string;
  title: string;
  description: string;
  location: HangoutLocation;
  proposedTime: Timestamp;
  rsvps: {
    going: string[];
    maybe: string[];
    cantMakeIt: string[];
  };
  status: "proposed" | "confirmed" | "completed" | "cancelled";
  postEventFeedback?: {
    attendees: string[];
    wouldDoAgain: boolean;
    connectionsMade: number;
  };
  createdAt: Timestamp;
}
