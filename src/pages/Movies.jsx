
import { useMemo, useState } from "react";
import { Film, Search, SlidersHorizontal } from "lucide-react";
import MovieCard from "../components/MovieCard.jsx";
import { movies } from "../data/movies.js";

export default function Movies() {
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");

  const genres = [
    "All",
    ...new Set(movies.flatMap((movie) => movie.genres || [])),
  ];

  const filteredMovies = useMemo(() => {
    return movies.filter((movie) => {
      const matchesSearch = movie.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesGenre =
        selectedGenre === "All" ||
        (movie.genres || []).includes(selectedGenre);

      return matchesSearch && matchesGenre;
    });
  }, [search, selectedGenre]);

  return (
    <main className="min-h-screen w-full bg-gray-50 px-4 py-6 text-gray-900 transition-colors duration-300 dark:bg-[#09090b] dark:text-white sm:px-8 md:px-12 lg:px-16">
      {/* Page Header */}
      <div className="mb-10 w-full">
        <div className="mb-3 flex items-center gap-2.5 text-green-700 dark:text-[#c6f36b]">
          <Film size={24} />
          <span className="text-xs font-bold uppercase tracking-[0.25em]">
            Explore Cinema
          </span>
        </div>

        <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
          All{" "}
          <span className="text-green-700 dark:text-[#c6f36b]">
            Movies
          </span>
        </h1>

        <p className="mt-3 text-sm text-gray-600 dark:text-zinc-400 sm:text-base">
          Discover your next favorite movie from our entire library.
        </p>
      </div>

      {/* Search and Results Count */}
      <div className="mb-8 flex w-full flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-md">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-zinc-400"
          />

          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search movies by title..."
            className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-600 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-zinc-500 dark:focus:border-[#c6f36b]/80 dark:focus:bg-black/40"
          />
        </div>

        <div className="flex items-center gap-2 font-medium text-gray-600 dark:text-zinc-400">
          <SlidersHorizontal
            size={17}
            className="text-green-700 dark:text-[#c6f36b]"
          />

          <span className="text-sm">
            <strong className="text-gray-900 dark:text-white">
              {filteredMovies.length}
            </strong>{" "}
            {filteredMovies.length === 1 ? "title" : "titles"} available
          </span>
        </div>
      </div>

      {/* Genre Filters */}
      <div className="mb-10 flex w-full gap-2.5 overflow-x-auto pb-3">
        {genres.map((genre) => {
          const isSelected = selectedGenre === genre;

          return (
            <button
              key={genre}
              type="button"
              onClick={() => setSelectedGenre(genre)}
              aria-pressed={isSelected}
              className={`shrink-0 rounded-xl border px-5 py-2.5 text-xs font-bold transition-all duration-200 ${
                isSelected
                  ? "border-green-700 bg-green-700 text-white shadow-md dark:border-[#c6f36b] dark:bg-[#c6f36b] dark:text-[#09090b] dark:shadow-[0_0_18px_rgba(198,243,107,0.2)]"
                  : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:text-gray-900 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300 dark:hover:border-white/20 dark:hover:text-white"
              }`}
            >
              {genre}
            </button>
          );
        })}
      </div>

      {/* Responsive Movies Grid */}
      {filteredMovies.length > 0 ? (
        <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 3xl:grid-cols-8">
          {filteredMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="w-full rounded-3xl border border-dashed border-gray-300 bg-white px-6 py-20 text-center dark:border-white/10 dark:bg-white/[0.02]">
          <Film
            size={42}
            className="mx-auto mb-4 text-gray-400 dark:text-zinc-600"
          />

          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            No movies found
          </h2>

          <p className="mt-2 text-sm text-gray-600 dark:text-zinc-400">
            Try searching for a different title or reset your genre filter.
          </p>

          <button
            type="button"
            onClick={() => {
              setSearch("");
              setSelectedGenre("All");
            }}
            className="mt-5 inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-100 px-5 py-2.5 text-xs font-bold text-green-700 transition hover:bg-gray-200 dark:border-white/10 dark:bg-white/5 dark:text-[#c6f36b] dark:hover:bg-white/10"
          >
            Reset Filters
          </button>
        </div>
      )}
    </main>
  );
}
