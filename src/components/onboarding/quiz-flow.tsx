"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { QuizStep } from "./quiz-step";
import { QuizComplete } from "./quiz-complete";
import { quizQuestions } from "@/config/quiz-questions";
import { trackEvent } from "@/lib/analytics";
import type { QuizResponse, ConnectionPreferences } from "@/types";

interface QuizFlowProps {
  email: string;
}

export const QuizFlow = ({ email }: QuizFlowProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<QuizResponse[]>([]);
  const [direction, setDirection] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalQuestions = quizQuestions.length;
  const progress = ((currentStep + 1) / totalQuestions) * 100;
  const currentQuestion = quizQuestions[currentStep];

  const currentAnswer =
    responses.find((r) => r.questionId === currentQuestion.id)?.answerId ??
    null;

  const buildConnectionPreferences = useCallback(
    (allResponses: QuizResponse[]): ConnectionPreferences => {
      const findAnswer = (questionId: string) =>
        allResponses.find((r) => r.questionId === questionId)?.answer ?? "";

      return {
        warmupStyle: findAnswer("warmup-style"),
        activityVsConversation: findAnswer("activity-vs-conversation"),
        socialTime: findAnswer("social-time"),
        energyLevel: findAnswer("energy-level"),
        groupSize: findAnswer("group-size"),
        geographicArea: findAnswer("geographic-area"),
      };
    },
    []
  );

  const submitQuiz = useCallback(
    async (allResponses: QuizResponse[]) => {
      setIsSubmitting(true);
      try {
        const connectionPreferences =
          buildConnectionPreferences(allResponses);

        const response = await fetch("/api/quiz", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            responses: allResponses,
            connectionPreferences,
          }),
        });

        if (!response.ok) {
          const result = await response.json();
          toast.error(result.message);
          return;
        }

        trackEvent("quiz_completed", {
          email,
          totalQuestions,
        });
        setIsComplete(true);
      } catch {
        toast.error("Something went wrong. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [email, totalQuestions, buildConnectionPreferences]
  );

  const handleSelect = useCallback(
    (answerId: string) => {
      const question = quizQuestions[currentStep];
      const selectedOption = question.options.find((o) => o.id === answerId);
      if (!selectedOption) return;

      const newResponse: QuizResponse = {
        questionId: question.id,
        questionText: question.text,
        answer: selectedOption.label,
        answerId,
      };

      const updatedResponses = [
        ...responses.filter((r) => r.questionId !== question.id),
        newResponse,
      ];
      setResponses(updatedResponses);

      trackEvent("quiz_question_answered", {
        questionId: question.id,
        answerId,
        questionNumber: currentStep + 1,
      });

      // Auto-advance after 300ms
      setTimeout(() => {
        if (currentStep < totalQuestions - 1) {
          setDirection(1);
          setCurrentStep((prev) => prev + 1);
        } else {
          submitQuiz(updatedResponses);
        }
      }, 300);
    },
    [currentStep, responses, totalQuestions, submitQuiz]
  );

  const handleBack = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep((prev) => prev - 1);
    }
  };

  if (isComplete) {
    return <QuizComplete email={email} />;
  }

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 200 : -200,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({
      x: dir > 0 ? -200 : 200,
      opacity: 0,
    }),
  };

  return (
    <div className="flex min-h-screen flex-col bg-warmgray-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-warmgray-50/80 px-6 pb-4 pt-6 backdrop-blur-sm">
        <div className="mx-auto flex max-w-md items-center gap-4">
          {currentStep > 0 ? (
            <button
              onClick={handleBack}
              className="flex h-10 w-10 items-center justify-center rounded-full text-warmgray-600 transition-colors hover:bg-warmgray-200"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
          ) : (
            <div className="h-10 w-10" />
          )}
          <Progress
            value={progress}
            className="h-2 flex-1 bg-warmgray-200 [&>div]:bg-sage-500"
          />
        </div>
      </div>

      {/* Question */}
      <div className="flex flex-1 items-center justify-center py-8">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="w-full"
          >
            <QuizStep
              question={currentQuestion}
              questionNumber={currentStep + 1}
              totalQuestions={totalQuestions}
              selectedAnswer={currentAnswer}
              onSelect={handleSelect}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Submitting overlay */}
      {isSubmitting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-warmgray-50/80 backdrop-blur-sm">
          <div className="text-center">
            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-sage-200 border-t-sage-500" />
            <p className="text-warmgray-600">Building your profile...</p>
          </div>
        </div>
      )}

      {/* Footer with skip option on last question */}
      {currentStep === totalQuestions - 1 && (
        <div className="px-6 pb-8 text-center">
          <Button
            variant="ghost"
            onClick={() => submitQuiz(responses)}
            className="text-warmgray-400 hover:text-warmgray-600"
            disabled={isSubmitting}
          >
            Skip and finish
          </Button>
        </div>
      )}
    </div>
  );
};
