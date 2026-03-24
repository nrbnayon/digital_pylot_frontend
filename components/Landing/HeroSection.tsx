"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, Search } from "lucide-react";

function FadeUp({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default function HeroSection() {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const params = new URLSearchParams();
    if (keyword.trim()) params.set("search", keyword.trim());
    if (location.trim()) params.set("location", location.trim());
    const qs = params.toString();
    router.push(`/jobs${qs ? `?${qs}` : ""}`);
  };

  return (
    <section className="relative bg-[#F8F8FD] overflow-hidden w-full min-h-[700px] lg:h-[794px] mx-auto 2xl:max-w-[1440px]">

      {/* ── 1. Background geometric SVG pattern ── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute right-0 top-0 h-full w-[55%] hidden lg:block">
          <Image
            src="/images/Hero-bg-pattern.svg"
            alt=""
            fill
            sizes="55vw"
            className="object-cover object-left-top opacity-90"
            priority
          />
        </div>
      </div>

      {/* ── 2. Hero person image ── */}
      <motion.div
        initial={{ opacity: 0, x: 48 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.85, delay: 0.3, ease: "easeOut" }}
        className="absolute right-0 bottom-0 w-[46%] max-w-[530px] h-full pointer-events-none z-10 hidden lg:block"
      >
        <Image
          src="/images/hero.png"
          alt="Job seeker"
          fill
          sizes="(max-width: 1280px) 46vw, 530px"
          className="object-contain object-right-bottom"
          priority
        />
      </motion.div>

      {/* ── 3. Bottom-right corner decoration ── */}
      <div className="absolute bottom-0 right-0 pointer-events-none z-20 hidden lg:block">
        <Image
          src="/images/rightbottom.png"
          alt=""
          width={500}
          height={350}
          className="w-auto h-auto block"
          priority
        />
      </div>

      {/* ── 4. Left content ── */}
      <div className="relative z-30 h-full flex items-center">
        <div className="w-full max-w-[1240px] mx-auto px-5 sm:px-8 xl:px-0 py-10 lg:py-0">
          <div className="flex flex-col gap-6 w-full lg:max-w-[50%]">

            {/* Headline */}
            <FadeUp delay={0.1}>
              <h1 className="font-clash font-semibold text-[42px] sm:text-[56px] lg:text-[72px] leading-[1.1] text-[#25324B] tracking-tight break-words">
                Discover
                <br />
                more than
                <br />
                <span className="text-[#26A4FF] relative inline-block pb-5">
                  5000+ Jobs
                  <span className="absolute left-0 top-[85%] w-full pointer-events-none">
                    <Image
                      src="/images/hero-wave.svg"
                      alt=""
                      width={420}
                      height={18}
                      className="w-full h-auto"
                    />
                  </span>
                </span>
              </h1>
            </FadeUp>

            {/* Sub-headline */}
            <FadeUp delay={0.22}>
              <p className="text-[17px] sm:text-[20px] text-[#515B6F] leading-relaxed max-w-[460px]">
                Great platform for the job seeker that searching for new career
                heights and passionate about startups.
              </p>
            </FadeUp>

            {/* Search bar */}
            <FadeUp delay={0.34}>
              <div className="flex flex-col gap-4">
                <form
                  onSubmit={handleSearch}
                  className="bg-white shadow-[0_20px_60px_rgba(192,192,192,0.22)] flex flex-col sm:flex-row items-stretch w-full max-w-[820px]"
                >
                  {/* Job-title field */}
                  <label className="flex items-center gap-3 px-5 flex-1 min-w-0 cursor-text">
                    <Search className="w-5 h-5 text-[#7C8493] shrink-0" />
                    <div className="flex-1 flex flex-col justify-center py-5 min-w-0">
                      <input
                        type="text"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        placeholder="Job title or keyword"
                        className="bg-transparent border-none outline-none text-[15px] text-[#25324B] placeholder:text-[#7C8493]/70 w-full"
                      />
                      <div className="h-px bg-[#D6DDEB] mt-2 hidden sm:block" />
                    </div>
                  </label>

                  {/* Vertical divider */}
                  <div className="hidden sm:block w-px bg-[#D6DDEB] my-4 shrink-0" />

                  {/* Location field */}
                  <label className="flex items-center gap-3 px-5 sm:min-w-[210px] shrink-0 cursor-text">
                    <MapPin className="w-5 h-5 text-[#515B6F] shrink-0" />
                    <div className="flex-1 flex flex-col justify-center py-5 min-w-0">
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="City or country"
                        className="bg-transparent border-none outline-none text-[15px] text-[#25324B] placeholder:text-[#7C8493]/70 w-full"
                      />
                      <div className="h-px bg-[#D6DDEB] mt-2 hidden sm:block" />
                    </div>
                  </label>

                  {/* Search CTA */}
                  <button
                    type="submit"
                    className="bg-[#4640DE] text-white font-semibold text-[16px] px-8 py-5 hover:bg-[#3530C4] active:bg-[#2d28b0] transition-colors duration-200 whitespace-nowrap shrink-0 w-full sm:w-auto text-center"
                  >
                    Search my job
                  </button>
                </form>

                {/* Popular tags */}
                <p className="text-[15px] text-[#202430]/70 break-words">
                  Popular:{" "}
                  {["UI Designer", "UX Researcher", "Android", "Admin"].map((tag, i) => (
                    <button
                      key={tag}
                      onClick={() =>
                        router.push(`/jobs?search=${encodeURIComponent(tag)}`)
                      }
                      className="font-semibold text-[#202430]/70 hover:text-[#4640DE] transition-colors"
                    >
                      {tag}
                      {i < 3 ? ", " : ""}
                    </button>
                  ))}
                </p>
              </div>
            </FadeUp>

          </div>
        </div>
      </div>

    </section>
  );
}