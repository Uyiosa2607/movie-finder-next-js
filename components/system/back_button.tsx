"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <div
      onClick={() => router.back()}
      className="flex gap-2 items-center flex-row"
    >
      <ArrowLeft size={15} />
      <h3 className="font-[700] text-neutral-900 text-base">Movie Details</h3>
    </div>
  );
}
