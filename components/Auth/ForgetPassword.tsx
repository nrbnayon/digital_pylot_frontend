"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { emailValidationSchema } from "@/lib/formDataValidation";

type FormValues = z.infer<typeof emailValidationSchema>;

const ForgetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(41);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(emailValidationSchema),
    defaultValues: {
      email: "",
    },
  });

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleTrimChange = (field: "email") => (e: React.ChangeEvent<HTMLInputElement>) => {
    const trimmed = e.target.value.trim();
    setValue(field, trimmed, { shouldValidate: true });
  };

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success("OTP sent to your email.");
      router.push(`/verify-otp?flow=reset&email=${encodeURIComponent(data.email)}`); 
    } catch (error) {
      console.error("Failed to send OTP:", error);
      toast.error("Something went wrong. Please try again.");
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
          Reset password
        </h1>
        <p className="text-secondary font-onest text-lg">
          To reset password enter your email
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pt-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-base font-medium text-[#1F232A]">
            Email
          </Label>
          <Input
            id="email"
            placeholder="example@email.com"
            type="email"
            autoComplete="email"
            className={cn(
              "h-14 rounded-2xl border-gray-200 focus:border-primary px-5 text-base",
              errors.email && "border-destructive focus:border-destructive"
            )}
            {...register("email")}
            onChange={handleTrimChange("email")}
          />
          {errors.email?.message && (
            <p className="text-sm text-destructive font-medium px-1">
              {errors.email.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-14 bg-primary hover:bg-primary/90 text-white text-lg font-semibold rounded-2xl shadow-lg shadow-primary/20"
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            "Continue"
          )}
        </Button>

        <div className="text-center pt-2">
          <span className="text-secondary font-onest text-lg">Didn&apos;t get the email? </span>
          <button
            type="button"
            onClick={() => setCountdown(60)}
            disabled={countdown > 0}
            className="text-primary font-bold font-onest text-lg hover:underline disabled:opacity-70 disabled:no-underline ml-1"
          >
            {countdown > 0 ? `Resent in ${formatTime(countdown)}` : "Resend"}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default ForgetPassword;
