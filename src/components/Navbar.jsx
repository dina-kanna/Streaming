
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {Menu, X, UserRound,Bookmark,Clapperboard,Film,Tv,Flame, Clock3,} from "lucide-react";
import SearchBar from "./SearchBar.jsx";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const navItems = [
    { label: "Home", to: "/", end: true, icon: Clapperboard },
    { label: "Movies", to: "/movies", icon: Film },
    { label: "TV Shows", to: "/tv-shows", icon: Tv },
    { label: "Trending", to: "/trending", icon: Flame },
    { label: "My List", to: "/my-list", icon: Bookmark },
  ];

  const closeMenu = () => setMenuOpen(false);

  const handleSearchToggle = () => {
    if (searchOpen && query.trim()) {
      window.dispatchEvent(
        new CustomEvent("noir-search", {
          detail: query.trim(),
        })
      );
    }

    setSearchOpen((current) => !current);
  };

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-1.5 whitespace-nowrap rounded-lg px-2 py-2 text-xs font-semibold transition-colors xl:gap-2 xl:px-2.5 xl:text-sm ${
      isActive
        ? "bg-[#c6f36b]/10 text-[#c6f36b]"
        : "text-gray-300 hover:bg-white/5 hover:text-[#c6f36b]"
    }`;

  const mobileLinkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
      isActive
        ? "bg-[#c6f36b]/10 text-[#c6f36b]"
        : "text-gray-300 hover:bg-white/5 hover:text-[#c6f36b]"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#09090b]/95 text-white shadow-lg shadow-black/20 backdrop-blur-xl">
      <div className="mx-auto flex min-h-[64px] max-w-full items-center justify-between gap-2 px-3 sm:min-h-[70px] sm:px-5 lg:px-7 xl:px-10">
        <Link
          to="/"
          onClick={closeMenu}
          aria-label="Noir Play Home"
          className="flex shrink-0 items-center gap-1.5"
        >
          <Clapperboard
            size={23}
            className="shrink-0 text-[#c6f36b] sm:size-6"
          />
          <span className="whitespace-nowrap text-base font-extrabold tracking-tight sm:text-xl">
            NOIR<span className="text-[#c6f36b]">PLAY</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 min-[600px]:flex lg:gap-1.5 xl:gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.label}
                to={item.to}
                end={item.end}
                onClick={closeMenu}
                className={navLinkClass}
              >
                <Icon size={15} className="shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <SearchBar
            value={query}
            onChange={setQuery}
            open={searchOpen}
            onToggle={handleSearchToggle}
          />

          <NavLink
            to="/profile"
            aria-label="Profile"
            className={({ isActive }) =>
              `flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition sm:h-10 sm:w-10 min-[600px]:hidden ${
                isActive
                  ? "border-[#c6f36b] bg-[#c6f36b] text-[#09090b]"
                  : "border-white/10 bg-white/5 text-gray-300 hover:text-[#c6f36b]"
              }`
            }
          >
            <UserRound size={17} />
          </NavLink>

          <NavLink
            to="/profile"
            aria-label="Profile"
            className={({ isActive }) =>
              `hidden h-9 w-9 shrink-0 items-center justify-center rounded-full border transition min-[600px]:flex ${
                isActive
                  ? "border-[#c6f36b] bg-[#c6f36b] text-[#09090b]"
                  : "border-white/10 bg-white/5 text-gray-300 hover:border-[#c6f36b]/50 hover:text-[#c6f36b]"
              }`
            }
          >
            <UserRound size={18} />
          </NavLink>
          <Link
            to="/login"
            className="hidden whitespace-nowrap rounded-full bg-[#c6f36b] px-3 py-2.5 text-xs font-bold text-[#09090b] transition hover:bg-[#d5ff85] xl:inline-flex"
          >
            Sign In
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen((current) => !current)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="noir-mobile-navigation"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-[#c6f36b]/50 hover:text-[#c6f36b] min-[600px]:hidden sm:h-10 sm:w-10"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <div
        id="noir-mobile-navigation"
        aria-hidden={!menuOpen}
        className={`grid overflow-hidden border-t border-white/10 bg-[#09090b] transition-[grid-template-rows,opacity] duration-300 min-[600px]:hidden ${
          menuOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <nav className="min-h-0 overflow-hidden">
          <div className="flex flex-col gap-1 px-4 py-3">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.label}
                  to={item.to}
                  end={item.end}
                  onClick={closeMenu}
                  tabIndex={menuOpen ? 0 : -1}
                  className={mobileLinkClass}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}

            <NavLink
              to="/profile"
              onClick={closeMenu}
              tabIndex={menuOpen ? 0 : -1}
              className={mobileLinkClass}
            >
              <UserRound size={18} />
              Profile
            </NavLink>

            <Link
              to="/login"
              onClick={closeMenu}
              tabIndex={menuOpen ? 0 : -1}
              className="mt-2 rounded-xl bg-[#c6f36b] px-4 py-3 text-center text-sm font-bold text-[#09090b] transition hover:bg-[#d5ff85]"
            >
              Sign In
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
