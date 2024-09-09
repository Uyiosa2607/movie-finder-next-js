import { toggleModal } from "@/lib/userStore";
import { useAtom } from "jotai";
import Header from "./Header";
import MovieRow from "./MovieRow";
import Hero from "./HeroSection";
import Details from "./MovieDetails";

export default function HomePage() {
  const [toggle] = useAtom(toggleModal);

  return (
    <main className="w-screen min-h-screen">
      <Header />
      <Hero />
      <section className="px-2 mt-5">
        <MovieRow title="Comming soon" category="upcoming" />

        <MovieRow title="top rated" category="top_rated" />

        <MovieRow title="popular" category="popular" />
      </section>
    </main>
  );
}
