/* eslint-disable @next/next/no-img-element */
import { getMovieDetails } from "@/lib/MovieFetcher";
import { useState, useEffect } from "react";
import { MdOutlineClose } from "react-icons/md";
import { useAtom } from "jotai";
import { toggleModal } from "@/lib/userStore";

export default function Details() {
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toggle, setToggle] = useAtom(toggleModal);

  useEffect(() => {
    async function getMovie() {
      setLoading(true);
      try {
        const movieDetails = await getMovieDetails("movie_id");
        if (movieDetails) {
          setMovie(movieDetails);
          console.log(movie);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getMovie();
  }, []);

  function handleModal() {
    setToggle(!toggle);
  }

  return (
    <main className="h-full z-[900] absolute w-full top-0 flex items-center justify-center left-0 backdrop-blur-sm bg-white/30 w-wcreen text-black">
      <div className="w-[60%] mx-auto bg-white h-[70vh] rounded-md p-3">
        <MdOutlineClose onClick={handleModal} className="4xl" />
        <div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, maxime
            ad. Culpa vel sequi asperiores, inventore nisi harum cupiditate
            quasi dicta iste ratione, eius hic ex odit incidunt porro ipsam.
          </p>
        </div>
      </div>
    </main>
  );
}
