import getMovies from "@/lib/movieFetcher";
import { useState, useEffect } from "react";
import MovieCard from "../system/MovieCard";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  // Add other relevant fields as needed
}

export default function Rated() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function setMovie() {
      setLoading(true);
      const data = await getMovies("top_rated");
      console.log(data);
      if (data) {
        setMovies(data);
      }
      setLoading(false);
    }

    setMovie();
  }, []);

  console.log(movies);

  return (
    <main className="my-[2rem]">
      <div className="container mx-auto">
        <h1 className="text-center text-xl font-medium capitalize">
          Movie List
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {movies.map((movie) => (
            <div key={movie.id}>
              <MovieCard url={movie.poster_path} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
