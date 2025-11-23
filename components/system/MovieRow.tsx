/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import { getMovies } from "@/lib/MovieFetcher";
import { ChevronRight, Star, Play, Info } from "lucide-react";
import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import Link from "next/link";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  genres: { id: number; name: string }[];
}

type MovieRowProps = {
  category: string;
  title: string;
};

export default function MovieRow({ category, title }: MovieRowProps) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hoveredMovie, setHoveredMovie] = useState<number | null>(null);

  useEffect(() => {
    async function setMovie() {
      setLoading(true);
      const data = await getMovies(category);
      if (data) {
        console.log(data);
        setMovies(data);
      }
      setLoading(false);
    }

    setMovie();
  }, [category]);

  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";
  const POSTER_SIZE = "w780";

  return (
    <div className="mb-8 md:mb-12">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4 px-4 md:px-6 group cursor-pointer">
        <div className="flex items-center gap-2">
          <h2 className="capitalize text-white font-bold text-xl md:text-2xl tracking-tight">
            {title}
          </h2>
          <ChevronRight
            size={24}
            className="text-purple-400 group-hover:translate-x-1 transition-transform duration-300"
          />
        </div>
        <button className="text-purple-400 hover:text-purple-300 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          View All
        </button>
      </div>

      {/* Movies Scroll Container */}
      <div className="relative group/row">
        <div className="flex overflow-x-auto pb-6 px-4 md:px-6 gap-4 md:gap-5 hide-scrollbar scroll-smooth snap-x snap-mandatory">
          {loading ? (
            <>
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="flex-none w-[160px] md:w-[220px] snap-start"
                >
                  <Skeleton className="h-[240px] md:h-[330px] rounded-xl bg-slate-800/50" />
                  <Skeleton className="h-4 mt-3 rounded bg-slate-800/50" />
                  <Skeleton className="h-3 mt-2 w-20 rounded bg-slate-800/50" />
                </div>
              ))}
            </>
          ) : (
            <>
              {movies.map((movie) => (
                <div
                  key={movie.id}
                  className="flex-none w-[160px] md:w-[220px] snap-start group/card"
                  onMouseEnter={() => setHoveredMovie(movie.id)}
                  onMouseLeave={() => setHoveredMovie(null)}
                >
                  <Link href={`/movie/${movie.id}`}>
                    <Card className="relative rounded-xl overflow-hidden bg-slate-900 border-slate-800 shadow-xl hover:shadow-2xl hover:shadow-purple-900/30 transition-all duration-500 group-hover/card:scale-105 group-hover/card:border-purple-500/50">
                      {/* Movie Poster */}
                      <div className="relative overflow-hidden">
                        <img
                          src={`${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`}
                          alt={movie.title}
                          className="h-[240px] md:h-[330px] w-full object-cover transition-all duration-500 group-hover/card:scale-110 group-hover/card:brightness-75"
                        />

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-60 group-hover/card:opacity-80 transition-opacity duration-300" />

                        {/* Hover Actions */}
                        <div
                          className={`absolute inset-0 flex items-center justify-center gap-2 transition-all duration-300 ${
                            hoveredMovie === movie.id
                              ? "opacity-100"
                              : "opacity-0"
                          }`}
                        >
                          <button className="p-2.5 rounded-full bg-white hover:bg-purple-600 hover:scale-110 transition-all duration-300 group/play">
                            <Play
                              fill="black"
                              className="w-4 h-4 text-black group-hover/play:fill-white group-hover/play:text-white transition-colors"
                            />
                          </button>
                          <button className="p-2.5 rounded-full bg-slate-800/90 hover:bg-slate-700 hover:scale-110 transition-all duration-300 backdrop-blur-sm">
                            <Info className="w-4 h-4 text-white" />
                          </button>
                        </div>

                        {/* Rating Badge */}
                        <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-900/90 backdrop-blur-md border border-slate-700/50">
                          <Star
                            fill="#FFC107"
                            className="text-amber-500 w-3 h-3"
                          />
                          <span className="text-white text-xs font-bold">
                            {movie?.vote_average === 0
                              ? "N/A"
                              : movie?.vote_average.toFixed(1)}
                          </span>
                        </div>

                        {/* Quality Badge (optional) */}
                        <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-purple-600 backdrop-blur-sm">
                          <span className="text-white text-[10px] font-bold uppercase tracking-wider">
                            HD
                          </span>
                        </div>
                      </div>

                      {/* Movie Info */}
                      <div className="p-3 bg-slate-900">
                        <h3 className="text-white text-sm md:text-base font-semibold line-clamp-1 mb-1 group-hover/card:text-purple-400 transition-colors">
                          {movie.title}
                        </h3>
                        <p className="text-slate-400 text-xs">
                          {movie.release_date
                            ? new Date(movie.release_date).getFullYear()
                            : "N/A"}
                        </p>
                      </div>

                      {/* Bottom Accent Line */}
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 to-pink-600 transform scale-x-0 group-hover/card:scale-x-100 transition-transform duration-500 origin-left" />
                    </Card>
                  </Link>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Gradient Fade Edges */}
        <div className="absolute left-0 top-0 bottom-6 w-16 md:w-24 bg-gradient-to-r from-slate-950 to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-6 w-16 md:w-24 bg-gradient-to-l from-slate-950 to-transparent pointer-events-none" />

        {/* Optional: Scroll Arrows (visible on larger screens) */}
        <button className="hidden lg:flex absolute left-2 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700 opacity-0 group-hover/row:opacity-100 hover:bg-slate-800 hover:scale-110 transition-all duration-300 z-10">
          <ChevronRight className="w-6 h-6 text-white rotate-180" />
        </button>
        <button className="hidden lg:flex absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700 opacity-0 group-hover/row:opacity-100 hover:bg-slate-800 hover:scale-110 transition-all duration-300 z-10">
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
}
