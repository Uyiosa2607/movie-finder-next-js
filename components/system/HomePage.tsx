import Header from "./Header";
import MovieRow from "./MovieRow";
import Hero from "./HeroSection";
import Footer from "./footer";

export default function HomePage() {
  return (
    <main className="w-screen min-h-screen">
      <Header />
      <Hero />
      <section className="lg:w-[80%] mx-auto px-2 mt-5">
        <MovieRow title="Comming soon" category="upcoming" />

        <MovieRow title="top rated" category="top_rated" />

        <MovieRow title="popular" category="popular" />
      </section>
      <Footer />
    </main>
  );
}
