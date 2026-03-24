"use client";

import { useState, useEffect, Suspense } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { toast } from "sonner";

const otpSchema = z.object({
  otp: z.string().min(4, {
    message: "Your one-time password must be 4 digits.",
  }),
});

type FormValues = z.infer<typeof otpSchema>;

const VerifyOtpContent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(41);
  const router = useRouter();
  const searchParams = useSearchParams();
  const flow = searchParams.get("flow") || "signup";
  const email = searchParams.get("email") || "";

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleResend = async () => {
    if (!email) {
      toast.error("Email not found. Please try again from the start.");
      return;
    }

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success(`A new code has been sent to ${email}`);
      setCountdown(60); 
    } catch (error) {
      console.error("Resend failed:", error);
      toast.error("Failed to resend OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success("Verification successful!");
      
      if (flow === "reset") {
        document.cookie = "reset_verified=true; path=/; max-age=300; SameSite=Strict";
        router.push("/reset-password");
      } else {
        router.push("/signin"); 
      } 
    } catch (error) {
      console.error("Verification failed:", error);
      toast.error("Invalid OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full space-y-8"
    >
      <div className="text-center space-y-1">
        <h1 className="text-4xl font-semibold tracking-tight text-[#1F232A]">
          Verify OTP
        </h1>
        <p className="text-secondary font-onest text-lg">
          Enter the 4-digit code sent to {email || "your email"}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 pt-4 flex flex-col items-center">
        <div className="w-full flex justify-center">
          <Controller
            control={control}
            name="otp"
            render={({ field }) => (
              <InputOTP maxLength={4} {...field}>
                <InputOTPGroup className="gap-2 sm:gap-4">
                  {[...Array(4)].map((_, index) => (
                    <InputOTPSlot 
                      key={index} 
                      index={index} 
                      className="w-14 h-16 sm:w-16 sm:h-20 border-2 rounded-2xl border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 text-2xl font-bold"
                    />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            )}
          />
        </div>
        {errors.otp && (
          <p className="text-sm text-destructive font-medium">{errors.otp.message}</p>
        )}

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-14 bg-primary hover:bg-primary/90 text-white text-lg font-semibold rounded-2xl shadow-lg shadow-primary/20"
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            "Verify"
          )}
        </Button>

        <div className="text-center pt-2">
          <span className="text-secondary font-onest text-lg">Didn&apos;t get the email? </span>
          <button
            type="button"
            onClick={handleResend}
            disabled={countdown > 0 || isLoading}
            className="text-primary font-bold font-onest text-lg hover:underline disabled:opacity-70 disabled:no-underline ml-1"
          >
            {countdown > 0 ? `Resent in ${formatTime(countdown)}` : "Resend"}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

const VerifyOtp = () => (
  <Suspense fallback={<div className="flex justify-center p-12"><Loader2 className="animate-spin h-8 w-8 text-primary" /></div>}>
    <VerifyOtpContent />
  </Suspense>
);

export default VerifyOtp;
