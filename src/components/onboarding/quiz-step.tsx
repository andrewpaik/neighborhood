"use client";

import { cn } from "@/lib/utils";
import type { QuizQuestion } from "@/types";

interface QuizStepProps {
  question: QuizQuestion;
  questionNumber: number;
  totalQuestions: number;
  selectedAnswer: string | null;
  onSelect: (answerId: string) => void;
}

export const QuizStep = ({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  onSelect,
}: QuizStepProps) => {
  return (
    <div className="flex flex-col items-center px-4">
      <p className="mb-2 text-sm font-medium text-sage-500">
        Question {questionNumber} of {totalQuestions}
      </p>

      <h2 className="mb-2 text-center text-2xl font-bold text-warmgray-900 sm:text-3xl">
        {question.text}
      </h2>

      {question.subtext && (
        <p className="mb-8 text-center text-warmgray-500">
          {question.subtext}
        </p>
      )}

      {!question.subtext && <div className="mb-8" />}

      <div className="flex w-full max-w-md flex-col gap-3">
        {question.options.map((option) => (
          <button
            key={option.id}
            onClick={() => onSelect(option.id)}
            className={cn(
              "w-full rounded-2xl border-2 p-4 text-left transition-all duration-200",
              "hover:border-sage-400 hover:shadow-sm",
              "focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2",
              selectedAnswer === option.id
                ? "border-sage-500 bg-sage-50 scale-[1.02]"
                : "border-warmgray-200 bg-white"
            )}
          >
            <div className="flex items-start gap-3">
              {option.emoji && (
                <span className="text-2xl">{option.emoji}</span>
              )}
              <div>
                <p className="font-semibold text-warmgray-900">
                  {option.label}
                </p>
                {option.description && (
                  <p className="mt-0.5 text-sm text-warmgray-500">
                    {option.description}
                  </p>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
