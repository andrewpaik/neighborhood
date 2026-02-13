import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const { neighborhoodId, userId, text } = body;

    if (!neighborhoodId || !userId || !text?.trim()) {
      return NextResponse.json(
        { success: false, message: "neighborhoodId, userId, and text are required" },
        { status: 400 }
      );
    }

    const adminDb = getAdminDb();

    const msgRef = await adminDb.collection("chat_messages").add({
      neighborhoodId,
      userId,
      text: text.trim(),
      createdAt: new Date(),
    });

    return NextResponse.json(
      { success: true, id: msgRef.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Chat send error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send message" },
      { status: 500 }
    );
  }
};
