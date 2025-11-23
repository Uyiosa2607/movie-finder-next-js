/* eslint-disable @next/next/no-img-element */

import { getMovieDetails } from "@/lib/MovieFetcher";
import BackButton from "@/components/system/back_button";
import { Button } from "@/components/ui/button";
import {
  PlayIcon,
  PlusIcon,
  Star,
  Clock,
  Calendar,
  Heart,
  Share2,
} from "lucide-react";

export default async function MovieDetails({
  params,
}: {
  params: { id: number };
}) {
  const movie = await getMovieDetails(params.id);

  if (!movie) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-white flex justify-center items-center">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-slate-800/50 flex items-center justify-center">
            <span className="text-4xl">🎬</span>
          </div>
          <p className="text-xl text-slate-400">Movie not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Back Button - Floating */}
      <div className="fixed top-20 left-4 md:left-8 z-50">
        <div className="p-3 rounded-xl bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 hover:bg-slate-800/80 transition-all duration-300 shadow-2xl">
          <BackButton />
        </div>
      </div>

      {/* Hero Backdrop Section */}
      <div className="relative w-full h-[500px] md:h-[700px] overflow-hidden">
        {/* Backdrop Image */}
        <div className="absolute inset-0">
          <img
            src={`https://image.tmdb.org/t/p/w1920${movie.backdrop_path}`}
            alt={movie.title}
            className="w-full h-full object-cover scale-105"
          />
        </div>

        {/* Multi-layer Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950" />

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-12 pb-12 md:pb-16">
          <div className="max-w-7xl mx-auto">
            {/* Movie Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-4 drop-shadow-2xl">
              <span className="bg-gradient-to-r from-white via-purple-100 to-pink-100 bg-clip-text text-transparent">
                {movie.title}
              </span>
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm md:text-base">
              {/* Rating */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/80 backdrop-blur-md border border-slate-700/50">
                <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                <span className="text-white font-bold">
                  {movie.vote_average.toFixed(1)}
                </span>
                <span className="text-slate-400">/10</span>
              </div>

              {/* Year */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/80 backdrop-blur-md border border-slate-700/50">
                <Calendar className="w-4 h-4 text-purple-400" />
                <span className="text-white font-semibold">
                  {new Date(movie.release_date).getFullYear()}
                </span>
              </div>

              {/* Runtime (if available) */}
              {movie.runtime && (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/80 backdrop-blur-md border border-slate-700/50">
                  <Clock className="w-4 h-4 text-purple-400" />
                  <span className="text-white font-semibold">
                    {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                  </span>
                </div>
              )}

              {/* Age Rating (if available) */}
              {movie.adult !== undefined && (
                <div className="px-3 py-1.5 rounded-lg bg-slate-900/80 backdrop-blur-md border border-slate-700/50">
                  <span className="text-white font-semibold">
                    {movie.adult ? "18+" : "PG-13"}
                  </span>
                </div>
              )}
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2 mb-6">
              {movie.genres.map((genre: { id: number; name: string }) => (
                <span
                  key={genre.id}
                  className="px-4 py-1.5 rounded-full bg-purple-600/20 backdrop-blur-sm border border-purple-500/30 text-purple-300 text-sm font-semibold"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              {/* Watch Now Button */}
              <button className="group relative px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition-all duration-300 shadow-lg shadow-purple-900/50 hover:shadow-xl hover:shadow-purple-900/70 hover:scale-105 transform">
                <div className="absolute inset-0 rounded-xl bg-white opacity-0 group-hover:opacity-20 transition-opacity blur-xl"></div>
                <div className="relative flex items-center gap-2.5">
                  <PlayIcon
                    fill="white"
                    className="h-5 w-5 text-white group-hover:scale-110 transition-transform"
                  />
                  <span className="text-white font-bold text-base">
                    Watch Now
                  </span>
                </div>
              </button>

              {/* Add to Watchlist */}
              <button className="group relative px-8 py-3.5 rounded-xl bg-slate-800/70 hover:bg-slate-700/70 backdrop-blur-md border border-slate-600/50 hover:border-purple-500/50 transition-all duration-300 shadow-lg hover:scale-105 transform">
                <div className="flex items-center gap-2.5">
                  <PlusIcon className="h-5 w-5 text-slate-300 group-hover:text-white transition-colors" />
                  <span className="text-slate-200 group-hover:text-white font-semibold text-base transition-colors">
                    Watchlist
                  </span>
                </div>
              </button>

              {/* Like Button */}
              <button className="p-3.5 rounded-xl bg-slate-800/70 hover:bg-slate-700/70 backdrop-blur-md border border-slate-600/50 hover:border-pink-500/50 transition-all duration-300 hover:scale-105 transform group">
                <Heart className="h-5 w-5 text-slate-300 group-hover:text-pink-500 group-hover:fill-pink-500 transition-all" />
              </button>

              {/* Share Button */}
              <button className="p-3.5 rounded-xl bg-slate-800/70 hover:bg-slate-700/70 backdrop-blur-md border border-slate-600/50 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 transform group">
                <Share2 className="h-5 w-5 text-slate-300 group-hover:text-purple-400 transition-colors" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Movie Details Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
        {/* Overview Section */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 flex items-center gap-3">
            Overview
            <div className="flex-1 h-px bg-gradient-to-r from-purple-600 to-transparent"></div>
          </h2>
          <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-4xl">
            {movie.overview}
          </p>
        </div>

        {/* Additional Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Info Card: Budget */}
          {movie.budget && movie.budget > 0 && (
            <div className="p-6 rounded-xl bg-slate-900/50 backdrop-blur-sm border border-slate-800 hover:border-purple-500/50 transition-all duration-300">
              <h3 className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-2">
                Budget
              </h3>
              <p className="text-white text-2xl font-bold">
                ${(movie.budget / 1000000).toFixed(0)}M
              </p>
            </div>
          )}

          {/* Info Card: Revenue */}
          {movie.revenue && movie.revenue > 0 && (
            <div className="p-6 rounded-xl bg-slate-900/50 backdrop-blur-sm border border-slate-800 hover:border-purple-500/50 transition-all duration-300">
              <h3 className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-2">
                Revenue
              </h3>
              <p className="text-white text-2xl font-bold">
                ${(movie.revenue / 1000000).toFixed(0)}M
              </p>
            </div>
          )}

          {/* Info Card: Status */}
          {movie.status && (
            <div className="p-6 rounded-xl bg-slate-900/50 backdrop-blur-sm border border-slate-800 hover:border-purple-500/50 transition-all duration-300">
              <h3 className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-2">
                Status
              </h3>
              <p className="text-white text-2xl font-bold">{movie.status}</p>
            </div>
          )}

          {/* Info Card: Language */}
          {movie.original_language && (
            <div className="p-6 rounded-xl bg-slate-900/50 backdrop-blur-sm border border-slate-800 hover:border-purple-500/50 transition-all duration-300">
              <h3 className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-2">
                Original Language
              </h3>
              <p className="text-white text-2xl font-bold uppercase">
                {movie.original_language}
              </p>
            </div>
          )}

          {/* Info Card: Popularity */}
          {movie.popularity && (
            <div className="p-6 rounded-xl bg-slate-900/50 backdrop-blur-sm border border-slate-800 hover:border-purple-500/50 transition-all duration-300">
              <h3 className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-2">
                Popularity
              </h3>
              <p className="text-white text-2xl font-bold">
                {movie.popularity.toFixed(0)}
              </p>
            </div>
          )}

          {/* Info Card: Vote Count */}
          {movie.vote_count && (
            <div className="p-6 rounded-xl bg-slate-900/50 backdrop-blur-sm border border-slate-800 hover:border-purple-500/50 transition-all duration-300">
              <h3 className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-2">
                Total Votes
              </h3>
              <p className="text-white text-2xl font-bold">
                {movie.vote_count.toLocaleString()}
              </p>
            </div>
          )}
        </div>

        {/* Production Companies (if available) */}
        {movie.production_companies &&
          movie.production_companies.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                Production Companies
                <div className="flex-1 h-px bg-gradient-to-r from-purple-600 to-transparent"></div>
              </h2>
              <div className="flex flex-wrap gap-6">
                {movie.production_companies.map((company: any) => (
                  <div
                    key={company.id}
                    className="p-4 rounded-xl bg-slate-900/50 backdrop-blur-sm border border-slate-800 hover:border-purple-500/50 transition-all duration-300"
                  >
                    {company.logo_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                        alt={company.name}
                        className="h-12 object-contain"
                      />
                    ) : (
                      <p className="text-white font-semibold">{company.name}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
      </div>
    </div>
  );
}
