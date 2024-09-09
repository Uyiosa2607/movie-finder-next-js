/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import { getMovieDetails, getMovies } from "@/lib/MovieFetcher";
import { useAtom } from "jotai";
import { toggleModal, movieDetailsAtom } from "@/lib/userStore";
import { ChevronRight } from "lucide-react";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  backdrop_path: string;
}

type movieRowProps = {
  category: string;
  title: string;
};

export default function MovieRow(props: movieRowProps) {
  const { category, title } = props;

  const [movies, setMovies] = useState<Movie[]>([]);
  const [movieDetails, setMovieDetails] = useAtom(movieDetailsAtom);
  const [loading, setLoading] = useState<boolean>(false);
  const [detailLoading, setDetailsLoading] = useState(false);

  const [toggle, setToggle] = useAtom(toggleModal);

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
  }, []);

  async function handleModal(id: number) {
    setDetailsLoading(true);
    try {
      const movieData = await getMovieDetails(id);
      if (movieData) {
        setMovieDetails(movieData);
        setToggle(!toggle);
        setDetailsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setDetailsLoading(false);
    }
  }

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
              <div
                onClick={async () => await handleModal(movie.id)}
                className="aspect-[2/3] overflow-hidden rounded-md"
              >
                <img
                  src={`${IMAGE_BASE_URL}${POSTER_SIZE}${movie.backdrop_path}`}
                  alt={movie.title}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
            </div>
          ))}
        </div>
        <div className="absolute right-0 top-0 bottom-8 w-24 pointer-events-none" />
      </div>
    </div>
  );
}
