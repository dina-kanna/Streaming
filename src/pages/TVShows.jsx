
import { useMemo, useState } from "react";
import {Tv,Search,Play,Globe,SlidersHorizontal, Star, X,} from "lucide-react";
import MovieCard from "../components/MovieCard.jsx";
import { movies } from "../data/movies.js";

const languages = ["All", "Tamil", "English", "Hindi"];

const getGenres = (shows) => [
  "All Genres",
  ...new Set(
    shows.flatMap((show) =>
      Array.isArray(show.genres) ? show.genres : []
    )
  ),
];

export default function TVShows() {
  const [language, setLanguage] = useState("All");
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("All Genres");
  const [minRating, setMinRating] = useState("0");
  const [year, setYear] = useState("All Years");
  const [sortBy, setSortBy] = useState("popular");
  const [showFilters, setShowFilters] = useState(true);

  const tvShows = useMemo(() => {
    return movies.filter((item) => {
      const type = String(
        item.type || item.category || ""
      ).toLowerCase();

      return (
        type.includes("tv show") ||
        type.includes("tv series") ||
        type.includes("series") ||
        type.includes("web series")
      );
    });
  }, []);

  const genres = useMemo(() => getGenres(tvShows), [tvShows]);

  const years = useMemo(() => {
    const uniqueYears = tvShows
      .map((show) => Number(show.year || show.releaseYear))
      .filter((value) => Number.isFinite(value) && value > 0);

    return [
      "All Years",
      ...new Set(uniqueYears.sort((a, b) => b - a).map(String)),
    ];
  }, [tvShows]);

  const filteredShows = useMemo(() => {
    let result = tvShows.filter((show) => {
      const matchesLanguage =
        language === "All" ||
        String(show.language || "").toLowerCase() ===
          language.toLowerCase();

      const showGenres = Array.isArray(show.genres)
        ? show.genres
        : [];

      const matchesGenre =
        genre === "All Genres" ||
        showGenres.some(
          (item) => item.toLowerCase() === genre.toLowerCase()
        );

      const rating = Number(show.rating || 0);
      const matchesRating = rating >= Number(minRating);

      const showYear = String(show.year || show.releaseYear || "");
      const matchesYear =
        year === "All Years" || showYear === year;

      const searchableText = [
        show.title,
        show.description,
        show.language,
        show.year,
        ...(showGenres),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch = searchableText.includes(
        search.toLowerCase().trim()
      );

      return (
        matchesLanguage &&
        matchesGenre &&
        matchesRating &&
        matchesYear &&
        matchesSearch
      );
    });

    if (sortBy === "title-asc") {
      result.sort((a, b) =>
        String(a.title || "").localeCompare(String(b.title || ""))
      );
    } else if (sortBy === "title-desc") {
      result.sort((a, b) =>
        String(b.title || "").localeCompare(String(a.title || ""))
      );
    } else if (sortBy === "rating") {
      result.sort(
        (a, b) => Number(b.rating || 0) - Number(a.rating || 0)
      );
    } else if (sortBy === "newest") {
      result.sort(
        (a, b) =>
          Number(b.year || b.releaseYear || 0) -
          Number(a.year || a.releaseYear || 0)
      );
    }

    return result;
  }, [tvShows, language, search, genre, minRating, year, sortBy]);

  const clearFilters = () => {
    setLanguage("All");
    setSearch("");
    setGenre("All Genres");
    setMinRating("0");
    setYear("All Years");
    setSortBy("popular");
  };

  return (
    <div className="min-h-screen space-y-5 pb-10 text-white">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#202c1b] via-[#111713] to-[#09090b] px-6 py-8 sm:px-10 sm:py-16">
        <div className="absolute -right-10 -top-16 h-54 w-64 rounded-full bg-[#c6f36b]/10 blur-3xl" />

        <div className="relative z-10 max-w-full">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#c6f36b]/30 bg-[#c6f36b]/10 px-4 py-2 text-sm text-[#c6f36b]">
            <Tv size={17} />
            Noir Play Series
          </div>

          <h1 className="text-4xl font-black leading-tight sm:text-6xl">
            Your Next
            <span className="block text-[#c6f36b]">
              Binge Starts Here.
            </span>
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-7 text-gray-300 sm:text-base">
            Explore exciting series, unforgettable characters, and
            stories from Tamil, English, and Hindi entertainment.
          </p>

          <a
            href="#tv-show-library"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#c6f36b] px-6 py-3 font-bold text-[#09090b] transition hover:bg-[#d5ff85]"
          >
            <Play size={18} fill="currentColor" />
            Explore TV Shows
          </a>
        </div>
      </section>

      {/* TV Show Library */}
      <section id="tv-show-library" className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-[#c6f36b]">
              Discover Series
            </p>
            <h2 className="text-3xl font-black sm:text-4xl">
              TV Shows
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              Find your next favorite series.
            </p>
          </div>

          {/* Search */}
          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#141620] px-4 py-3">
            <Search size={18} className="text-gray-400" />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search TV shows..."
              aria-label="Search TV shows"
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-500 sm:w-52"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Language Filters */}
        <div className="flex flex-wrap gap-2">
          {languages.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setLanguage(item)}
              className={`rounded-full px-5 py-2.5 text-sm font-bold transition ${
                language === item
                  ? "bg-[#c6f36b] text-[#09090b]"
                  : "border border-white/10 bg-[#141620] text-gray-300 hover:border-[#c6f36b]/50 hover:text-[#c6f36b]"
              }`}
            >
              {item === "All" ? (
                "All Languages"
              ) : (
                <span className="inline-flex items-center gap-2">
                  <Globe size={14} />
                  {item}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Advanced Filter Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setShowFilters((value) => !value)}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-[#141620] px-4 py-3 text-sm font-bold transition hover:border-[#c6f36b]/50"
          >
            <SlidersHorizontal size={17} className="text-[#c6f36b]" />
            {showFilters ? "Hide Filters" : "More Filters"}
          </button>

          <button
            type="button"
            onClick={clearFilters}
            className="text-sm font-semibold text-[#c6f36b] hover:text-white"
          >
            Reset All
          </button>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="grid grid-cols-1 gap-4 rounded-2xl border border-white/10 bg-[#11131c] p-5 sm:grid-cols-2 lg:grid-cols-4">
            {/* Genre */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-300">
                Genre
              </label>
              <select
                value={genre}
                onChange={(event) => setGenre(event.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#1a1d28] px-3 py-3 text-sm text-white outline-none focus:border-[#c6f36b]"
              >
                {genres.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* Release Year */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-300">
                Release Year
              </label>
              <select
                value={year}
                onChange={(event) => setYear(event.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#1a1d28] px-3 py-3 text-sm text-white outline-none focus:border-[#c6f36b]"
              >
                {years.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* Rating */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-300">
                Minimum Rating
              </label>
              <select
                value={minRating}
                onChange={(event) => setMinRating(event.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#1a1d28] px-3 py-3 text-sm text-white outline-none focus:border-[#c6f36b]"
              >
                <option value="0">All Ratings</option>
                <option value="5">5+ Stars</option>
                <option value="4">4+ Stars</option>
                <option value="3">3+ Stars</option>
                <option value="2">2+ Stars</option>
              </select>
            </div>

            {/* Sort */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-300">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#1a1d28] px-3 py-3 text-sm text-white outline-none focus:border-[#c6f36b]"
              >
                <option value="popular">Default Order</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest First</option>
                <option value="title-asc">Title: A–Z</option>
                <option value="title-desc">Title: Z–A</option>
              </select>
            </div>
          </div>
        )}

        {/* Results Count */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div>
            <h3 className="text-lg font-bold">
              {language === "All" ? "All Series" : `${language} Series`}
            </h3>
            <p className="mt-1 text-sm text-gray-400">
              Showing {filteredShows.length} of {tvShows.length} shows
            </p>
          </div>

          <div className="inline-flex items-center gap-1 text-sm text-gray-400">
            <Star size={16} className="text-[#c6f36b]" />
            {minRating === "0" ? "All ratings" : `${minRating}+ rating`}
          </div>
        </div>

        {/* Show Cards */}
        {filteredShows.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {filteredShows.map((show) => (
              <MovieCard key={show.id} movie={show} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-white/15 bg-[#141620]/60 px-5 py-14 text-center">
            <Tv size={38} className="mx-auto mb-4 text-[#c6f36b]" />
            <h3 className="text-xl font-bold">
              {tvShows.length === 0
                ? "TV shows coming soon"
                : "No shows found"}
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-400">
              {tvShows.length === 0
                ? 'Add series to src/data/movies.js with type: "TV Show" and a language such as "Tamil", "English", or "Hindi".'
                : "Try changing your search or filter options."}
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-5 rounded-full bg-[#c6f36b] px-5 py-2.5 text-sm font-bold text-[#09090b] transition hover:bg-[#d5ff85]"
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
