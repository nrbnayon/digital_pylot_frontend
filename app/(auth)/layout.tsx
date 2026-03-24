import React from "react";
import Image from "next/image";
import { RightSideImage } from "@/components/Auth/LeftSideImage";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative min-h-screen w-full flex flex-col lg:flex-row bg-[#FCFCFD] overflow-x-hidden">
      {/* Shared Logo for Auth Pages */}
      <div className="lg:absolute top-8 left-8 p-6 lg:p-0 z-50 flex items-center gap-2">
        <Image
          src="/icons/logo.svg"
          alt="Obliq Logo"
          width={40}
          height={40}
          className="w-10 h-auto"
        />
      </div>

      {/* Left Column - Form Container */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 lg:p-12 relative z-10">
        <div className="auth-card w-full max-w-xl p-8 sm:p-12 md:p-16">
          {children}
        </div>
      </div>

      {/* Right Column - Visual Illustration */}
      <RightSideImage />
    </main>
  );
}

