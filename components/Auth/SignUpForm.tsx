"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff, Loader2, User, Mail, Lock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FloatingInput } from "@/components/ui/floating-input";
import { Label } from "@/components/ui/label";

import { toast } from "sonner";
import { signupValidationSchema } from "@/lib/formDataValidation";
import { LeftSideImage } from "./LeftSideImage";

type FormValues = z.infer<typeof signupValidationSchema>;

export const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(signupValidationSchema),
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
    },
  });

  const handleTrimChange = (field: keyof FormValues) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const trimmed = typeof value === "string" ? value.trim() : value;
    setValue(field, trimmed as any, { shouldValidate: true });
  };

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      toast.success("Account created successfully! Please log in.");
      router.push("/signin");
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col lg:flex-row overflow-y-auto">
      <LeftSideImage image="/icons/signup.png" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="flex-1 flex items-center justify-center p-6 sm:p-8 lg:p-12 bg-white"
      >
        <div className="w-full max-w-md lg:max-w-lg space-y-8 my-8">
          <div className="text-center space-y-3">
            <div className="flex justify-center mb-6">
              <Image
                src="/icons/logo.svg"
                alt="Logo"
                width={140}
                height={140}
                className="w-28 sm:w-36 h-auto"
                priority
              />
            </div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-foreground">Create Account</h1>
            <p className="text-lg sm:text-xl text-secondary">
              Join us today! Please fill in your details.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <FloatingInput
              label="Full Name"
              type="text"
              error={errors.full_name?.message}
              className="h-14 rounded-full border-2 focus:border-primary focus:ring-0 px-6 text-base"
              {...register("full_name")}
              onChange={handleTrimChange("full_name")}
            />

            <FloatingInput
              label="Email"
              type="email"
              autoComplete="email"
              error={errors.email?.message}
              className="h-14 rounded-full border-2 focus:border-primary focus:ring-0 px-6 text-base"
              {...register("email")}
              onChange={handleTrimChange("email")}
            />

            <FloatingInput
              label="Password"
              type={showPassword ? "text" : "password"}
              error={errors.password?.message}
              className="h-14 rounded-full border-2 focus:border-primary focus:ring-0 px-6 pr-14 text-base"
              {...register("password")}
              onChange={handleTrimChange("password")}
              suffix={
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="mr-5 text-gray-400 hover:text-primary transition-colors z-10 p-1"
                >
                  {showPassword ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
                </button>
              }
            />

            <FloatingInput
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              error={errors.confirmPassword?.message}
              className="h-14 rounded-full border-2 focus:border-primary focus:ring-0 px-6 pr-14 text-base"
              {...register("confirmPassword")}
              onChange={handleTrimChange("confirmPassword")}
              suffix={
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="mr-5 text-gray-400 hover:text-primary transition-colors z-10 p-1"
                >
                  {showConfirmPassword ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
                </button>
              }
            />

            <Controller
              name="agreeToTerms"
              control={control}
              render={({ field }) => (
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="agreeToTerms"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="h-5 w-5 border-2 data-[state=checked]:bg-primary rounded"
                    />
                    <Label htmlFor="agreeToTerms" className="text-sm sm:text-base text-secondary cursor-pointer font-normal">
                      I agree to the <Link href="/terms" className="text-primary hover:underline">Terms & Conditions</Link> and <Link href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link>
                    </Label>
                  </div>
                  {errors.agreeToTerms && <p className="text-red-500 text-xs px-1">{errors.agreeToTerms.message}</p>}
                </div>
              )}
            />

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 bg-primary hover:bg-primary/90 text-white text-lg font-semibold rounded-full shadow-md transition-all duration-200"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Sign Up"
              )}
            </Button>

            <div className="text-center text-sm sm:text-base">
              <span className="text-secondary">Already have an account? </span>
              <Link
                href="/signin"
                className="text-primary font-semibold hover:text-primary/80 hover:underline transition-colors"
              >
                Log In
              </Link>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};
