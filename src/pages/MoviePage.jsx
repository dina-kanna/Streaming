
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Film, House, Sparkles } from "lucide-react";
import MovieDetails from "../components/MovieDetails.jsx";
import MovieRow from "../components/MovieRow.jsx";
import { movies } from "../data/movies.js";

export default function MoviePage() {
  const { id } = useParams();
  const movie = movies.find((item) => item.id === id);

  if (!movie) {
    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#09090b] px-5 py-16 text-white">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c6f36b]/10 blur-[100px]" />

        <div className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-[#141620]/90 p-8 text-center shadow-2xl sm:p-12">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border border-[#c6f36b]/20 bg-[#c6f36b]/10 text-[#c6f36b]">
            <Film size={36} />
          </div>

          <p className="mt-7 text-xs font-bold tracking-[0.2em] text-[#c6f36b]">
            404 · TITLE NOT FOUND
          </p>

          <h1 className="mt-4 font-display text-3xl font-bold sm:text-4xl">
            Lost in the plot<span className="text-[#c6f36b]">?</span>
          </h1>

          <p className="mx-auto mt-4 max-w-sm text-sm leading-7 text-gray-400">
            This movie or series may have been removed, or the link may be
            incorrect. Let's find another story for you.
          </p>

          <Link
            to="/"
            className="group mt-8 inline-flex items-center justify-center gap-2 rounded-lg bg-[#c6f36b] px-6 py-3.5 text-sm font-bold text-[#09090b] transition-all duration-300 hover:-translate-y-1 hover:bg-[#d6ff8b] hover:shadow-lg hover:shadow-[#c6f36b]/20 active:translate-y-0"
          >
            <House size={17} />
            Return home
            <ArrowLeft
              size={16}
              className="rotate-180 transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </main>
    );
  }

  // Find movies sharing at least one genre
  const related = movies.filter(
    (item) =>
      item.id !== movie.id &&
      item.genres.some((genre) => movie.genres.includes(genre))
  );

  const recommendations = related.length
    ? related
    : movies.filter((item) => item.id !== movie.id);

  return (
    <main className="min-h-screen overflow-hidden bg-[#09090b] text-white">
      {/* Selected movie details */}
      <MovieDetails movie={movie} />

      {/* Related movie recommendations */}
      {recommendations.length > 0 && (
        <section className="relative border-t border-white/5 bg-[#09090b] py-5 sm:py-8">
          <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-[#c6f36b]/5 blur-[100px]" />

          <div className="relative">
            <div className="mx-5 mb-2 flex items-center gap-2 text-xs font-bold tracking-[0.18em] text-[#c6f36b] sm:mx-8 lg:mx-12">
              <Sparkles size={15} />
              CURATED FOR YOU
            </div>

            <MovieRow
              id="related-movies"
              title="You May Also Like"
              subtitle="More stories selected for you"
              movies={recommendations}
            />
          </div>
        </section>
      )}
    </main>
  );
}
