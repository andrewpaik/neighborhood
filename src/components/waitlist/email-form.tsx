"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { trackEvent, identifyUser } from "@/lib/analytics";

const waitlistSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type WaitlistFormData = z.infer<typeof waitlistSchema>;

export const EmailForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WaitlistFormData>({
    resolver: zodResolver(waitlistSchema),
  });

  const onSubmit = async (data: WaitlistFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.status === 409) {
        toast.info(result.message);
        router.push(`/onboarding?email=${encodeURIComponent(data.email)}`);
        return;
      }

      if (!response.ok) {
        toast.error(result.message);
        return;
      }

      identifyUser(data.email);
      trackEvent("waitlist_signup", { email: data.email });
      toast.success("You're on the list! Check your email for confirmation.");
      router.push(`/onboarding?email=${encodeURIComponent(data.email)}`);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
    >
      <div className="flex-1">
        <Input
          type="email"
          placeholder="your@email.com"
          className="h-12 rounded-2xl border-warmgray-300 bg-white px-4 text-base placeholder:text-warmgray-400 focus-visible:ring-sage-500"
          {...register("email")}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-terracotta-600">
            {errors.email.message}
          </p>
        )}
      </div>
      <Button
        type="submit"
        disabled={isSubmitting}
        className="h-12 rounded-full bg-terracotta-500 px-8 text-base font-semibold text-white hover:bg-terracotta-600 disabled:opacity-50"
      >
        {isSubmitting ? "Joining..." : "Join the waitlist"}
      </Button>
    </form>
  );
};
