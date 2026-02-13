import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";
import { z } from "zod";

const quizResponseSchema = z.object({
  questionId: z.string(),
  questionText: z.string(),
  answer: z.string(),
  answerId: z.string(),
});

const schema = z.object({
  email: z.string().email(),
  responses: z.array(quizResponseSchema).min(1),
  connectionPreferences: z.object({
    warmupStyle: z.string(),
    activityVsConversation: z.string(),
    socialTime: z.string(),
    energyLevel: z.string(),
    groupSize: z.string(),
    geographicArea: z.string(),
  }),
});

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const data = schema.parse(body);

    const quizDoc = await getAdminDb().collection("quiz_responses").add({
      ...data,
      completedAt: new Date(),
    });

    const signupQuery = await getAdminDb()
      .collection("waitlist_signups")
      .where("email", "==", data.email)
      .limit(1)
      .get();

    if (!signupQuery.empty) {
      const signupDoc = signupQuery.docs[0];
      await signupDoc.ref.update({
        quizCompleted: true,
        quizResponseId: quizDoc.id,
      });
    }

    return NextResponse.json(
      { success: true, message: "Quiz submitted!" },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: "Invalid quiz data." },
        { status: 400 }
      );
    }
    console.error("Quiz submission error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
};
