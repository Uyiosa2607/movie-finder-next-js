/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import { MdOutlineClose } from "react-icons/md";
import { useAtom } from "jotai";
import { toggleModal, movieDetailsAtom } from "@/lib/userStore";

export default function Details() {
  const [movie] = useAtom(movieDetailsAtom);
  const [loading, setLoading] = useState(false);
  const [toggle, setToggle] = useAtom(toggleModal);

  function handleModal() {
    setToggle(!toggle);
  }

  console.log(movie);

  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";
  const POSTER_SIZE = "w500";

  return (
    <main className="h-full z-[900] absolute w-full top-0 flex items-center justify-center left-0 backdrop-blur-sm bg-white/30 w-wcreen text-black">
      <div className="w-[60%] text-white mx-auto bg-zinc-900 h-[70vh] rounded-md p-3">
        <MdOutlineClose onClick={handleModal} className="4xl" />
        <img
          className="h-200 w-[100%]"
          src={`${IMAGE_BASE_URL}${POSTER_SIZE}${movie.backdrop_path}`}
          alt={movie.title}
        />
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
