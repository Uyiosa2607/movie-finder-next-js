import { toggleModal } from "@/lib/userStore";
import { useAtom } from "jotai";
import Header from "./Header";
import MovieRow from "./MovieRow";
import Hero from "./HeroSection";
import Details from "./MovieDetails";

export default function HomePage() {
  const [toggle] = useAtom(toggleModal);

  return (
    <main
      className={`"text-slate-100 bg-zinc-900 h-screen w-screen ${
        toggle ? "overflow-hidden" : ""
      }`}
    >
      {toggle ? <Details /> : null}

      <Header />

      <Hero />

      <MovieRow rowTitle="Comming soon" category="upcoming" />

      <MovieRow rowTitle="top rated" category="top_rated" />

      <MovieRow rowTitle="popular" category="popular" />
    </main>
  );
}
