import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";
import { sendWaitlistConfirmation } from "@/lib/email";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
});

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const { email } = schema.parse(body);

    const existing = await getAdminDb()
      .collection("waitlist_signups")
      .where("email", "==", email)
      .limit(1)
      .get();

    if (!existing.empty) {
      return NextResponse.json(
        { success: false, message: "You're already on the list!" },
        { status: 409 }
      );
    }

    const docRef = await getAdminDb().collection("waitlist_signups").add({
      email,
      signedUpAt: new Date(),
      source: "landing_page",
      quizCompleted: false,
      quizResponseId: null,
    });

    await sendWaitlistConfirmation(email);

    return NextResponse.json(
      { success: true, message: "You're on the list!", id: docRef.id },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid email address." },
        { status: 400 }
      );
    }
    console.error("Waitlist signup error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
};
