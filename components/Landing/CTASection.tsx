"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="bg-white px-5 sm:px-8 lg:px-[124px]">
      <div className="max-w-[1240px] mx-auto">
        {/* Outer wrapper: relative so dashboard image can overflow upward */}
        <div className="relative">
          {/* Blue curved background shape */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative overflow-hidden min-h-[320px] sm:min-h-[360px] lg:min-h-[400px] flex items-center"
          >
            {/* Background image (Curv-Rectangle-bg.png) fills the container */}
            <Image
              src="/images/Curv-Rectangle-bg.png"
              alt=""
              fill
              sizes="100vw"
              className="object-cover object-left"
              priority
            />

            {/* Content sits on top of the bg image, left side */}
            <div className="relative z-10 flex flex-col gap-6 p-10 sm:p-14 lg:p-16 max-w-[520px]">
              <h2 className="font-clash font-semibold text-[36px] sm:text-[42px] lg:text-[52px] leading-[1.1] text-white">
                Start posting <br />jobs today
              </h2>
              <p className="text-[16px] sm:text-[18px] text-white font-semibold leading-relaxed">
                Start posting jobs for only $10.
              </p>
              <Link
                href="/signup"
                className="bg-white text-[#4640DE] font-semibold text-[16px] px-8 py-4 w-fit border-2 border-white hover:bg-transparent hover:text-white transition-all duration-200"
              >
                Sign Up For Free
              </Link>
            </div>
          </motion.div>

          {/* Dashboard image — absolutely positioned with exact Figma specs: w=564 h=346 top=140 left=682 */}
          <motion.div
            initial={{ opacity: 0, x: 40, y: 20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            style={{
              position: "absolute",
              bottom: "0px",
              right: "70px",
              width: "564px",
              height: "346px",
            }}
            className="hidden lg:block z-20 pointer-events-none"
          >
            <Image
              src="/images/Dashboard-Company.png"
              alt="Dashboard Preview"
              width={564}
              height={346}
              className="w-full h-full object-contain shadow-none"
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}