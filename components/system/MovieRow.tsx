/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import { getMovieDetails, getMovies } from "@/lib/MovieFetcher";
import { ChevronRight } from "lucide-react";
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

  useEffect(() => {
    async function setMovie() {
      setLoading(true);
      const data = await getMovies(category);
      if (data) {
        setMovies(data);
      }
      setLoading(false);
    }

    setMovie();
  }, [category]);

  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";
  const POSTER_SIZE = "w500";

  return (
    <div className="mb-2">
      <div className="flex items-center mb-3 pl-1">
        <h2 className="capitalize text-base font-semibold">{title}</h2>
        <ChevronRight className="text-xs" />
      </div>
      <div className="relative">
        <div className="flex overflow-x-scroll pb-4 px-2 hide-scrollbar">
          {movies.map((movie) => (
            <div key={movie.id} className="flex-none mr-4 w-28 sm:w-56">
              <Link href={`/movie/${movie.id}`}>
                <div className="aspect-[2/3] overflow-hidden rounded-md cursor-pointer">
                  <img
                    src={`${IMAGE_BASE_URL}${POSTER_SIZE}${movie.backdrop_path}`}
                    alt={movie.title}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div className="absolute right-0 top-0 bottom-8 h-[90%] w-24 bg-gradient-to-l from-black to-transparent pointer-events-none" />
      </div>
    </div>
  );
}
