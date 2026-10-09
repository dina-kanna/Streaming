
import { Link } from "react-router-dom";
import {
  Clapperboard,
  ArrowUpRight,
  Send,
  Globe,
  PlayCircle,
} from "lucide-react";

export default function Footer() {
  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const linkStyle =
    "inline-block text-gray-600 transition-all duration-200 hover:translate-x-1 hover:text-green-700 dark:text-zinc-400 dark:hover:text-[#c6f36b]";

  const headingStyle =
    "mb-4 text-xs font-bold uppercase tracking-[0.2em] text-gray-900 dark:text-white/90";

  const socialStyle =
    "flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 transition-all duration-300 hover:border-green-600 hover:bg-green-600 hover:text-white dark:border-white/10 dark:bg-white/5 dark:text-zinc-400 dark:hover:border-[#c6f36b] dark:hover:bg-[#c6f36b] dark:hover:text-[#08090d]";

  return (
    <footer className="relative isolate overflow-hidden border-t border-gray-200 bg-gray-100 text-gray-900 transition-colors duration-300 dark:border-white/10 dark:bg-[#07080c] dark:text-white">
      {/* Background Accent Glows */}
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-40 w-[600px] max-w-full -translate-x-1/2 rounded-full bg-green-600/5 blur-[120px] dark:bg-[#c6f36b]/10" />

      <div className="pointer-events-none absolute bottom-0 right-0 -z-10 h-64 w-64 rounded-full bg-purple-600/5 blur-[100px]" />

      {/* Top Accent Gradient Line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-green-600/40 to-transparent dark:via-[#c6f36b]/40" />

      {/* Newsletter Section */}
      <div className="border-b border-gray-200 bg-white/70 backdrop-blur-md dark:border-white/10 dark:bg-white/[0.015]">
        <div className="mx-auto flex max-w-full flex-col items-center justify-between gap-6 px-6 py-12 lg:flex-row">
          <div className="text-center lg:text-left">
            <span className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-green-700/20 bg-green-600/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-green-800 dark:border-[#c6f36b]/20 dark:bg-[#c6f36b]/10 dark:text-[#c6f36b]">
              <PlayCircle size={13} />
              Exclusive Access
            </span>

            <h3 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white sm:text-3xl">
              Stay ahead of the story
              <span className="text-green-700 dark:text-[#c6f36b]">
                .
              </span>
            </h3>

            <p className="mt-1.5 text-sm text-gray-600 dark:text-zinc-400">
              Subscribe for premiere updates, weekly recommendations, and
              insider picks.
            </p>
          </div>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="group relative flex w-full max-w-md items-center"
          >
            <input
              type="email"
              placeholder="Enter your email address..."
              aria-label="Email address"
              required
              className="w-full rounded-xl border border-gray-300 bg-white py-3.5 pl-4 pr-28 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all duration-300 focus:border-green-600 focus:shadow-[0_0_20px_rgba(22,163,74,0.12)] dark:border-white/15 dark:bg-white/5 dark:text-white dark:placeholder-zinc-500 dark:focus:border-[#c6f36b] dark:focus:bg-black/60 dark:focus:shadow-[0_0_20px_rgba(198,243,107,0.15)]"
            />

            <button
              type="submit"
              className="absolute right-1.5 inline-flex items-center gap-1.5 rounded-lg bg-green-700 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-green-800 active:scale-95 dark:bg-[#c6f36b] dark:text-[#08090d] dark:hover:bg-[#d6ff8b] dark:hover:shadow-[0_0_15px_rgba(198,243,107,0.4)]"
            >
              <span>Join</span>
              <Send size={13} />
            </button>
          </form>
        </div>
      </div>

      {/* Navigation Matrix */}
      <div className="mx-auto grid max-w-full grid-cols-1 gap-10 px-6 py-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-8">
        {/* Brand Block */}
        <div className="lg:col-span-1">
          <Link
            to="/"
            className="group mb-4 inline-flex items-center gap-2.5 text-2xl font-black tracking-wider text-gray-900 dark:text-white"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-green-700/30 bg-green-600/10 text-green-700 transition-transform duration-300 group-hover:scale-105 dark:border-[#c6f36b]/30 dark:bg-[#c6f36b]/10 dark:text-[#c6f36b]">
              <Clapperboard size={20} />
            </div>

            <span>
              NOIR
              <span className="text-green-700 dark:text-[#c6f36b]">
                PLAY
              </span>
            </span>
          </Link>

          <p className="max-w-xs text-xs leading-relaxed text-gray-600 dark:text-zinc-400">
            Stories that stay with you. Discover extraordinary cinema,
            exclusive originals, and live broadcast events.
          </p>

          <div className="mt-5 flex items-center gap-2 text-xs font-medium text-gray-600 dark:text-zinc-400">
            <Globe
              size={14}
              className="text-green-700 dark:text-[#c6f36b]"
            />
            <span>Global Streaming Available</span>
          </div>

          <div className="mt-6 h-[2px] w-10 rounded-full bg-gradient-to-r from-green-600 to-transparent dark:from-[#c6f36b]" />
        </div>

        {/* Navigation Column */}
        <div>
          <h3 className={headingStyle}>Navigation</h3>

          <ul className="flex flex-col gap-2.5 text-sm">
            {[
              { name: "Home", path: "/" },
              { name: "Trending Now", path: "/trending" },
              { name: "Live Broadcasts", path: "/tv-shows" },
              { name: "My Watchlist", path: "/my-list" },
              { name: "Noir Originals", path: "/movies" },
            ].map((item) => (
              <li key={item.name}>
                <Link to={item.path} className={linkStyle}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Genres Column */}
        <div>
          <h3 className={headingStyle}>Genres</h3>

          <ul className="flex flex-col gap-2.5 text-sm">
            {[
              { name: "Action & Thriller", path: "/genre/action" },
              { name: "Sci-Fi & Fantasy", path: "/genre/sci-fi" },
              { name: "Drama & Crime", path: "/genre/drama" },
              { name: "Documentaries", path: "/genre/documentary" },
              { name: "Anime & Animation", path: "/genre/anime" },
            ].map((genre) => (
              <li key={genre.name}>
                <Link to={genre.path} className={linkStyle}>
                  {genre.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Account & Support */}
        <div>
          <h3 className={headingStyle}>Account & Support</h3>

          <ul className="flex flex-col gap-2.5 text-sm">
            {[
              { name: "Sign In", path: "/login" },
              { name: "Create Account", path: "/signup" },
              { name: "Help Center", path: "/help" },
              { name: "Supported Devices", path: "/devices" },
              { name: "FAQ", path: "/faq" },
            ].map((item) => (
              <li key={item.name}>
                <Link to={item.path} className={linkStyle}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social & Back To Top */}
        <div className="flex flex-col justify-between">
          <div>
            <h3 className={headingStyle}>Follow the story</h3>

            <div className="flex items-center gap-3">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className={socialStyle}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className={socialStyle}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                  <path d="m10 15 5-3-5-3z" />
                </svg>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className={socialStyle}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </a>
            </div>
          </div>

          <a
            href="#top"
            onClick={scrollToTop}
            className="group mt-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-600 transition hover:text-green-700 dark:text-zinc-400 dark:hover:text-[#c6f36b]"
          >
            <span>Back to top</span>
            <ArrowUpRight
              size={15}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </div>
      </div>

      {/* Bottom Sub-Footer Bar */}
      <div className="border-t border-gray-200 bg-gray-200/60 py-6 dark:border-white/10 dark:bg-black/40">
        <div className="mx-auto flex max-w-full flex-col items-center justify-between gap-4 px-6 text-center text-xs text-gray-600 dark:text-zinc-500 sm:flex-row sm:text-left">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 sm:justify-start">
            <span>
              © {new Date().getFullYear()} Noir Play. Frontend demo.
            </span>

            <Link
              to="/privacy"
              className="transition hover:text-gray-900 dark:hover:text-zinc-300"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms"
              className="transition hover:text-gray-900 dark:hover:text-zinc-300"
            >
              Terms of Service
            </Link>

            <Link
              to="/cookies"
              className="transition hover:text-gray-900 dark:hover:text-zinc-300"
            >
              Cookie Preferences
            </Link>
          </div>

          <span className="flex items-center gap-1.5 font-bold uppercase tracking-widest text-gray-700 dark:text-zinc-400">
            <span>Made for movie lovers</span>
            <span className="text-green-700 dark:text-[#c6f36b]">✦</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
