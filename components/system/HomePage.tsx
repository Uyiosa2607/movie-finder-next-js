import Header from "./Header";
import MovieRow from "./MovieRow";
import Hero from "./HeroSection";
import Footer from "./footer";

export default function HomePage() {
  return (
    <main className="w-full min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <div className="pt-16 md:pt-20">
        <Hero />
      </div>

      {/* Movie Sections */}
      <section className="relative max-w-[1800px] mx-auto px-0 mt-8 md:mt-12 pb-16">
        {/* Decorative Background Elements */}
        <div className="absolute top-40 left-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-[600px] right-10 w-96 h-96 bg-pink-600/10 rounded-full blur-[120px] pointer-events-none" />

        {/* Coming Soon Section */}
        <div className="relative">
          <MovieRow title="Coming Soon" category="upcoming" />
        </div>

        {/* Divider */}
        <div className="my-8 md:my-12 mx-4 md:mx-6 h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />

        {/* Top Rated Section */}
        <div className="relative">
          <MovieRow title="Top Rated" category="top_rated" />
        </div>

        {/* Divider */}
        <div className="my-8 md:my-12 mx-4 md:mx-6 h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />

        {/* Popular Section */}
        <div className="relative">
          <MovieRow title="Popular" category="popular" />
        </div>

        {/* Additional Section - Now Playing (Optional) */}
        <div className="my-8 md:my-12 mx-4 md:mx-6 h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />

        {/* Trending Section with Special Badge */}
        <div className="relative">
          <div className="flex items-center gap-3 mb-4 px-4 md:px-6">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30">
              <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
              <span className="text-purple-300 text-xs font-bold uppercase tracking-wider">
                Trending Now
              </span>
            </div>
          </div>
          <MovieRow title="Trending This Week" category="popular" />
        </div>

        {/* Optional: Category Navigation Pills */}
        <div className="mt-16 px-4 md:px-6">
          <div className="flex items-center gap-3 overflow-x-auto hide-scrollbar pb-4">
            <button className="px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold whitespace-nowrap hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300">
              All Categories
            </button>
            <button className="px-5 py-2.5 rounded-full bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 hover:text-white text-sm font-semibold border border-slate-700/50 hover:border-purple-500/50 whitespace-nowrap transition-all duration-300">
              Action
            </button>
            <button className="px-5 py-2.5 rounded-full bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 hover:text-white text-sm font-semibold border border-slate-700/50 hover:border-purple-500/50 whitespace-nowrap transition-all duration-300">
              Comedy
            </button>
            <button className="px-5 py-2.5 rounded-full bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 hover:text-white text-sm font-semibold border border-slate-700/50 hover:border-purple-500/50 whitespace-nowrap transition-all duration-300">
              Drama
            </button>
            <button className="px-5 py-2.5 rounded-full bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 hover:text-white text-sm font-semibold border border-slate-700/50 hover:border-purple-500/50 whitespace-nowrap transition-all duration-300">
              Horror
            </button>
            <button className="px-5 py-2.5 rounded-full bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 hover:text-white text-sm font-semibold border border-slate-700/50 hover:border-purple-500/50 whitespace-nowrap transition-all duration-300">
              Sci-Fi
            </button>
            <button className="px-5 py-2.5 rounded-full bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 hover:text-white text-sm font-semibold border border-slate-700/50 hover:border-purple-500/50 whitespace-nowrap transition-all duration-300">
              Thriller
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Optional: Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-8 right-8 p-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-2xl shadow-purple-900/50 hover:shadow-purple-900/70 hover:scale-110 transition-all duration-300 z-50 group"
        aria-label="Scroll to top"
      >
        <svg
          className="w-5 h-5 group-hover:-translate-y-1 transition-transform duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>
    </main>
  );
}
