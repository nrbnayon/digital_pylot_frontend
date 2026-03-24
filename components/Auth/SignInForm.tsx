"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowRight, Eye, EyeOff, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FloatingInput } from "@/components/ui/floating-input";
import { Label } from "@/components/ui/label";

import { useAppDispatch } from "@/redux/hooks";
import { setCredentials } from "@/redux/features/authSlice";
import { toast } from "sonner";
import { signinValidationSchema } from "@/lib/formDataValidation";
import { LeftSideImage } from "./LeftSideImage";

type FormValues = z.infer<typeof signinValidationSchema>;

interface SignInFormProps {
  isAdmin?: boolean;
}

export const SignInForm = ({ isAdmin = false }: SignInFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(signinValidationSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: true,
    },
  });

  // Trim spaces in real-time for email & password
  const handleTrimChange = (field: "email" | "password") => (e: React.ChangeEvent<HTMLInputElement>) => {
    const trimmed = e.target.value.trim();
    setValue(field, trimmed, { shouldValidate: true });
  };

  const onSubmit = async (data: FormValues) => {
    // Final trim just in case (though already trimmed)
    const cleanData = {
      ...data,
      email: data.email.trim(),
      password: data.password.trim(),
    };

    setIsLoading(true);
    try {
      // Replace with real API call
      // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth /signin`, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(cleanData),
      // });

      await new Promise((resolve) => setTimeout(resolve, 1500)); // simulate delay

      const mockUser = {
        name: isAdmin ? "Admin User" : "Regular User",
        email: cleanData.email,
        role: isAdmin ? "admin" : "user",
        image: "/images/avatar.png",
      };
      const mockToken = `mock_access_token_${Date.now()}`;

      dispatch(
        setCredentials({
          user: mockUser,
          token: mockToken,
        })
      );

      // Cookies
      const maxAge = cleanData.rememberMe ? 86400 : undefined;
      document.cookie = `accessToken=${mockToken}; path=/; ${maxAge ? `max-age=${maxAge};` : ""} samesite=lax`;
      document.cookie = `userRole=${mockUser.role}; path=/; ${maxAge ? `max-age=${maxAge};` : ""} samesite=lax`;
      document.cookie = `userEmail=${encodeURIComponent(mockUser.email)}; path=/; ${maxAge ? `max-age=${maxAge};` : ""} samesite=lax`;

      toast.success(isAdmin ? "Admin logged in successfully!" : "Logged in successfully!");
      router.push(isAdmin ? "/admin" : "/");
    } catch (error) {
      console.error("Signin error:", error);
      toast.error("Signin failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative h-screen w-full flex flex-col lg:flex-row">
      
      {/* Left - Image (hidden on mobile) */}
      <LeftSideImage image="/icons/signin.png" />
      
      {/* Right - Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="flex-1 flex items-center justify-center p-6 sm:p-8 lg:p-12 bg-white lg:min-h-screen"
      >
        <div className="w-full max-w-md lg:max-w-lg space-y-8">
          {/* Logo + Title */}
          <div className="text-center space-y-3">
            <div className="flex justify-center mb-6 md:mb-8">
              <Image
                src="/icons/logo.svg"
                alt="  Logo"
                width={140}
                height={140}
                className="w-28 sm:w-36 h-auto"
                priority
              />
            </div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-foreground">
              {isAdmin ? "Admin Signin" : "Log In"}
            </h1>
            <p className="text-lg sm:text-xl text-secondary">
              {isAdmin 
                ? "Please signin with your admin credentials." 
                : "Please signin to continue to your account."}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <FloatingInput
              label="Email"
              type="email"
              autoComplete="email"
              error={errors.email?.message}
              labelClassName="text-secondary"
              className="h-14 rounded-full border-2 focus:border-primary focus:ring-0 px-6 text-base"
              {...register("email")}
              onChange={handleTrimChange("email")}
            />

            {/* Password with eye toggle */}
            <FloatingInput
              label="Password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              error={errors.password?.message}
              labelClassName="text-secondary"
              className="h-14 rounded-full border-2 focus:border-primary focus:ring-0 px-6 pr-14 text-base"
              {...register("password")}
              onChange={handleTrimChange("password")}
              suffix={
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="mr-5 text-gray-400 hover:text-primary transition-colors z-10 p-1"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
                </button>
              }
            />

            <div className="flex items-center justify-between">
              {/* Remember me */}
              <Controller
                name="rememberMe"
                control={control}
                render={({ field }) => (
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="rememberMe"
                      className="h-5 w-5 border-2 data-[state=checked]:bg-primary data-[state=checked]:border-primary rounded"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <Label
                      htmlFor="rememberMe"
                      className="text-sm sm:text-base text-secondary cursor-pointer font-normal select-none"
                    >
                      Remember me
                    </Label>
                  </div>
                )}
              />

              {/* Forgot password */}
              <div className="text-sm sm:text-base">
                <Link
                  href="/forgot-password"
                  className="text-primary font-semibold hover:text-primary/80 hover:underline transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 bg-primary hover:bg-primary/90 text-white text-lg font-semibold rounded-full shadow-md transition-all duration-200"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Log In"
              )}
            </Button>

            {/* Sign Up for non-admins */}
            {!isAdmin && (
              <div className="text-center text-sm sm:text-base">
                <span className="text-secondary">Don't have an account? </span>
                <Link
                  href="/signup"
                  className="text-primary font-semibold hover:text-primary/80 hover:underline transition-colors inline-flex items-center"
                >
                  Sign Up Now <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            )}

          </form>
        </div>
      </motion.div>
    </div>
  );
};