"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import JobCard from "./JobCard";
import { useGetJobsQuery } from "@/redux/services/jobApi";

/** Skeleton that exactly mirrors the "grid" variant of JobCard */
function JobCardGridSkeleton() {
  return (
    <div className="border border-[#D6DDEB] p-7 flex flex-col gap-4 bg-white animate-pulse">
      <div className="flex items-start justify-between">
        <div className="w-14 h-14 rounded bg-[#E8ECF2]" />
        <div className="h-7 w-20 bg-[#E8ECF2] rounded-full" />
      </div>
      <div className="flex flex-col gap-2">
        <div className="h-5 bg-[#E8ECF2] rounded w-3/4" />
        <div className="h-4 bg-[#E8ECF2] rounded w-1/2" />
      </div>
      <div className="flex gap-2">
        <div className="h-7 w-16 bg-[#E8ECF2] rounded-full" />
        <div className="h-7 w-16 bg-[#E8ECF2] rounded-full" />
        <div className="h-7 w-16 bg-[#E8ECF2] rounded-full" />
      </div>
    </div>
  );
}

export default function FeaturedJobsSection() {
  const { data: jobsResp, isLoading } = useGetJobsQuery({ featured: true, limit: 8 });
  const featuredJobs = jobsResp?.data || [];

  return (
    <section className="bg-white py-16 sm:py-20 px-5 sm:px-8 lg:px-[124px]">
      <div className="max-w-[1240px] mx-auto flex flex-col gap-12">
        {/* Header */}
        <div className="flex items-end justify-between gap-4">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-clash font-semibold text-[32px] sm:text-[40px] lg:text-[48px] leading-[1.1] text-[#25324B]"
          >
            Featured <span className="text-[#26A4FF]">Jobs</span>
          </motion.h2>
          <Link
            href="/jobs"
            className="flex items-center gap-2 text-[#4640DE] font-semibold text-[15px] hover:gap-3 transition-all duration-200 whitespace-nowrap"
          >
            Show all jobs <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => <JobCardGridSkeleton key={i} />)
            : featuredJobs.map((job, i) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                >
                  <JobCard job={job} variant="grid" />
                </motion.div>
              ))}
        </div>
      </div>
    </section>
  );
}
