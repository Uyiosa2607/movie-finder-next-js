"use client"; // Mark this as a client component

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="inline-flex items-center text-blue-500 hover:text-blue-600 mb-6"
    >
      <ArrowLeft className="mr-2" size={20} />
      Back to Movies
    </button>
  );
}
