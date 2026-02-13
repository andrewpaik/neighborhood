import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  updateProfile,
  type User as FirebaseUser,
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "./firebase";

const googleProvider = new GoogleAuthProvider();

export const signUpWithEmail = async (
  email: string,
  password: string,
  displayName: string
) => {
  const credential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  await updateProfile(credential.user, { displayName });
  await createUserDocument(credential.user);
  return credential.user;
};

export const signInWithEmail = async (email: string, password: string) => {
  const credential = await signInWithEmailAndPassword(auth, email, password);
  return credential.user;
};

export const signInWithGoogle = async () => {
  const credential = await signInWithPopup(auth, googleProvider);
  const userDocRef = doc(db, "users", credential.user.uid);
  const existing = await getDoc(userDocRef);
  if (!existing.exists()) {
    await createUserDocument(credential.user);
  }
  return credential.user;
};

export const logOut = async () => {
  await firebaseSignOut(auth);
};

export const createUserDocument = async (firebaseUser: FirebaseUser) => {
  const userDocRef = doc(db, "users", firebaseUser.uid);
  await setDoc(userDocRef, {
    id: firebaseUser.uid,
    displayName: firebaseUser.displayName || "New Neighbor",
    bio: "",
    photoURL: firebaseUser.photoURL || "",
    neighborhoodId: null,
    quizResponses: [],
    connectionPreferences: {},
    joinedAt: serverTimestamp(),
    lastActiveAt: serverTimestamp(),
    missionsCompleted: 0,
    hangoutsAttended: 0,
    mutualConnections: [],
  });
};
