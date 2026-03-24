"use client";

import Link from "next/link";
import Image from "next/image";
import { Job } from "@/data/jobsData";
import { MapPin, ArrowRight } from "lucide-react";

type BadgeVariant = "Full-Time" | "Part-Time" | "Contract" | "Remote" | "Internship";

const badgeStyles: Record<BadgeVariant, string> = {
  "Full-Time": "text-[#56CDAD] border-[#56CDAD] bg-[#56CDAD]/10",
  "Part-Time": "text-[#FFB836] border-[#FFB836] bg-[#FFB836]/10",
  "Contract": "text-[#FF6550] border-[#FF6550] bg-[#FF6550]/10",
  "Remote": "text-primary border-primary bg-primary/10",
  "Internship": "text-[#26A4FF] border-[#26A4FF] bg-[#26A4FF]/10",
};

interface JobCardProps {
  job: Job;
  variant?: "grid" | "list";
  shadow?: boolean;
}


export function JobLogo({ job }: { job: Job }) {
  const logoSrc =
    job.logoUrl ||
    (job as Job & { logoURL?: string; logo_url?: string }).logoURL ||
    (job as Job & { logoURL?: string; logo_url?: string }).logo_url;

  if (logoSrc) {
    return (
      <div className="w-14 h-14 shrink-0 rounded overflow-hidden relative bg-white">
        <Image src={logoSrc} alt={`${job.company} logo`} fill className="object-cover" />
      </div>
    );
  }

  return (
    <div
      className="w-14 h-14 flex items-center justify-center shrink-0 rounded font-semibold text-[18px]"
      style={{ backgroundColor: job.logoBg, color: job.logoColor }}
    >
      {job.logo}
    </div>
  );
}


export default function JobCard({ job, variant = "grid", shadow = false }: JobCardProps) {
  if (variant === "list") {
    return (
      <Link
        href={`/jobs/${job.id}`}
        className={`flex items-start gap-6 p-6 transition-all duration-300 cursor-pointer group bg-white border border-white hover:border-primary active:scale-[0.98] ${
          shadow ? "shadow-[0_2px_18px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_32px_rgba(70,64,222,0.08)]" : ""
        }`}
      >
        {/* Logo Left */}
        <JobLogo job={job} />

        {/* Content Right */}
        <div className="flex-1 min-w-0 flex flex-col gap-2">
          {/* Title */}
          <h3 className="font-semibold text-[18px] sm:text-[20px] text-[#25324B] group-hover:text-primary transition-colors truncate leading-tight">
            {job.title}
          </h3>

          {/* Metadata Row */}
          <div className="flex items-center gap-2 text-[15px] sm:text-[16px] text-[#7C8493] font-medium mb-1">
            <span className="truncate">{job.company}</span>
            <span className="w-1 h-1 rounded-full bg-[#D6DDEB] shrink-0" />
            <span className="truncate">{job.location}</span>
          </div>

          {/* Badges Row */}
          <div className="flex flex-wrap gap-2 pt-1">
            {/* Employment Type Badge */}
            <span className={`px-4 py-1.5 border text-[12px] font-semibold rounded-full ${badgeStyles[job.type]}`}>
              {job.type}
            </span>
            <div className="w-[1px] h-4 bg-[#D6DDEB] self-center mx-1" />
            {/* Tags Badges (from job.tags) */}
            {job.tags.slice(0, 2).map((tag, idx) => (
              <span
                key={tag}
                className={`px-4 py-1.5 border text-[12px] font-semibold rounded-full ${
                  idx === 0
                    ? "text-[#FFB836] border-[#FFB836] bg-[#FFB836]/10" // Marketing style
                    : "text-primary border-primary bg-primary/10" // Design style
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/jobs/${job.id}`}
      className="border border-[#D6DDEB] p-7 flex flex-col gap-4 cursor-pointer hover:border-primary hover:shadow-[0_8px_32px_rgba(70,64,222,0.1)] hover:-translate-y-1 transition-all duration-200 bg-white group block"
    >
      <div className="flex items-start justify-between">
        <JobLogo job={job} />
        <span className={`text-[13px] font-semibold px-3 py-1.5 rounded-xs border ${badgeStyles[job.type]}`}>
          {job.type}
        </span>
      </div>
      <div>
        <p className="font-clash font-semibold text-[18px] text-[#25324B] mb-1 group-hover:text-primary transition-colors">
          {job.title}
        </p>
        <p className="text-[15px] text-[#515B6F] flex items-center gap-2">
          {job.company}
          <span className="w-1 h-1 rounded-full bg-[#D6DDEB] inline-block" />
          <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{job.location}</span>
        </p>
      </div>
      {job.salary && (
        <p className="text-[14px] font-semibold text-primary">{job.salary}</p>
      )}
      <div className="flex flex-wrap gap-2">
        {job.tags.map((tag) => (
          <span key={tag} className="px-3 py-1.5 border-2 border-[#D6DDEB] text-[#515B6F] text-[13px] font-semibold rounded-full">
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
