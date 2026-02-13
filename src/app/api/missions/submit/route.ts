import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const { userId, missionId, neighborhoodId, text, mediaURLs, mediaType } =
      body;

    if (!userId || !missionId || !neighborhoodId) {
      return NextResponse.json(
        { success: false, message: "userId, missionId, and neighborhoodId are required" },
        { status: 400 }
      );
    }

    if (!text && (!mediaURLs || mediaURLs.length === 0)) {
      return NextResponse.json(
        { success: false, message: "Submission must include text or media" },
        { status: 400 }
      );
    }

    const adminDb = getAdminDb();

    const submissionRef = await adminDb.collection("mission_submissions").add({
      missionId,
      userId,
      neighborhoodId,
      content: {
        text: text || "",
        mediaURLs: mediaURLs || [],
        mediaType: mediaType || undefined,
      },
      reactions: {},
      submittedAt: new Date(),
    });

    return NextResponse.json(
      { success: true, id: submissionRef.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Mission submit error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to submit mission" },
      { status: 500 }
    );
  }
};
