
import { Link } from "react-router-dom";
import { Clapperboard, ArrowUpRight, Send, Globe, ShieldCheck, PlayCircle } from "lucide-react";

export default function Footer() {
  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/10 bg-[#07080c] text-white overflow-hidden select-none">
      {/* Background Accent Glows */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-[600px] -translate-x-1/2 rounded-full bg-[#c6f36b]/10 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-64 w-64 rounded-full bg-purple-600/5 blur-[100px]" />

      {/* Top Accent Gradient Line */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#c6f36b]/40 to-transparent" />

      {/* Newsletter Section */}
      <div className="border-b border-white/10 bg-white/[0.015] backdrop-blur-md">
        <div className="mx-auto flex max-w-full flex-col items-center justify-between gap-6 px-6 py-12 lg:flex-row">
          <div className="text-center lg:text-left">
            <span className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-[#c6f36b]/20 bg-[#c6f36b]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#c6f36b]">
              <PlayCircle size={13} /> Exclusive Access
            </span>
            <h3 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
              Stay ahead of the story<span className="text-[#c6f36b]">.</span>
            </h3>
            <p className="mt-1.5 text-sm text-zinc-400">
              Subscribe for premiere updates, weekly recommendations, and insider picks.
            </p>
          </div>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="group relative flex w-full max-w-md items-center"
          >
            <input
              type="email"
              placeholder="Enter your email address..."
              className="w-full rounded-xl border border-white/15 bg-white/5 py-3.5 pl-4 pr-28 text-sm text-white placeholder-zinc-500 outline-none transition-all duration-300 focus:border-[#c6f36b] focus:bg-black/60 focus:shadow-[0_0_20px_rgba(198,243,107,0.15)]"
              required
            />
            <button
              type="submit"
              className="absolute right-1.5 inline-flex items-center gap-1.5 rounded-lg bg-[#c6f36b] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#08090d] transition-all duration-300 hover:bg-[#d6ff8b] hover:shadow-[0_0_15px_rgba(198,243,107,0.4)] active:scale-95"
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
            className="group mb-4 inline-flex items-center gap-2.5 text-2xl font-black tracking-wider text-white"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#c6f36b]/30 bg-[#c6f36b]/10 text-[#c6f36b] transition-transform duration-300 group-hover:scale-105">
              <Clapperboard size={20} />
            </div>
            <span>
              NOIR<span className="text-[#c6f36b]">PLAY</span>
            </span>
          </Link>

          <p className="max-w-xs text-xs leading-relaxed text-zinc-400">
            Stories that stay with you. Discover extraordinary cinema, exclusive originals, and live broadcast events.
          </p>

          <div className="mt-5 flex items-center gap-2 text-xs font-medium text-zinc-400">
            <Globe size={14} className="text-[#c6f36b]" />
            <span>Global Streaming Available</span>
          </div>

          <div className="mt-6 h-[2px] w-10 rounded-full bg-gradient-to-r from-[#c6f36b] to-transparent" />
        </div>

        {/* Navigation Column */}
        <div>
          <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-white/90">
            Navigation
          </h3>

          <ul className="flex flex-col gap-2.5 text-sm text-zinc-400">
            {["Home", "Trending Now", "Live Broadcasts", "My Watchlist", "Noir Originals"].map((item, idx) => (
              <li key={idx}>
                <Link
                  to="/"
                  className="inline-block transition-all duration-200 hover:translate-x-1 hover:text-[#c6f36b]"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Genres Column */}
        <div>
          <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-white/90">
            Genres
          </h3>

          <ul className="flex flex-col gap-2.5 text-sm text-zinc-400">
            {[
              { name: "Action & Thriller", path: "/genre/action" },
              { name: "Sci-Fi & Fantasy", path: "/genre/sci-fi" },
              { name: "Drama & Crime", path: "/genre/drama" },
              { name: "Documentaries", path: "/genre/documentary" },
              { name: "Anime & Animation", path: "/genre/anime" },
            ].map((genre, idx) => (
              <li key={idx}>
                <Link
                  to={genre.path}
                  className="inline-block transition-all duration-200 hover:translate-x-1 hover:text-[#c6f36b]"
                >
                  {genre.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support Column */}
        <div>
          <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-white/90">
            Account & Support
          </h3>

          <ul className="flex flex-col gap-2.5 text-sm text-zinc-400">
            {[
              { name: "Sign In", path: "/login" },
              { name: "Create Account", path: "/signup" },
              { name: "Help Center", path: "/help" },
              { name: "Supported Devices", path: "/devices" },
              { name: "FAQ", path: "/faq" },
            ].map((link, idx) => (
              <li key={idx}>
                <Link
                  to={link.path}
                  className="inline-block transition-all duration-200 hover:translate-x-1 hover:text-[#c6f36b]"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social & Back To Top */}
        <div className="flex flex-col justify-between">
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-white/90">
              Follow the story
            </h3>

            <div className="flex items-center gap-3">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-400 transition-all duration-300 hover:border-[#c6f36b] hover:bg-[#c6f36b] hover:text-[#08090d] hover:shadow-[0_0_15px_rgba(198,243,107,0.3)]"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-400 transition-all duration-300 hover:border-[#c6f36b] hover:bg-[#c6f36b] hover:text-[#08090d] hover:shadow-[0_0_15px_rgba(198,243,107,0.3)]"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-400 transition-all duration-300 hover:border-[#c6f36b] hover:bg-[#c6f36b] hover:text-[#08090d] hover:shadow-[0_0_15px_rgba(198,243,107,0.3)]"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </a>
            </div>
          </div>

          <a
            href="#top"
            onClick={scrollToTop}
            className="group mt-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 transition hover:text-[#c6f36b]"
          >
            <span>Back to top</span>
            <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>

      {/* Bottom Sub-Footer Bar */}
      <div className="border-t border-white/10 bg-black/40 py-6">
        <div className="mx-auto flex max-w-full flex-col items-center justify-between gap-4 px-6 text-center text-xs text-zinc-500 sm:flex-row sm:text-left">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 sm:justify-start">
            <span>© {new Date().getFullYear()} Noir Play. Frontend demo.</span>
            <Link to="/privacy" className="transition hover:text-zinc-300">
              Privacy Policy
            </Link>
            <Link to="/terms" className="transition hover:text-zinc-300">
              Terms of Service
            </Link>
            <Link to="/cookies" className="transition hover:text-zinc-300">
              Cookie Preferences
            </Link>
          </div>

          <span className="flex items-center gap-1.5 font-bold tracking-widest text-zinc-400 uppercase">
            <span>MADE FOR MOVIE LOVERS</span>
            <span className="text-[#c6f36b]">✦</span>
          </span>
        </div>
      </div>
    </footer>
  );
}