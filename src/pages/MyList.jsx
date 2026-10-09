
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Bookmark, ArrowRight, Clapperboard } from "lucide-react";
import { motion } from "framer-motion";
import MovieCard from "../components/MovieCard.jsx";
import { movies } from "../data/movies.js";
import { useWatchlist } from "../context/WatchlistContext.jsx";

export default function MyList() {
  const { watchlist } = useWatchlist();
  const savedMovies = useMemo(() => {
    return watchlist
      .map((savedItem) => {
        const originalMovie = movies.find(
          (movie) => String(movie.id) === String(savedItem.id)
        );

        return originalMovie
          ? { ...savedItem, ...originalMovie }
          : savedItem;
      })
      .filter(Boolean);
  }, [watchlist]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#09090b] px-3 pb-10 pt-0 text-white sm:px-8 lg:px-12">
      <div className="pointer-events-none absolute -right-32 top-20 h-80 w-80 rounded-full bg-[#c6f36b]/5 blur-[120px]" />

      <div className="relative mx-auto max-w-full">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 border-b border-white/10 pb-7 sm:mb-12 sm:pb-9"
        >
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-[#c6f36b]">
            <Bookmark size={15} />
            YOUR PERSONAL COLLECTION
          </span>

          <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                My List<span className="text-[#c6f36b]">.</span>
              </h1>

              <p className="mt-3 text-sm text-gray-400 sm:text-base">
                {savedMovies.length} saved{" "}
                {savedMovies.length === 1 ? "title" : "titles"}
              </p>
            </div>

            {savedMovies.length > 0 && (
              <Link
                to="/"
                className="group inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2.5 text-sm font-medium text-gray-300 transition-all duration-300 hover:border-[#c6f36b]/40 hover:bg-[#c6f36b]/10 hover:text-[#c6f36b]"
              >
                Discover more
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            )}
          </div>
        </motion.div>

        {savedMovies.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
          >
            {savedMovies.map((movie, index) => (
              <motion.div
                key={movie.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.04 }}
              >
                <MovieCard movie={movie} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative flex min-h-[400px] flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#141620]/70 px-6 py-14 text-center sm:min-h-[460px]"
          >
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c6f36b]/5 blur-[90px]" />

            <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-[#c6f36b]/20 bg-[#c6f36b]/10 text-[#c6f36b] transition-transform duration-300 hover:scale-110 hover:rotate-3">
              <Bookmark size={36} strokeWidth={1.5} />
            </div>

            <span className="relative mt-7 inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-[#c6f36b]">
              <Clapperboard size={15} />
              YOUR NEXT MARATHON
            </span>

            <h2 className="relative mt-4 font-display text-2xl font-bold sm:text-3xl">
              Your watchlist is waiting
            </h2>

            <p className="relative mt-3 max-w-md text-sm leading-7 text-gray-400 sm:text-base">
              Save movies and series to keep your next watch close at hand.
              Your personal collection starts with one great story.
            </p>

            <Link
              to="/"
              className="group relative mt-8 inline-flex items-center gap-2 rounded-lg bg-[#c6f36b] px-6 py-3.5 text-sm font-bold text-[#09090b] transition-all duration-300 hover:-translate-y-1 hover:bg-[#d6ff8b] hover:shadow-lg hover:shadow-[#c6f36b]/20 active:translate-y-0"
            >
              Explore titles
              <ArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </motion.div>
        )}
      </div>
    </main>
  );
}
