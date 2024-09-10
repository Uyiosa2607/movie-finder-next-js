/* eslint-disable @next/next/no-img-element */
import { X } from "lucide-react";
export default function Modal(props: any) {
  const { movie, onClose } = props;
  return (
    <div className="fixed text-white inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[600]">
      <div className="bg-gray-900 rounded-lg max-w-2xl w-full mx-4">
        <div className="relative">
          <img
            src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
            alt={movie.title}
            className="w-full h-64 object-cover rounded-t-lg"
          />
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-white hover:text-gray-300"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
          <p className="text-sm text-gray-400 mb-4">
            {new Date(movie.release_date).getFullYear()} |
            {movie.genres.map((genre: any) => genre.name).join(", ")} |
            {movie.vote_average.toFixed(1)}/10
          </p>
          <p className="text-gray-300">{movie.overview}</p>
        </div>
      </div>
    </div>
  );
}
