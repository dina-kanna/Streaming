
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  BookmarkPlus,
  BookmarkCheck,
  Play,
  Star,
} from "lucide-react";
import { useWatchlist } from "../context/WatchlistContext.jsx";

export default function MovieCard({ movie }) {
  const { toggleWatchlist, isInWatchlist } = useWatchlist();
  const saved = isInWatchlist(movie.id);
  const [imageError, setImageError] = useState(false);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      whileHover={{ y: -7, scale: 1.015 }}
      transition={{ duration: 0.25 }}
      className="group relative min-w-0 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg shadow-black/5 transition-colors duration-300 dark:border-white/5 dark:bg-[#141620] dark:shadow-black/10"
    >
      {/* Movie Poster */}
      <Link
        to={`/movie/${movie.id}`}
        className="relative block aspect-[2/3] overflow-hidden bg-gray-200 dark:bg-[#20222c]"
        aria-label={`View ${movie.title}`}
      >
        {!imageError && movie.poster ? (
          <img
            src={movie.poster}
            alt={movie.title}
            loading="lazy"
            onError={() => setImageError(true)}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300 p-4 text-center dark:from-[#20222c] dark:via-[#141620] dark:to-[#09090b]">
            <Play size={38} className="text-green-700 dark:text-[#c6f36b]" />

            <span className="font-display text-lg font-bold text-gray-900 dark:text-white">
              {movie.title}
            </span>

            <span className="text-xs text-gray-500 dark:text-gray-500">
              Poster unavailable
            </span>
          </div>
        )}

        {/* Poster Overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/20 opacity-80 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Movie Type */}
        <span className="absolute left-3 top-3 rounded-md border border-white/15 bg-black/60 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
          {movie.type}
        </span>

        {/* Rating */}
        <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-md bg-black/65 px-2 py-1 text-xs font-bold text-[#c6f36b] backdrop-blur-md">
          <Star size={13} fill="currentColor" />
          {movie.rating}
        </span>

        {/* Play Icon */}
        <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 scale-75 items-center justify-center rounded-full border border-white/30 bg-white/15 text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
          <Play size={22} fill="currentColor" />
        </span>
      </Link>

      {/* Watchlist Button */}
      <button
        type="button"
        onClick={() => toggleWatchlist(movie)}
        aria-label={
          saved
            ? `Remove ${movie.title} from My List`
            : `Add ${movie.title} to My List`
        }
        aria-pressed={saved}
        title={saved ? "Remove from My List" : "Add to My List"}
        className={`absolute right-3 top-[calc(66.67%-3rem)] z-10 flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur-md transition-all duration-200 ${
          saved
            ? "border-green-600/50 bg-green-600 text-white dark:border-[#c6f36b]/50 dark:bg-[#c6f36b] dark:text-[#09090b]"
            : "border-white/30 bg-black/65 text-white hover:border-[#c6f36b] hover:bg-[#c6f36b] hover:text-[#09090b]"
        }`}
      >
        {saved ? (
          <BookmarkCheck size={18} />
        ) : (
          <BookmarkPlus size={18} />
        )}
      </button>

      {/* Movie Details */}
      <div className="p-3.5 sm:p-4">
        <Link
          to={`/movie/${movie.id}`}
          className="block truncate font-display text-base font-bold text-gray-900 transition-colors hover:text-green-700 dark:text-white dark:hover:text-[#c6f36b] sm:text-lg"
        >
          {movie.title}
        </Link>

        <div className="mt-2 flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 sm:text-sm">
          <span>{movie.year}</span>
          <span className="h-1 w-1 rounded-full bg-gray-400 dark:bg-gray-500" />
          <span>{movie.duration}</span>
        </div>

        {/* Genres */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {(movie.genres || []).map((genre) => (
            <span
              key={genre}
              className="rounded-md border border-gray-200 bg-gray-100 px-2 py-1 text-[10px] text-gray-700 dark:border-white/10 dark:bg-white/5 dark:text-gray-300 sm:text-xs"
            >
              {genre}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
