import { Suspense } from "react";
import JobsPageView from "@/components/Landing/JobsPageView";

export const metadata = {
  title: "Find Jobs | QuickHire",
  description: "Search and filter thousands of job listings. Find your perfect career opportunity on QuickHire.",
};

export default function JobsPage() {
  return (
    <Suspense fallback={<div className="p-8">Loading jobs...</div>}>
      <JobsPageView />
    </Suspense>
  );
}
