import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const { submissionId, userId, emoji } = body;

    if (!submissionId || !userId || !emoji) {
      return NextResponse.json(
        { success: false, message: "submissionId, userId, and emoji are required" },
        { status: 400 }
      );
    }

    const adminDb = getAdminDb();
    const subRef = adminDb.collection("mission_submissions").doc(submissionId);
    const snap = await subRef.get();

    if (!snap.exists) {
      return NextResponse.json(
        { success: false, message: "Submission not found" },
        { status: 404 }
      );
    }

    const data = snap.data();
    const reactions = data?.reactions || {};
    const emojiList: string[] = reactions[emoji] || [];

    if (emojiList.includes(userId)) {
      // Remove reaction
      await subRef.update({
        [`reactions.${emoji}`]: FieldValue.arrayRemove(userId),
      });
    } else {
      // Add reaction
      await subRef.update({
        [`reactions.${emoji}`]: FieldValue.arrayUnion(userId),
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Mission react error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to toggle reaction" },
      { status: 500 }
    );
  }
};
