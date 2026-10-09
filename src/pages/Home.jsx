
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
    <main className="min-h-screen overflow-hidden bg-[#09090b] text-white">
      <Hero movie={heroMovie} />

      <div className="mx-auto w-full max-w-full pb-12">
        {query.trim() && (
          <div className="mx-5 mt-1 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-white/10 bg-[#141620] px-4 py-4 sm:mx-8 sm:px-6 lg:mx-12">
            <div className="flex min-w-0 items-center gap-3">
              <Search
                size={20}
                className="shrink-0 text-[#c6f36b]"
              />

              <p className="min-w-0 text-sm text-gray-300 sm:text-base">
                Search results for{" "}
                <strong className="break-words text-white">
                  “{query}”
                </strong>
              </p>

              <span className="shrink-0 rounded-full bg-white/10 px-2.5 py-1 text-xs text-gray-300">
                {filtered.length}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setQuery("")}
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm text-gray-300 transition hover:border-[#c6f36b]/40 hover:bg-[#c6f36b]/10 hover:text-[#c6f36b]"
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
              : "The stories everyone is talking about"
          }
          movies={query.trim() ? filtered : movies}
        />

        {!query.trim() && (
          <>
            <MovieRow
              id="popular"
              title="Popular on Noir"
              subtitle="Fan favorites worth your time"
              movies={popular}
            />

            <MovieRow
              id="new-releases"
              title="New Releases"
              subtitle="Fresh stories, just added"
              movies={latest}
            />

            <MovieRow
              id="top-picks"
              title="Top Picks"
              subtitle="Highest rated by our viewers"
              movies={topPicks}
            />

            <MovieRow
              id="recommended"
              title="Recommended for You"
              subtitle="A little something for your next movie night"
              movies={recommended}
            />
          </>
        )}

        {query.trim() && filtered.length === 0 && (
          <div className="mx-5 my-8 flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-white/10 bg-[#141620]/70 px-6 text-center sm:mx-8 lg:mx-12">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#c6f36b]/10 text-[#c6f36b]">
              <Search size={28} />
            </div>

            <h2 className="font-display text-2xl font-bold sm:text-3xl">
              No titles found
            </h2>

            <p className="mt-3 max-w-md text-sm leading-6 text-gray-400 sm:text-base">
              We couldn't find a match for "{query}". Try another movie
              title, series, or genre.
            </p>

            <button
              type="button"
              onClick={() => setQuery("")}
              className="mt-6 rounded-lg bg-[#c6f36b] px-5 py-3 text-sm font-bold text-[#09090b] transition hover:bg-[#d6ff8b] active:scale-95"
            >
              Explore all titles
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
