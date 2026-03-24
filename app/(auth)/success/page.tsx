"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function SuccessPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full space-y-8 text-center"
    >
      <div className="space-y-4">
        <h1 className="text-4xl font-semibold tracking-tight text-primary">
          Congratulations!
        </h1>
        <p className="text-secondary font-onest text-lg max-w-sm mx-auto">
          Your account has been created successfully. Log in to explore more.
        </p>
      </div>

      <div className="pt-4">
        <Button
          asChild
          className="w-full h-14 bg-primary hover:bg-primary/90 text-white text-lg font-semibold rounded-2xl shadow-lg shadow-primary/20"
        >
          <Link href="/signin">Log In</Link>
        </Button>
      </div>
    </motion.div>
  );
}
