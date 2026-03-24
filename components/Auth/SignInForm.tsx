"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

import { useAppDispatch } from "@/redux/hooks";
import { setCredentials } from "@/redux/features/authSlice";
import { toast } from "sonner";
import { signinValidationSchema } from "@/lib/formDataValidation";

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

  const handleTrimChange = (field: "email" | "password") => (e: React.ChangeEvent<HTMLInputElement>) => {
    const trimmed = e.target.value.trim();
    setValue(field, trimmed, { shouldValidate: true });
  };

  const onSubmit = async (data: FormValues) => {
    const cleanData = {
      ...data,
      email: data.email.trim(),
      password: data.password.trim(),
    };

    setIsLoading(true);
    try {
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
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full space-y-8"
    >
      {/* Title & Subtitle */}
      <div className="text-center space-y-1">
        <h1 className="text-4xl font-semibold tracking-tight text-[#1F232A]">
          Login
        </h1>
        <p className="text-secondary font-onest text-lg">
          Enter your details to continue
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pt-4">
        <div className="space-y-4">
          {/* Email */}
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

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-base font-medium text-[#1F232A]">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                placeholder="Enter your password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                className={cn(
                  "h-14 rounded-2xl border-gray-200 focus:border-primary px-5 pr-14 text-base",
                  errors.password && "border-destructive focus:border-destructive"
                )}
                {...register("password")}
                onChange={handleTrimChange("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-5 inset-y-0 text-gray-400 hover:text-primary transition-colors z-10 p-1 flex items-center justify-center"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
              </button>
            </div>
            {errors.password?.message && (
              <p className="text-sm text-destructive font-medium px-1">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Controller
            name="rememberMe"
            control={control}
            render={({ field }) => (
              <div className="flex items-center gap-2">
                <Checkbox
                  id="rememberMe"
                  className="rounded-md border-gray-300 data-[state=checked]:bg-primary"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <Label
                  htmlFor="rememberMe"
                  className="text-base text-[#1F232A] cursor-pointer font-normal"
                >
                  Remember me
                </Label>
              </div>
            )}
          />
          <Link
            href="/forgot-password"
            className="text-base text-primary font-medium hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-14 bg-primary hover:bg-primary/90 text-white text-lg font-semibold rounded-2xl shadow-lg shadow-primary/20"
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            "Log in"
          )}
        </Button>

        <div className="text-center pt-2">
          <span className="text-secondary font-onest text-lg">Don't have an account? </span>
          <Link
            href="/signup"
            className="text-primary font-bold font-onest text-lg hover:underline ml-1"
          >
            Sign up
          </Link>
        </div>
      </form>
    </motion.div>
  );
};
