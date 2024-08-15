import getMovies from "@/lib/movieFetcher";
import { useState, useEffect } from "react";

export default function New() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function setMovie() {
      setLoading(true);
      const data = await getMovies("top_rated");
      if (data) {
        setMovies(data);
        console.log(movies);
      }
    }

    setMovie();
    setLoading(false);
  }, [movies]);

  return (
    <main>
      <div className="container mx-auto">
        <h1>Movies category</h1>
      </div>
    </main>
  );
}
