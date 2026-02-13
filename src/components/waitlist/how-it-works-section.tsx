"use client";

import { Users, Compass, MapPin } from "lucide-react";
import { AnimatedSection } from "@/components/shared/animated-section";
import { HandwrittenText } from "@/components/shared/handwritten-text";

const steps = [
  {
    step: "01",
    icon: Users,
    title: "Get Placed",
    description:
      "Take a 2-minute quiz about how you connect. We match you with ~50 people in your area who vibe with your energy.",
    color: "text-sage-600",
    bgColor: "bg-sage-100",
    accent: "border-sage-300",
  },
  {
    step: "02",
    icon: Compass,
    title: "Do Missions",
    description:
      "Every week, your neighborhood gets a fun challenge. Cook something new. Design a fake restaurant. Share your favorite spot in the city.",
    color: "text-terracotta-600",
    bgColor: "bg-terracotta-100",
    accent: "border-terracotta-300",
  },
  {
    step: "03",
    icon: MapPin,
    title: "Meet IRL",
    description:
      "By week 7, you're meeting in person. Coffee runs, potlucks, park hangs. The kind of friendships that exist outside your phone.",
    color: "text-hangout",
    bgColor: "bg-sky-50",
    accent: "border-sky-200",
  },
];

export const HowItWorksSection = () => {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <AnimatedSection className="mb-16 text-center">
          <HandwrittenText className="mb-2 block text-lg text-sage-500">
            simple by design
          </HandwrittenText>
          <h2 className="text-3xl font-bold text-warmgray-900 sm:text-4xl">
            How it works
          </h2>
        </AnimatedSection>

        <div className="grid gap-8 sm:grid-cols-3">
          {steps.map((step, index) => (
            <AnimatedSection key={step.title} delay={index * 0.15}>
              <div
                className={`relative flex h-full flex-col rounded-2xl border ${step.accent} bg-white p-8 transition-shadow duration-300 hover:shadow-md`}
              >
                {/* Step number */}
                <span className="mb-4 text-sm font-semibold tracking-wider text-warmgray-300">
                  {step.step}
                </span>

                {/* Icon */}
                <div
                  className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${step.bgColor}`}
                >
                  <step.icon className={`h-6 w-6 ${step.color}`} />
                </div>

                {/* Content */}
                <h3 className="mb-3 text-xl font-bold text-warmgray-900">
                  {step.title}
                </h3>
                <p className="leading-relaxed text-warmgray-500">
                  {step.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};
