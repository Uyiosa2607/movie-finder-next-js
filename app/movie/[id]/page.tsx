/* eslint-disable @next/next/no-img-element */

import { getMovieDetails } from "@/lib/MovieFetcher";
import BackButton from "@/components/system/back_button";
import { Button } from "@/components/ui/button";
import { PlayIcon, PlusIcon } from "lucide-react";

export default async function MovieDetails({
  params,
}: {
  params: { id: number };
}) {
  const movie = await getMovieDetails(params.id);

  if (!movie) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">
        <p>Movie not found.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="pl-4 lg:pl-10 py-4 bg-white">
        <BackButton />
      </div>
      <div className="relative w-full h-64 md:h-96">
        <img
          src={`https://image.tmdb.org/t/p/w1920${movie.backdrop_path}`}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="md:w-[70%] px-2 mx-auto">
        <div className="flex mt-4 lg:mt-8 flex-col lg:flex-row justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {movie.title}
            </h1>
          </div>
          <div className="my-2 lg:my-0">
            <div className="flex gap-4">
              <div className="flex rounded-lg gap-1 bg-red-600 px-3 py-1.5 flex-row items-center">
                <PlayIcon fill="white" color="white" className="h-5 w-5" />
                <span className="text-white text-sm font-[600]">Watch Now</span>
              </div>
              <Button variant="outline" className="flex items-center space-x-2">
                <PlusIcon className="h-5 w-5" />
                <span className="font-[600] text-sm">Add to Watchlist</span>
              </Button>
            </div>
          </div>
        </div>
        <p className="text-sm md:text-base mt-2 font-[600] text-neutral-900">
          {new Date(movie.release_date).getFullYear()} |{" "}
          {movie.genres.map((genre: { name: string }) => genre.name).join(", ")}{" "}
          | {movie.vote_average.toFixed(1)}/10
        </p>
        <p className="text-neutral-900 mt-2 font-medium text-base md:text-lg">
          {movie.overview}
        </p>
      </div>
    </div>
  );
}
