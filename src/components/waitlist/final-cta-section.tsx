"use client";

import { AnimatedSection } from "@/components/shared/animated-section";
import { HandwrittenText } from "@/components/shared/handwritten-text";
import { EmailForm } from "./email-form";

export const FinalCtaSection = () => {
  return (
    <section className="relative overflow-hidden px-6 py-24">
      {/* Background blobs */}
      <div className="pointer-events-none absolute -right-20 top-0 h-[400px] w-[400px] rounded-full bg-sage-100/50 blur-[80px]" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-[300px] w-[300px] rounded-full bg-terracotta-100/30 blur-[80px]" />

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <AnimatedSection>
          <HandwrittenText className="mb-3 block text-lg text-terracotta-500">
            your people are out there
          </HandwrittenText>
          <h2 className="mb-4 text-3xl font-bold text-warmgray-900 sm:text-4xl lg:text-5xl">
            Your neighborhood
            <br />
            is waiting
          </h2>
          <p className="mb-10 text-lg text-warmgray-500">
            200 spots for our first launch in Los Angeles.
            <br className="hidden sm:block" />
            Take the quiz. Get on the list.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.2} className="flex flex-col items-center">
          <EmailForm />
          <HandwrittenText className="mt-6 block text-base text-warmgray-400">
            not another social media app — pinky promise
          </HandwrittenText>
        </AnimatedSection>
      </div>

      {/* Footer */}
      <div className="relative z-10 mx-auto mt-20 max-w-5xl border-t border-warmgray-200 pt-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm font-semibold text-warmgray-800">
            Neighborhood
          </p>
          <p className="text-sm text-warmgray-400">
            Made with care in Los Angeles
          </p>
        </div>
      </div>
    </section>
  );
};
