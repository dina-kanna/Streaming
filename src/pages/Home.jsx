
import { useEffect, useMemo, useState } from "react";
import { X, Search } from "lucide-react";
import Hero from "../components/Hero.jsx";
import MovieRow from "../components/MovieRow.jsx";
import movies from "../data/movies.js";

export default function Home() {
  const [query, setQuery] = useState("");
  const heroMovie = movies[0];

  useEffect(() => {
    function handleSearch(event) {
      setQuery(event.detail || "");

      document.getElementById("trending")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    window.addEventListener("noir-search", handleSearch);

    return () => {
      window.removeEventListener("noir-search", handleSearch);
    };
  }, []);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();

    if (!term) return movies;

    return movies.filter((movie) =>
      [movie.title, movie.type, ...(movie.genres || [])]
        .join(" ")
        .toLowerCase()
        .includes(term)
    );
  }, [query]);

  const latest = [...movies].sort((a, b) => b.year - a.year);
  const topPicks = [...movies].sort((a, b) => b.rating - a.rating);
  const popular = movies.filter((movie) => movie.rating >= 8.5);

  const recommended = movies.filter((movie) =>
    movie.genres?.some((genre) =>
      ["Drama", "Thriller", "Adventure"].includes(genre)
    )
  );

  return (
    <main className="min-h-screen overflow-hidden bg-gray-50 text-gray-900 transition-colors duration-300 dark:bg-[#09090b] dark:text-gray-900">
      <Hero movie={heroMovie} />

      <div className="mx-auto w-full max-w-full pb-12">
        {query.trim() && (
          <div className="mx-5 mt-1 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white px-4 py-4 transition-colors duration-300 dark:border-white/10 dark:bg-[#141620] sm:mx-8 sm:px-6 lg:mx-12">
            <div className="flex min-w-0 items-center gap-3">
              <Search
                size={20}
                className="shrink-0 text-green-700 dark:text-[#c6f36b]"
              />

             <p className="min-w-0 text-sm text-gray-600 dark:text-gray-300 sm:text-base">
  Search results for{" "}
  <strong className="break-words text-gray-900 dark:text-white">
    “{query}”
  </strong>
</p>

<span className="shrink-0 rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-600 dark:bg-white/10 dark:text-gray-300">
  {filtered.length}
</span>
            </div>

            <button
              type="button"
              onClick={() => setQuery("")}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 transition hover:border-green-600/40 hover:bg-green-50 hover:text-green-700 dark:border-white/10 dark:text-gray-300 dark:hover:border-[#c6f36b]/40 dark:hover:bg-[#c6f36b]/10 dark:hover:text-[#c6f36b]"
            >
              <X size={16} />
              Clear search
            </button>
          </div>
        )}

        <MovieRow
          id="trending"
          title={query.trim() ? "Search Results" : "Trending Now"}
          subtitle={
            query.trim()
              ? `${filtered.length} titles found`
              : "🔥 The stories everyone's talking about"
          }
          movies={query.trim() ? filtered : movies}
        />

        {!query.trim() && (
          <>
            <MovieRow
              id="popular"
              title="Popular on Noir"
              subtitle="⭐ Fan favorites you don't want to miss"
              movies={popular}
            />

            <MovieRow
              id="new-releases"
              title="New Releases"
              subtitle="✨ Discover the latest arrivals"
              movies={latest}
            />

            <MovieRow
              id="top-picks"
              title="Top Picks"
              subtitle="🏆 Handpicked, highest-rated entertainment"
              movies={topPicks}
            />

            <MovieRow
              id="recommended"
              title="Recommended for You"
              subtitle="🎬 Your next unforgettable movie night starts here"
              movies={recommended}
            />
          </>
        )}

        {query.trim() && filtered.length === 0 && (
          <div className="mx-5 my-8 flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white px-6 text-center transition-colors duration-300 dark:border-white/10 dark:bg-[#141620]/70 sm:mx-8 lg:mx-12">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-700 dark:bg-[#c6f36b]/10 dark:text-[#c6f36b]">
              <Search size={28} />
            </div>

            <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
              No titles found
            </h2>

            <p className="mt-3 max-w-md text-sm leading-6 text-gray-600 dark:text-gray-400 sm:text-base">
              We couldn't find a match for "{query}". Try another movie
              title, series, or genre.
            </p>

            <button
              type="button"
              onClick={() => setQuery("")}
              className="mt-6 rounded-lg bg-green-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-green-800 active:scale-95 dark:bg-[#c6f36b] dark:text-[#09090b] dark:hover:bg-[#d6ff8b]"
            >
              Explore all titles
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
