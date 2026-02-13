import {
  doc,
  getDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
  type DocumentData,
} from "firebase/firestore";
import { db } from "./firebase";
import type { User, Neighborhood } from "@/types";

export const usersRef = collection(db, "users");
export const neighborhoodsRef = collection(db, "neighborhoods");

export const getUser = async (userId: string): Promise<User | null> => {
  const snap = await getDoc(doc(db, "users", userId));
  return snap.exists() ? ({ id: snap.id, ...snap.data() } as User) : null;
};

export const updateUser = async (
  userId: string,
  data: Partial<User>
) => {
  await updateDoc(doc(db, "users", userId), data as DocumentData);
};

export const getNeighborhood = async (
  neighborhoodId: string
): Promise<Neighborhood | null> => {
  const snap = await getDoc(doc(db, "neighborhoods", neighborhoodId));
  return snap.exists()
    ? ({ id: snap.id, ...snap.data() } as Neighborhood)
    : null;
};

export const getNeighborhoodMembers = async (
  memberIds: string[]
): Promise<User[]> => {
  if (memberIds.length === 0) return [];

  const members: User[] = [];
  // Firestore 'in' queries support max 30 items, so batch
  for (let i = 0; i < memberIds.length; i += 30) {
    const batch = memberIds.slice(i, i + 30);
    const q = query(usersRef, where("__name__", "in", batch));
    const snap = await getDocs(q);
    snap.forEach((d) => {
      members.push({ id: d.id, ...d.data() } as User);
    });
  }
  return members;
};
