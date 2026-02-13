"use client";

import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { HandwrittenText } from "@/components/shared/handwritten-text";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { useAuthContext } from "@/components/shared/auth-provider";

interface QuizCompleteProps {
  email: string;
}

export const QuizComplete = ({ email }: QuizCompleteProps) => {
  const { user } = useAuthContext();
  const router = useRouter();
  const isAuthenticated = !!user;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
        <CheckCircle className="mx-auto mb-6 h-20 w-20 text-sage-500" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mb-4 text-3xl font-bold text-warmgray-900 sm:text-4xl"
      >
        {isAuthenticated ? "Welcome to the neighborhood!" : "You're on the list!"}
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <p className="mb-2 max-w-md text-lg text-warmgray-600">
          {isAuthenticated
            ? "Your quiz is complete. Let's meet your neighbors."
            : "We're building your neighborhood right now. You'll hear from us soon."}
        </p>
        <HandwrittenText className="mb-8 block text-xl text-terracotta-500">
          this is going to be fun
        </HandwrittenText>

        {isAuthenticated ? (
          <Button
            onClick={() => router.push("/neighborhood")}
            className="h-12 rounded-full bg-terracotta-500 px-8 text-base font-semibold text-white hover:bg-terracotta-600"
          >
            Enter your neighborhood
          </Button>
        ) : (
          <p className="text-sm text-warmgray-400">
            We&apos;ll email you at{" "}
            <span className="font-medium text-warmgray-600">{email}</span> when
            your neighborhood is ready.
          </p>
        )}
      </motion.div>
    </div>
  );
};
