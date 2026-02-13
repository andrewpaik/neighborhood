import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const { hangoutId, userId, status } = body;

    if (!hangoutId || !userId || !status) {
      return NextResponse.json(
        { success: false, message: "hangoutId, userId, and status are required" },
        { status: 400 }
      );
    }

    if (!["going", "maybe", "cantMakeIt"].includes(status)) {
      return NextResponse.json(
        { success: false, message: "status must be going, maybe, or cantMakeIt" },
        { status: 400 }
      );
    }

    const adminDb = getAdminDb();
    const hangoutRef = adminDb.collection("hangouts").doc(hangoutId);

    // Remove user from all RSVP lists first, then add to the chosen one
    await hangoutRef.update({
      "rsvps.going": FieldValue.arrayRemove(userId),
      "rsvps.maybe": FieldValue.arrayRemove(userId),
      "rsvps.cantMakeIt": FieldValue.arrayRemove(userId),
    });

    await hangoutRef.update({
      [`rsvps.${status}`]: FieldValue.arrayUnion(userId),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Hangout RSVP error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to RSVP" },
      { status: 500 }
    );
  }
};
