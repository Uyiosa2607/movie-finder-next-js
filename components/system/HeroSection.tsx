/* eslint-disable @next/next/no-img-element */
import { PlayIcon, InfoIcon, Volume2, VolumeX, Star } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";

export default function Hero() {
  const [isMuted, setIsMuted] = useState(true);

  return (
    <section className="relative h-[500px] lg:h-[700px] overflow-hidden group">
      {/* Background Image with Parallax Effect */}
      <div className="absolute inset-0 transform scale-105 transition-transform duration-700 group-hover:scale-110">
        <img
          src="https://image.tmdb.org/t/p/w1920/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg"
          alt="Featured Movie"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Multi-layer Gradients for Depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />

      {/* Subtle Vignette Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />

      {/* Content Container */}
      <div className="absolute inset-0 flex items-end">
        <div className="container mx-auto px-6 md:px-16 pb-12 md:pb-20">
          {/* Movie Badge/Category */}
          <div className="mb-4 flex items-center gap-3 animate-fade-in">
            <span className="px-3 py-1 rounded-full bg-purple-600/90 backdrop-blur-sm text-white text-xs font-semibold uppercase tracking-wider">
              Featured
            </span>
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
              <span className="text-white font-semibold">8.5</span>
              <span className="text-slate-400 text-sm">/ 10</span>
            </div>
          </div>

          {/* Title with Gradient */}
          <h1 className="mb-4 text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-none animate-fade-in-up">
            <span className="bg-gradient-to-r from-white via-purple-100 to-pink-100 bg-clip-text text-transparent drop-shadow-2xl">
              Featured Movie
            </span>
          </h1>

          {/* Movie Meta Info */}
          <div className="mb-4 flex items-center gap-4 text-sm text-slate-300 animate-fade-in-up animation-delay-100">
            <span className="font-semibold text-white">2024</span>
            <span className="w-1 h-1 rounded-full bg-slate-500"></span>
            <span>2h 28m</span>
            <span className="w-1 h-1 rounded-full bg-slate-500"></span>
            <span className="px-2 py-0.5 rounded border border-slate-500 text-xs">
              PG-13
            </span>
            <span className="w-1 h-1 rounded-full bg-slate-500"></span>
            <div className="flex gap-2">
              <span className="text-purple-400">Action</span>
              <span className="text-slate-500">•</span>
              <span className="text-purple-400">Adventure</span>
            </div>
          </div>

          {/* Description */}
          <p className="mb-8 max-w-2xl text-slate-200 text-base md:text-lg leading-relaxed animate-fade-in-up animation-delay-200">
            A brief description of the featured movie that captures the
            viewer&apos;s attention and entices them to watch. Experience an
            unforgettable journey filled with action, drama, and heart-pounding
            excitement.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 animate-fade-in-up animation-delay-300">
            {/* Play Button */}
            <button className="group/btn relative px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition-all duration-300 shadow-lg shadow-purple-900/50 hover:shadow-xl hover:shadow-purple-900/70 hover:scale-105 transform">
              <div className="absolute inset-0 rounded-xl bg-white opacity-0 group-hover/btn:opacity-20 transition-opacity blur-xl"></div>
              <div className="relative flex items-center gap-2.5">
                <PlayIcon
                  fill="white"
                  className="h-5 w-5 text-white group-hover/btn:scale-110 transition-transform"
                />
                <span className="text-white font-bold text-base">Play Now</span>
              </div>
            </button>

            {/* More Info Button */}
            <button className="group/btn relative px-8 py-3.5 rounded-xl bg-slate-800/70 hover:bg-slate-700/70 backdrop-blur-md border border-slate-600/50 hover:border-slate-500 transition-all duration-300 shadow-lg hover:scale-105 transform">
              <div className="flex items-center gap-2.5">
                <InfoIcon className="h-5 w-5 text-slate-300 group-hover/btn:text-white transition-colors" />
                <span className="text-slate-200 group-hover/btn:text-white font-semibold text-base transition-colors">
                  More Info
                </span>
              </div>
            </button>

            {/* Mute Button */}
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-3.5 rounded-xl bg-slate-800/70 hover:bg-slate-700/70 backdrop-blur-md border border-slate-600/50 hover:border-slate-500 transition-all duration-300 hover:scale-105 transform"
              aria-label="Toggle sound"
            >
              {isMuted ? (
                <VolumeX className="h-5 w-5 text-slate-300 hover:text-white transition-colors" />
              ) : (
                <Volume2 className="h-5 w-5 text-slate-300 hover:text-white transition-colors" />
              )}
            </button>
          </div>

          {/* Progress Bar (optional - shows how far into featured content) */}
          <div className="mt-8 max-w-2xl animate-fade-in-up animation-delay-400">
            <div className="h-1 bg-slate-800/50 rounded-full overflow-hidden backdrop-blur-sm">
              <div className="h-full w-1/3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-lg shadow-purple-500/50"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none"></div>
    </section>
  );
}

// Add these custom animations to your global CSS or Tailwind config:
/*
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out;
}

.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out;
}

.animation-delay-100 {
  animation-delay: 0.1s;
  opacity: 0;
  animation-fill-mode: forwards;
}

.animation-delay-200 {
  animation-delay: 0.2s;
  opacity: 0;
  animation-fill-mode: forwards;
}

.animation-delay-300 {
  animation-delay: 0.3s;
  opacity: 0;
  animation-fill-mode: forwards;
}

.animation-delay-400 {
  animation-delay: 0.4s;
  opacity: 0;
  animation-fill-mode: forwards;
}
*/
