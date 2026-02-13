"use client";

import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { EmailForm } from "./email-form";
import { HandwrittenText } from "@/components/shared/handwritten-text";

export const HeroSection = () => {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-24 text-center">
      {/* Decorative blobs — larger, more organic placement */}
      <div className="pointer-events-none absolute -left-40 top-1/4 h-[500px] w-[500px] rounded-full bg-sage-200/30 blur-[100px]" />
      <div className="pointer-events-none absolute -right-40 bottom-1/4 h-[500px] w-[500px] rounded-full bg-terracotta-200/20 blur-[100px]" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-sage-100/40 blur-[80px]" />

      <div className="relative z-10 mx-auto max-w-3xl">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="mb-6 inline-block rounded-full border border-sage-300 bg-sage-50 px-4 py-1.5 text-sm font-medium text-sage-700">
            Now accepting early members in LA
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6 text-5xl font-bold leading-[1.08] tracking-tight text-warmgray-900 sm:text-6xl lg:text-7xl"
        >
          50 people.
          <br />
          Weekly missions.
          <br />
          <HandwrittenText className="text-terracotta-500">
            Real friends.
          </HandwrittenText>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mx-auto mb-10 max-w-md text-lg leading-relaxed text-warmgray-500"
        >
          Get placed in a neighborhood of real people near you. Do something fun
          together every week. By week 7, you&apos;re meeting in person.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col items-center gap-3"
        >
          <EmailForm />
          <p className="text-sm text-warmgray-400">
            Free forever. No ads. No algorithms.
          </p>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-12 flex items-center justify-center gap-2"
        >
          <div className="flex -space-x-2">
            {[
              "bg-sage-400",
              "bg-terracotta-400",
              "bg-hangout",
              "bg-sage-600",
              "bg-terracotta-300",
            ].map((bg, i) => (
              <div
                key={i}
                className={`h-8 w-8 rounded-full border-2 border-warmgray-50 ${bg}`}
              />
            ))}
          </div>
          <HandwrittenText className="text-sm text-warmgray-500">
            join 100+ people on the waitlist
          </HandwrittenText>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ChevronDown className="h-5 w-5 text-warmgray-300" />
        </motion.div>
      </motion.div>
    </section>
  );
};
