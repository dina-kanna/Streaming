

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Play, Plus, Check,Star,Sparkles,ChevronLeft,ChevronRight,Volume2,} from "lucide-react";

import moviesData from "../data/movies.js";
import { useWatchlist } from "../context/WatchlistContext.jsx";
const featuredTitles = [
  "Leo",
  "Interstellar",
  "Manjummel Boys",
  "Jawan",
  "Thuppakki",
  "Pushpa: The Rise",
  "RRR",
  "Maharaja",
  "Money Heist",
  "Dune",
  "Avatar",
  "Wednesday",
];

const featuredMovies = featuredTitles
  .map((title) => {
    const movie = moviesData.find((item) => item.title === title);

    return movie
      ? {
          ...movie,
          backdrop: movie.poster,
        }
      : null;
  })
  .filter(Boolean);

export default function Hero({ movie }) {
  const { toggleWatchlist, isInWatchlist } = useWatchlist();

  const [activeIndex, setActiveIndex] = useState(() => {
    const index = featuredMovies.findIndex(
      (item) => item.id === movie?.id
    );
    return index >= 0 ? index : 0;
  });

  const [paused, setPaused] = useState(false);

  const activeMovie = featuredMovies[activeIndex];

  useEffect(() => {
    if (paused || featuredMovies.length < 2) return;

    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % featuredMovies.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [paused]);

  if (!activeMovie) return null;

  const saved = isInWatchlist(activeMovie.id);

  const showPrevious = () => {
    setActiveIndex(
      (current) =>
        (current - 1 + featuredMovies.length) % featuredMovies.length
    );
  };

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % featuredMovies.length);
  };

  const changeSlide = (index) => setActiveIndex(index);

  return (
    <section
      className="relative isolate min-h-[700px] overflow-hidden bg-[#08090b] text-white sm:min-h-[740px] lg:min-h-[800px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="sync">
        <motion.div
          key={activeMovie.id}
          className="absolute inset-0 -z-15"
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <img
            src={activeMovie.backdrop || activeMovie.poster}
            alt={`${activeMovie.title} background`}
            className="h-full w-full object-cover object-center"
            fetchPriority="high"
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />
        </motion.div>
      </AnimatePresence>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-[#08090b] via-[#08090b]/85 to-[#08090b]/20" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-[#08090b] via-transparent to-black/40" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-black/20" />

      <div className="mx-auto flex min-h-[400px] max-w-full items-center px-3 py-3 sm:min-h-[740px] sm:px-8 lg:min-h-[800px] lg:px-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMovie.id}
            initial={{ opacity: 0, x: -45 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#c6f36b]/30 bg-black/40 px-2 py-2 text-xs font-bold tracking-[0.2em] text-[#c6f36b] backdrop-blur-xl">
              <Sparkles size={15} />
              NOIR PLAY ORIGINALS
            </div>

            <p className="mb-3 text-xs font-semibold tracking-[0.3em] text-gray-300 sm:text-sm">
              YOUR NEXT OBSESSION STARTS HERE
            </p>

            <h1 className="max-w-3xl text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
              {activeMovie.title}
            </h1>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-gray-200">
              <span className="inline-flex items-center gap-1.5 font-bold text-[#c6f36b]">
                <Star size={16} fill="currentColor" />
                {activeMovie.rating}/10
              </span>

              <span className="h-1 w-1 rounded-full bg-gray-400" />
              <span>{activeMovie.year}</span>

              <span className="h-1 w-1 rounded-full bg-gray-400" />
              <span>{activeMovie.language}</span>

              {activeMovie.duration && (
                <>
                  <span className="h-1 w-1 rounded-full bg-gray-400" />
                  <span>{activeMovie.duration}</span>
                </>
              )}
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {(activeMovie.genres || []).map((genre) => (
                <span
                  key={genre}
                  className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs text-gray-200 backdrop-blur-md"
                >
                  {genre}
                </span>
              ))}
            </div>

            <p className="mt-6 max-w-xl text-sm leading-7 text-gray-300 sm:text-base sm:leading-8">
              {activeMovie.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to={`/movie/${activeMovie.id}`}
                className="inline-flex items-center gap-2 rounded-lg bg-[#c6f36b] px-6 py-3.5 text-sm font-bold text-[#09090b] transition duration-300 hover:-translate-y-1 hover:bg-[#d7ff91] hover:shadow-lg hover:shadow-[#c6f36b]/20"
              >
                <Play size={19} fill="currentColor" />
                Watch Now
              </Link>

              <button
                type="button"
                onClick={() => toggleWatchlist(activeMovie)}
                aria-label={
                  saved ? "Remove from My List" : "Add to My List"
                }
                aria-pressed={saved}
                className="inline-flex items-center gap-2 rounded-lg border border-white/25 bg-white/10 px-6 py-3.5 text-sm font-semibold backdrop-blur-lg transition hover:border-[#c6f36b]/60 hover:bg-white/20"
              >
                {saved ? <Check size={19} /> : <Plus size={19} />}
                {saved ? "Added to My List" : "My List"}
              </button>
            </div>

            <p className="mt-7 text-[10px] font-semibold tracking-[0.25em] text-gray-400 sm:text-xs">
              A WORLD OF STORIES. ONE DESTINATION.
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-10 left-5 right-5 z-20 flex items-center justify-between sm:left-8 sm:right-8 lg:left-16 lg:right-16">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={showPrevious}
            aria-label="Previous movie"
            className="rounded-full border border-white/20 bg-black/40 p-2.5 backdrop-blur-md transition hover:bg-[#c6f36b] hover:text-black"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            type="button"
            onClick={showNext}
            aria-label="Next movie"
            className="rounded-full border border-white/20 bg-black/40 p-2.5 backdrop-blur-md transition hover:bg-[#c6f36b] hover:text-black"
          >
            <ChevronRight size={20} />
          </button>

          <span className="ml-2 text-xs font-semibold tracking-widest text-gray-300">
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(featuredMovies.length).padStart(2, "0")}
          </span>
        </div>

        <div className="flex max-w-[55%] items-center gap-1.5 overflow-hidden sm:gap-2">
          {featuredMovies.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => changeSlide(index)}
              aria-label={`Show ${item.title}`}
              aria-current={index === activeIndex ? "true" : undefined}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "w-8 bg-[#c6f36b] sm:w-10"
                  : "w-2 bg-white/40 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="absolute right-8 top-1/2 hidden -translate-y-1/2 rotate-90 text-[10px] font-semibold tracking-[0.3em] text-white/50 xl:block">
        FEATURED • NOIR PLAY
      </div>
    </section>
  );
}
