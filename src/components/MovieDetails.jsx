
import { useState } from "react";
import { Link } from "react-router-dom";
import { Play, Plus, Check,Star,Clock3,CalendarDays, Users,} from "lucide-react";
import { useWatchlist } from "../context/WatchlistContext.jsx";

export default function MovieDetails({ movie }) {
  const [showTrailer, setShowTrailer] = useState(false);
  const { toggleWatchlist, isInWatchlist } = useWatchlist();

  if (!movie) return null;

  const saved = isInWatchlist(movie.id);

  return (
    <article className="relative min-h-screen overflow-hidden bg-[#09090b] text-white">
      <div className="pointer-events-none absolute inset-0 h-[750px]">
        <img
          src={movie.image}
          alt=""
          className="h-10 w-full object-cover object-center opacity-35 blur-[2px]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#09090b] via-[#09090b]/80 to-[#09090b]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/40 to-black/20" />
      </div>

      <div className="relative z-10 mx-auto max-w-full px-5 py-10 sm:px-8 md:px-12 lg:px-16 lg:py-16">
        <Link
          to="/"
          className="mb-10 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-black/20 px-4 py-2.5 text-sm text-gray-300 backdrop-blur-md transition hover:border-[#c6f36b]/50 hover:text-[#c6f36b]"
        >
          <span aria-hidden="true">←</span>
          Back to discover
        </Link>

        <div className="grid items-center gap-10 md:grid-cols-[minmax(220px,340px)_1fr] lg:gap-16">
          <div className="mx-auto w-full max-w-[320px] overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/50 md:max-w-none">
            <img
              src={movie.image}
              alt={`${movie.title} poster`}
              className="aspect-[2/3] w-full object-cover"
            />
          </div>

          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#c6f36b]/30 bg-[#c6f36b]/10 px-4 py-2 text-xs font-bold tracking-[0.2em] text-[#c6f36b]">
              NOIR PLAY PRESENTS
            </span>

            <h1 className="mt-6 font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-7xl">
              {movie.title}
            </h1>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-gray-300">
              <span className="inline-flex items-center gap-1.5 font-bold text-[#c6f36b]">
                <Star size={16} fill="currentColor" />
                {movie.rating}/10
              </span>

              <span className="inline-flex items-center gap-2">
                <CalendarDays size={15} className="text-gray-400" />
                {movie.year}
              </span>

              <span className="inline-flex items-center gap-2">
                <Clock3 size={15} className="text-gray-400" />
                {movie.duration}
              </span>

              <span className="rounded border border-white/20 px-2 py-1 text-xs">
                {movie.age}
              </span>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {movie.genres.map((genre) => (
                <span
                  key={genre}
                  className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-gray-300 backdrop-blur-sm"
                >
                  {genre}
                </span>
              ))}
            </div>

            <p className="mt-7 max-w-2xl text-sm leading-8 text-gray-300 sm:text-base">
              {movie.description}
            </p>

            <div className="mt-7 flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-4">
              <Users size={19} className="mt-0.5 shrink-0 text-[#c6f36b]" />

              <div>
                <h2 className="text-sm font-bold text-white">Starring</h2>
                <p className="mt-1 text-sm leading-6 text-gray-400">
                  {movie.cast.join(" · ")}
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setShowTrailer((value) => !value)}
                aria-expanded={showTrailer}
                className="inline-flex items-center gap-2 rounded-lg bg-[#c6f36b] px-6 py-3.5 text-sm font-bold text-[#09090b] shadow-lg shadow-[#c6f36b]/10 transition hover:scale-105 hover:bg-[#d6ff8b] active:scale-95"
              >
                <Play size={18} fill="currentColor" />
                {showTrailer ? "Hide preview" : "Watch preview"}
              </button>

              <button
                type="button"
                onClick={() => toggleWatchlist(movie)}
                aria-pressed={saved}
                className={`inline-flex items-center gap-2 rounded-lg border px-6 py-3.5 text-sm font-semibold transition active:scale-95 ${
                  saved
                    ? "border-[#c6f36b]/50 bg-[#c6f36b]/10 text-[#c6f36b] hover:bg-[#c6f36b]/20"
                    : "border-white/20 bg-white/5 text-white hover:border-[#c6f36b]/50 hover:bg-white/10"
                }`}
              >
                {saved ? <Check size={18} /> : <Plus size={18} />}
                {saved ? "In My List" : "Add to My List"}
              </button>
            </div>
          </div>
        </div>

        {showTrailer && (
          <div className="mt-14 overflow-hidden rounded-2xl border border-white/10 bg-[#141620]/90 p-5 sm:p-8">
            <div className="flex min-h-[240px] flex-col items-center justify-center rounded-xl border border-dashed border-white/15 bg-black/30 px-5 py-12 text-center">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#c6f36b]/10 text-[#c6f36b]">
                <Play size={30} fill="currentColor" />
              </div>

              <h2 className="font-display text-2xl font-bold">
                Preview coming soon
              </h2>

              <p className="mt-3 max-w-md text-sm leading-6 text-gray-400">
                A trailer URL can be connected here when one is available.
              </p>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
