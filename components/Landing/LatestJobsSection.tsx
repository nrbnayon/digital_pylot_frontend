"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import JobCard from "./JobCard";
import { useGetJobsQuery } from "@/redux/services/jobApi";

/** Skeleton that exactly mirrors the "list" variant of JobCard */
function JobCardListSkeleton() {
  return (
    <div className="flex items-start gap-6 p-6 bg-white border border-[#D6DDEB] animate-pulse">
      <div className="w-14 h-14 rounded bg-[#E8ECF2] shrink-0" />
      <div className="flex-1 flex flex-col gap-2 min-w-0">
        <div className="h-5 bg-[#E8ECF2] rounded w-2/3" />
        <div className="h-4 bg-[#E8ECF2] rounded w-1/2" />
        <div className="flex gap-2 pt-1">
          <div className="h-7 w-20 bg-[#E8ECF2] rounded-full" />
          <div className="h-7 w-20 bg-[#E8ECF2] rounded-full" />
        </div>
      </div>
    </div>
  );
}

export default function LatestJobsSection() {
  const { data: jobsResp, isLoading } = useGetJobsQuery({ limit: 8 });
  const latestJobs = jobsResp?.data || [];

  return (
    <section className="relative py-20 bg-[#F8F8FD] px-5 sm:px-8 lg:px-[124px] overflow-hidden">
      {/* ── Top Left Decorative Overlay ── */}
      <div className="absolute top-0 left-0 z-0 pointer-events-none rotate-180">
        <Image
          src="/images/rightbottom.png"
          alt=""
          width={100}
          height={100}
          className="w-auto h-auto opacity-100"
        />
      </div>

      <div className="absolute top-0 right-[-5%] h-full w-[60%] z-0 pointer-events-none opacity-80">
        <Image
          src="/images/largest-bg-pattern.svg"
          alt=""
          fill
          className="object-contain object-right-top"
          priority
        />
      </div>

      <div className="relative z-10 max-w-[1240px] mx-auto flex flex-col gap-12">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-clash font-semibold text-[32px] sm:text-[40px] lg:text-[48px] leading-[1.1] text-[#25324B]"
          >
            Latest <span className="text-[#26A4FF]">jobs open</span>
          </motion.h2>

          <Link
            href="/jobs"
            className="flex items-center gap-2 text-[#4640DE] font-semibold text-[16px] hover:gap-4 transition-all duration-200 whitespace-nowrap group"
          >
            Show all jobs
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => <JobCardListSkeleton key={i} />)
            : latestJobs.map((job, i) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <JobCard job={job} variant="list" shadow />
                </motion.div>
              ))}
        </div>
      </div>
    </section>
  );
}
