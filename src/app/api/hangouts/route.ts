import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const {
      neighborhoodId,
      proposedBy,
      title,
      description,
      locationName,
      locationAddress,
      proposedTime,
    } = body;

    if (!neighborhoodId || !proposedBy || !title || !proposedTime) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const adminDb = getAdminDb();

    const hangoutRef = await adminDb.collection("hangouts").add({
      neighborhoodId,
      proposedBy,
      title,
      description: description || "",
      location: {
        name: locationName || "",
        address: locationAddress || "",
      },
      proposedTime: new Date(proposedTime),
      rsvps: {
        going: [proposedBy],
        maybe: [],
        cantMakeIt: [],
      },
      status: "proposed",
      createdAt: new Date(),
    });

    return NextResponse.json(
      { success: true, id: hangoutRef.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Hangout create error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create hangout" },
      { status: 500 }
    );
  }
};
