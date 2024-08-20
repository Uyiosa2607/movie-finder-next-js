import { useState, useEffect } from "react";
import { getMovieDetails, getMovies } from "@/lib/MovieFetcher";
import MovieCard from "./MovieCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useAtom } from "jotai";
import { toggleModal, movieDetailsAtom } from "@/lib/userStore";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  backdrop_path: string;
}

export default function MovieRow(props: any) {
  const { category, rowTitle } = props;

  const [movies, setMovies] = useState<Movie[]>([]);
  const [movieDetails, setMovieDetails] = useAtom(movieDetailsAtom);
  const [loading, setLoading] = useState(false);

  const [toggle, setToggle] = useAtom(toggleModal);

  useEffect(() => {
    async function setMovie() {
      setLoading(true);
      const data = await getMovies(category);
      console.log(data);
      if (data) {
        setMovies(data);
      }
      setLoading(false);
    }

    setMovie();
  }, []);

  async function handleModal(id: number) {
    try {
      const movieData = await getMovieDetails(id);
      if (movieData) {
        setMovieDetails(movieData);
        setToggle(!toggle);
      }
    } catch (error) {
      console.log(error);
    }
  }

  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <main className="my-[2rem] mb-3 bg-inherit">
      <div className="container mx-auto px-2">
        <h1 className="text-xl font-medium capitalize mb-8">{rowTitle}</h1>
        <div>
          <Slider {...settings}>
            {movies.map((movie) => (
              <div onClick={() => handleModal(movie.id)} key={movie.id}>
                <MovieCard url={movie.poster_path} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </main>
  );
}
