"use client";

import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

function ForbiddenContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const atom = searchParams.get('atom');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-900 p-4">
      <div className="max-w-md text-center bg-white p-8 rounded-xl shadow-lg border border-red-100">
        <h1 className="text-6xl font-bold text-red-500 mb-4">403</h1>
        <h2 className="text-2xl font-semibold mb-2">Access Forbidden</h2>
        <p className="text-gray-600 mb-6">
          You do not have permission to view this page.
          {atom && (
             <span className="block mt-2 text-sm text-gray-400 bg-gray-50 p-2 rounded-md border border-gray-100 italic">
               Missing required atom: <strong className="text-gray-600 font-mono">{atom}</strong>
             </span>
          )}
        </p>

        <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:space-x-3 justify-center mt-8">
          <button 
            onClick={() => router.back()}
            className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            Go Back
          </button>
          <Link 
            href="/"
            className="px-5 py-2.5 rounded-lg border border-transparent bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ForbiddenPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ForbiddenContent />
    </Suspense>
  );
}
