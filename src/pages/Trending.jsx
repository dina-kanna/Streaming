import { useMemo, useState } from "react";
import { Flame, Search, TrendingUp, Play, Sparkles, Filter, SlidersHorizontal } from "lucide-react";
import MovieCard from "../components/MovieCard.jsx";
import { movies } from "../data/movies.js";

export default function Trending() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("rating");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const availableGenres = useMemo(() => {
    const genresSet = new Set(["All"]);
    movies.forEach((movie) => {
      if (Array.isArray(movie.genres)) {
        movie.genres.forEach((g) => genresSet.add(g));
      }
    });
    return Array.from(genresSet);
  }, []);

  const trendingMovies = useMemo(() => {
    const markedTrending = movies.filter((movie) => {
      const category = String(movie.category || "").toLowerCase();
      const tags = Array.isArray(movie.tags)
        ? movie.tags.map((tag) => String(tag).toLowerCase())
        : [];

      return category === "trending now" || category === "trending" || tags.includes("trending");
    });

    const source = markedTrending.length > 0 ? markedTrending : [...movies];

    return source
      .filter((movie) => {
        if (selectedGenre !== "All") {
          const movieGenres = Array.isArray(movie.genres) ? movie.genres : [];
          if (!movieGenres.includes(selectedGenre)) return false;
        }

        const text = `${movie.title || ""} ${movie.description || ""} ${
          Array.isArray(movie.genres) ? movie.genres.join(" ") : ""
        }`;
        return text.toLowerCase().includes(search.toLowerCase().trim());
      })
      .sort((a, b) => {
        if (sortBy === "year") {
          return Number(b.year || 0) - Number(a.year || 0);
        }
        return Number(b.rating || 0) - Number(a.rating || 0);
      });
  }, [search, sortBy, selectedGenre]);

  const topSpotlight = trendingMovies[0];

  return (
    <div className="min-h-screen space-y-8 pb-12 text-white selection:bg-[#c6f36b] selection:text-black">
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0c0d12] p-8 sm:p-12 md:p-16">
        <div className="pointer-events-none absolute -right-20 -top-20 h-86 w-86 rounded-full bg-orange-500/15 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-20 left-10 h-80 w-80 rounded-full bg-[#c6f36b]/10 blur-[100px]" />

        <div className="relative z-10 flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
          <div className="max-w-full">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-2 py-0 text-xs font-bold uppercase tracking-widest text-orange-400">
              <Flame size={15} className="animate-pulse" />
              <span>Real-Time Pulse</span>
            </div>

            <h1 className="font-black text-4xl sm:text-6xl tracking-tight leading-tight">
              Top Trending <br />
              <span className="text-[#c6f36b]">Right This Second.</span>
            </h1>

            <p className="mt-4 text-sm leading-relaxed text-zinc-400 sm:text-base">
              Dive into the most watched titles, fan favorites, and viral releases buzzing across the Noir Play community.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#trending-grid"
                className="inline-flex items-center gap-2 rounded-xl bg-[#c6f36b] px-6 py-3.5 text-sm font-extrabold text-[#08090d] transition-all duration-300 hover:bg-[#d6ff8b] hover:shadow-[0_0_25px_rgba(198,243,107,0.35)] active:scale-95"
              >
                <Play size={18} fill="currentColor" />
                <span>Explore Top Ranks</span>
              </a>

              <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400">
                <Sparkles size={16} className="text-[#c6f36b]" />
                <span>Updated hourly</span>
              </div>
            </div>
          </div>

          {/* Featured Poster Spotlight Widget */}
          {topSpotlight && (
            <div className="relative hidden shrink-0 lg:block">
              <div className="relative h-72 w-52 overflow-hidden rounded-2xl border border-white/20 shadow-2xl shadow-black/80">
                <img
                  src={topSpotlight.poster}
                  alt={topSpotlight.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="mb-1 inline-block rounded bg-[#c6f36b] px-2 py-0.5 text-[10px] font-black text-black">
                    #1 MOST POPULAR
                  </span>
                  <p className="truncate text-sm font-bold text-white">{topSpotlight.title}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Main Content & Controls */}
      <section id="trending-grid" className="space-y-8">
        {/* Header & Filter Bar */}
        <div className="flex flex-col gap-6 border-b border-white/10 pb-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#c6f36b]">
              <TrendingUp size={16} />
              <span>Curated Selection</span>
            </div>
            <h2 className="mt-1 text-2xl font-black text-white sm:text-3xl">
              Trending Library
            </h2>
          </div>

          {/* Search + Sort Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Search Box */}
            <div className="flex flex-1 items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 transition focus-within:border-[#c6f36b] sm:w-64 sm:flex-initial">
              <Search size={16} className="text-zinc-400" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Filter titles..."
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5">
              <SlidersHorizontal size={15} className="text-zinc-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-xs font-bold uppercase tracking-wider text-white outline-none"
              >
                <option value="rating" className="bg-[#141620]">Top Rated</option>
                <option value="year" className="bg-[#141620]">Newest First</option>
              </select>
            </div>
          </div>
        </div>

        {/* Genre Pill Selection */}
        <div className="flex flex-wrap items-center gap-2">
          <Filter size={14} className="mr-2 text-zinc-500" />
          {availableGenres.map((genre) => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`rounded-xl px-4 py-1.5 text-xs font-semibold transition-all duration-200 ${
                selectedGenre === genre
                  ? "bg-[#c6f36b] text-black font-bold shadow-[0_0_15px_rgba(198,243,107,0.25)]"
                  : "border border-white/10 bg-white/5 text-zinc-400 hover:border-white/20 hover:text-white"
              }`}
            >
              {genre}
            </button>
          ))}
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs font-medium text-zinc-400">
          <span>
            Showing <strong className="text-white">{trendingMovies.length}</strong> title{trendingMovies.length === 1 ? "" : "s"}
          </span>
          {selectedGenre !== "All" && (
            <button
              onClick={() => setSelectedGenre("All")}
              className="text-[#c6f36b] underline hover:text-white"
            >
              Reset filter
            </button>
          )}
        </div>

        {/* Movies Grid */}
        {trendingMovies.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {trendingMovies.map((movie, index) => (
              <div key={movie.id} className="group relative">
                {/* Ranking Tag */}
                <div className="absolute left-2.5 top-2.5 z-20 flex h-8 w-8 items-center justify-center rounded-xl border border-white/20 bg-black/70 text-xs font-black text-[#c6f36b] shadow-lg backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
                  #{index + 1}
                </div>

                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-white/10 bg-white/[0.02] px-6 py-16 text-center">
            <Flame size={40} className="mx-auto mb-3 text-zinc-600" />
            <h3 className="text-lg font-bold text-white">No matches found</h3>
            <p className="mt-1 text-xs text-zinc-400">
              Try adjusting your search terms or genre filter.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setSelectedGenre("All");
              }}
              className="mt-4 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-[#c6f36b] hover:bg-white/10"
            >
              Clear all filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
}