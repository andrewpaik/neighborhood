import { redirect } from "next/navigation";
import { QuizFlow } from "@/components/onboarding/quiz-flow";
import { Toaster } from "@/components/ui/sonner";

interface OnboardingPageProps {
  searchParams: Promise<{ email?: string }>;
}

export default async function OnboardingPage({
  searchParams,
}: OnboardingPageProps) {
  const { email } = await searchParams;

  if (!email) {
    redirect("/waitlist");
  }

  return (
    <main className="min-h-screen bg-warmgray-50">
      <QuizFlow email={email} />
      <Toaster position="top-center" richColors />
    </main>
  );
}
