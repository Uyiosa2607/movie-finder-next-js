/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import { getMovieDetails, getMovies } from "@/lib/MovieFetcher";
import { useAtom } from "jotai";
import { toggleModal, movieDetailsAtom } from "@/lib/userStore";
import { ChevronRight, X } from "lucide-react";
import Modal from "./Modal";

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
  }, [category]);

  async function handleModal(id: number) {
    setDetailsLoading(true);
    try {
      const movieData = await getMovieDetails(id);
      if (movieData) {
        setMovieDetails(movieData);
        setToggle(true);
        setDetailsLoading(false);
      }
    } catch (error) {
      console.error(error);
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
                onClick={() => handleModal(movie.id)}
                className="aspect-[2/3] overflow-hidden rounded-md cursor-pointer"
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
        <div className="absolute right-0 top-0 bottom-8 w-24 bg-gradient-to-l from-black to-transparent pointer-events-none" />
      </div>
      {toggle && movieDetails && (
        <Modal movie={movieDetails} onClose={() => setToggle(false)} />
      )}
      {(loading || detailLoading) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
        </div>
      )}
    </div>
  );
}
