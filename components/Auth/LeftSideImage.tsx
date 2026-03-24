"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface ImageProps {
  image?: string;
}

export const LeftSideImage = ({ image = "/icons/logo.svg" }: ImageProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="hidden lg:block lg:flex-1 relative h-screen overflow-hidden border-r-2 border-gray-100"
    >
      <Image
        src={image}
        alt="Side Illustration"
        fill
        className="object-cover"
        priority
        sizes="(min-width: 1024px) 50vw, 0"
      />
    </motion.div>
  );
};

export const RightSideImage = ({ image = "/images/auth-right.png" }: ImageProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="hidden lg:block relative flex-[1.1] h-full p-4"
    >
      <div className="relative w-full h-full rounded-[40px] overflow-hidden">
        <Image
          src={image}
          alt="Auth Visual"
          fill
          className="object-cover"
          priority
          sizes="50vw"
        />
      </div>
    </motion.div>
  );
};
