/* eslint-disable @next/next/no-img-element */
import { PlayIcon, InfoIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "../ui/button";

export default function Hero() {
  return (
    <section className="relative h-screen">
      <img
        src="https://image.tmdb.org/t/p/w500/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg"
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
          <Button className="flex items-center space-x-2">
            <PlayIcon className="h-5 w-5" />
            <span>Play</span>
          </Button>
          <Button variant="outline" className="flex items-center space-x-2">
            <InfoIcon className="h-5 w-5" />
            <span>More Info</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
