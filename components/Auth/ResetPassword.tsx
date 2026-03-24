"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(1, "Password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof resetPasswordSchema>;

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    const isVerified = document.cookie.split("; ").find(row => row.startsWith("reset_verified="));
    if (!isVerified && process.env.NODE_ENV === "production") {
      toast.error("Unauthorized access. Please verify OTP first.");
      router.push("/forgot-password");
    }
  }, [router]);

  const handleTrimChange = (field: keyof FormValues) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const trimmed = e.target.value.trim();
    setValue(field, trimmed, { shouldValidate: true });
  };

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success("Password reset successfully! Please signin.");
      document.cookie = "reset_verified=; path=/; max-age=0; SameSite=Strict";
      router.push("/signin"); 
    } catch (error) {
      console.error("Reset failed:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
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
          Please reset your password
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pt-4">
        <div className="space-y-4">
          {/* New Password */}
          <div className="space-y-2">
            <Label htmlFor="newPassword" className="text-base font-medium text-[#1F232A]">
              New Password
            </Label>
            <div className="relative">
              <Input
                id="newPassword"
                placeholder="Enter new password"
                type={showPassword ? "text" : "password"}
                className={cn(
                  "h-14 rounded-2xl border-gray-200 focus:border-primary px-5 pr-14 text-base",
                  errors.newPassword && "border-destructive focus:border-destructive"
                )}
                {...register("newPassword")}
                onChange={handleTrimChange("newPassword")}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-5 inset-y-0 text-gray-400 hover:text-primary transition-colors flex items-center justify-center p-1"
              >
                {showPassword ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
              </button>
            </div>
            {errors.newPassword?.message && (
              <p className="text-sm text-destructive font-medium px-1">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-base font-medium text-[#1F232A]">
              Confirm Password
            </Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                placeholder="Confirm your password"
                type={showConfirmPassword ? "text" : "password"}
                className={cn(
                  "h-14 rounded-2xl border-gray-200 focus:border-primary px-5 pr-14 text-base",
                  errors.confirmPassword && "border-destructive focus:border-destructive"
                )}
                {...register("confirmPassword")}
                onChange={handleTrimChange("confirmPassword")}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-5 inset-y-0 text-gray-400 hover:text-primary transition-colors flex items-center justify-center p-1"
              >
                {showConfirmPassword ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
              </button>
            </div>
            {errors.confirmPassword?.message && (
              <p className="text-sm text-destructive font-medium px-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
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
      </form>
    </motion.div>
  );
};

export default ResetPassword;
