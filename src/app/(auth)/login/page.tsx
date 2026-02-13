"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { signInWithEmail, signInWithGoogle } from "@/lib/auth";
import { trackEvent } from "@/lib/analytics";
import { HandwrittenText } from "@/components/shared/handwritten-text";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(1, "Please enter your password"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);
    try {
      await signInWithEmail(data.email, data.password);
      trackEvent("login_completed", { method: "email" });
      router.push("/neighborhood");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      if (
        message.includes("wrong-password") ||
        message.includes("invalid-credential")
      ) {
        toast.error("Incorrect email or password.");
      } else if (message.includes("user-not-found")) {
        toast.error("No account found with this email.");
      } else {
        toast.error(message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      trackEvent("login_completed", { method: "google" });
      router.push("/neighborhood");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      toast.error(message);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm"
      >
        <div className="mb-8 text-center">
          <h1 className="mb-1 text-3xl font-bold text-warmgray-900">
            Welcome back
          </h1>
          <HandwrittenText className="text-lg text-sage-600">
            your neighborhood missed you
          </HandwrittenText>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <Label htmlFor="email" className="text-warmgray-700">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              className="mt-1.5 h-12 rounded-2xl border-warmgray-300 bg-white text-base placeholder:text-warmgray-400 focus-visible:ring-sage-500"
              {...register("email")}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-terracotta-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="password" className="text-warmgray-700">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Your password"
              className="mt-1.5 h-12 rounded-2xl border-warmgray-300 bg-white text-base placeholder:text-warmgray-400 focus-visible:ring-sage-500"
              {...register("password")}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-terracotta-600">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 h-12 rounded-full bg-terracotta-500 text-base font-semibold text-white hover:bg-terracotta-600 disabled:opacity-50"
          >
            {isSubmitting ? "Logging in..." : "Log in"}
          </Button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-warmgray-200" />
          <span className="text-sm text-warmgray-400">or</span>
          <div className="h-px flex-1 bg-warmgray-200" />
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={handleGoogleSignIn}
          className="h-12 w-full rounded-full border-warmgray-300 text-base font-medium text-warmgray-700 hover:bg-warmgray-100"
        >
          Continue with Google
        </Button>

        <p className="mt-6 text-center text-sm text-warmgray-500">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-sage-600 hover:text-sage-700"
          >
            Sign up
          </Link>
        </p>
      </motion.div>
      <Toaster position="top-center" richColors />
    </div>
  );
}
