
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard.jsx";

export default function MovieRow({ title, movies, id, subtitle }) {
  if (!movies?.length) return null;

  return (
    <section
      id={id}
      className="mx-auto w-full max-w-full px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12"
    >
      <div className="mb-6 flex items-end justify-between gap-4 sm:mb-8">
        <div className="min-w-0">
          <h2 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
            {title}
            <span className="text-[#c6f36b]">.</span>
          </h2>

          {subtitle && (
            <p className="mt-2 text-sm leading-6 text-gray-400 sm:text-base">
              {subtitle}
            </p>
          )}
        </div>

        <Link
          to="/my-list"
          className="group mb-1 inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-semibold text-gray-300 transition-all duration-200 hover:border-[#c6f36b]/40 hover:bg-[#c6f36b]/10 hover:text-[#c6f36b] sm:px-4 sm:text-sm"
        >
          My List
          <ChevronRight
            size={16}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </Link>
      </div>

      <motion.div
        layout
        className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
      >
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </motion.div>
    </section>
  );
}
