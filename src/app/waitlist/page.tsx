import { HeroSection } from "@/components/waitlist/hero-section";
import { HowItWorksSection } from "@/components/waitlist/how-it-works-section";
import { ProblemSection } from "@/components/waitlist/problem-section";
import { FinalCtaSection } from "@/components/waitlist/final-cta-section";
import { Toaster } from "@/components/ui/sonner";

export default function WaitlistPage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <HowItWorksSection />
      <ProblemSection />
      <FinalCtaSection />
      <Toaster position="top-center" richColors />
    </main>
  );
}
