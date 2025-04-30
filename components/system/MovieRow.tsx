/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import { getMovies } from "@/lib/MovieFetcher";
import { ChevronRight } from "lucide-react";
import { Card } from "../ui/card";
import { Star } from "lucide-react";
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
    <div className="mb-2">
      <div className="flex items-center mb-2 pl-2">
        <h2 className="capitalize text-xl font-semibold">{title}</h2>
        <ChevronRight size={18} />
      </div>
      <div className="relative">
        <div className="flex overflow-x-scroll pb-4 px-2 hide-scrollbar">
          {loading ? (
            <>
              <Skeleton className="h-[300px] rounded-t-md hover:rounded-lg w-full" />
              <Skeleton className="h-[300px] rounded-t-md hover:rounded-lg w-full" />
              <Skeleton className="h-[300px] rounded-t-md hover:rounded-lg w-full" />
              <Skeleton className="h-[300px] rounded-t-md hover:rounded-lg w-full" />
              <Skeleton className="h-[300px] rounded-t-md hover:rounded-lg w-full" />
              <Skeleton className="h-[300px] rounded-t-md hover:rounded-lg w-full" />
            </>
          ) : (
            <>
              {movies.map((movie) => (
                <div
                  key={movie.id}
                  className="flex-none mr-4 w-[140px] lg:w-[200px]"
                >
                  <Link href={`/movie/${movie.id}`}>
                    <Card className="rounded-md shadow-lg transition-all duration-300 hover:shadow-xl cursor-pointer">
                      <img
                        src={`${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`}
                        alt={movie.title}
                        className="h-[180px] lg:h-[300px] rounded-t-md hover:rounded-lg w-full object-fill transition-transform duration-300 hover:scale-105"
                      />
                      <div className="flex px-2 py-2.5 items-center gap-1 ">
                        <span className="text-black text-xs lg:text-sm font-[600] w-[80%] text-ellipsis truncate">
                          {movie.title}
                        </span>
                        <div className="flex-[1] flex items-center">
                          <Star
                            fill="#FFC107"
                            className="text-amber-500"
                            size={12}
                          />

                          <p className="text-amber-500 text-sm font-[600]">
                            {movie?.vote_average === 0 ? (
                              <>
                                <p className="text-xs text-right font-medium">
                                  NA
                                </p>
                              </>
                            ) : (
                              <p className="text-xs font-[500]">
                                {movie?.vote_average.toString().slice(0, 3)}
                              </p>
                            )}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </div>
              ))}
            </>
          )}
        </div>
        <div className="absolute right-0 top-0 bottom-8 h-[90%] w-24  pointer-events-none" />
      </div>
    </div>
  );
}
