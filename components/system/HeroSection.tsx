/* eslint-disable @next/next/no-img-element */
import { PlayIcon, InfoIcon } from "lucide-react";
import { Button } from "../ui/button";

export default function Hero() {
  return (
    <section className="relative h-[400px] lg:h-[600px]">
      <img
        src="https://image.tmdb.org/t/p/w1920/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg"
        alt="Featured Movie"
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent" />
      <div className="absolute bottom-0 left-0 p-5 md:p-16">
        <h1 className="mb-4 text-4xl text-white font-bold md:text-6xl">
          Featured Movie Title
        </h1>
        <p className="mb-6 max-w-md text-white text-lg">
          A brief description of the featured movie that captures the
          viewer&apos;s attention and entices them to watch.
        </p>
        <div className="flex space-x-4">
          <div className="flex rounded-lg gap-1 bg-red-600 px-3 py-1.5 flex-row items-center">
            <PlayIcon fill="white" color="white" className="h-5 w-5" />
            <span className="text-white font-[600]">Play</span>
          </div>
          <Button variant="outline" className="flex items-center space-x-2">
            <InfoIcon className="h-5 w-5" />
            <span className="font-[600]">More Info</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
