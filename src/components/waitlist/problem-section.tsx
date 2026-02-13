"use client";

import { AnimatedSection } from "@/components/shared/animated-section";
import { HandwrittenText } from "@/components/shared/handwritten-text";

const stats = [
  {
    number: "67%",
    label: "of Gen Z reports feeling lonely",
    source: "Surgeon General, 2023",
  },
  {
    number: "49%",
    label: "cite lack of social opportunities",
    source: "Harvard Youth Poll",
  },
  {
    number: "84%",
    label: "prefer face-to-face connection",
    source: "Common Sense Media",
  },
  {
    number: "72%",
    label: "of teens use AI companions for connection",
    source: "Pew Research",
  },
];

export const ProblemSection = () => {
  return (
    <section className="relative overflow-hidden bg-warmgray-900 px-6 py-24">
      {/* Subtle gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-warmgray-900 via-warmgray-900 to-warmgray-800" />

      <div className="relative z-10 mx-auto max-w-5xl">
        <AnimatedSection className="mb-16 text-center">
          <HandwrittenText className="mb-2 block text-lg text-terracotta-400">
            this is not fine
          </HandwrittenText>
          <h2 className="mx-auto max-w-lg text-3xl font-bold text-warmgray-50 sm:text-4xl">
            We&apos;re more connected than ever — and lonelier than ever
          </h2>
        </AnimatedSection>

        <div className="mb-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <AnimatedSection key={stat.label} delay={index * 0.1}>
              <div className="rounded-2xl border border-warmgray-700/50 bg-warmgray-800/60 p-6 text-center backdrop-blur-sm">
                <p className="mb-2 text-4xl font-bold text-terracotta-400">
                  {stat.number}
                </p>
                <p className="mb-2 text-sm leading-snug text-warmgray-200">
                  {stat.label}
                </p>
                <p className="text-xs text-warmgray-500">{stat.source}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.5} className="mx-auto max-w-2xl text-center">
          <p className="text-lg leading-relaxed text-warmgray-400">
            Social media was supposed to connect us. Instead, it turned us into
            content consumers scrolling past each other. We think it&apos;s time
            for something different.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
};
