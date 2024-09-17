/* eslint-disable @next/next/no-img-element */
import { getMovieDetails } from "@/lib/MovieFetcher";
import BackButton from "@/components/system/BackButton";

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
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <BackButton />
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <div className="relative h-64 md:h-96">
            <img
              src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {movie.title}
            </h1>
            <p className="text-sm md:text-base text-gray-400 mb-4">
              {new Date(movie.release_date).getFullYear()} |{" "}
              {movie.genres
                .map((genre: { name: string }) => genre.name)
                .join(", ")}{" "}
              | {movie.vote_average.toFixed(1)}/10
            </p>
            <p className="text-gray-300 text-base md:text-lg">
              {movie.overview}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
