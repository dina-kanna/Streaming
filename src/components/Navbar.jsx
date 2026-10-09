
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, UserRound, Bookmark, Clapperboard,Film,Tv,Flame,Moon, Sun,} from "lucide-react";

import SearchBar from "./SearchBar.jsx";
import { useTheme } from "../context/ThemeContext.jsx";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const { darkMode, toggleTheme } = useTheme();

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
        ? "bg-green-600/10 text-green-800 dark:bg-[#c6f36b]/10 dark:text-[#c6f36b]"
        : "text-gray-600 hover:bg-gray-200 hover:text-green-800 dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-[#c6f36b]"
    }`;

  const mobileLinkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
      isActive
        ? "bg-green-600/10 text-green-800 dark:bg-[#c6f36b]/10 dark:text-[#c6f36b]"
        : "text-gray-600 hover:bg-gray-200 hover:text-green-800 dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-[#c6f36b]"
    }`;

  const profileClass = ({ isActive }) =>
    `flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition ${
      isActive
        ? "border-green-700 bg-green-700 text-white dark:border-[#c6f36b] dark:bg-[#c6f36b] dark:text-[#09090b]"
        : "border-gray-300 bg-gray-100 text-gray-600 hover:border-green-600 hover:text-green-800 dark:border-white/10 dark:bg-white/5 dark:text-gray-300 dark:hover:border-[#c6f36b]/50 dark:hover:text-[#c6f36b]"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 text-gray-900 shadow-lg shadow-gray-200/30 backdrop-blur-xl transition-colors duration-300 dark:border-white/10 dark:bg-[#09090b]/95 dark:text-white dark:shadow-black/20">
      <div className="mx-auto flex min-h-[64px] max-w-full items-center justify-between gap-2 px-3 sm:min-h-[70px] sm:px-5 lg:px-7 xl:px-10">
        {/* Logo */}
        <Link
          to="/"
          onClick={closeMenu}
          aria-label="Noir Play Home"
          className="flex shrink-0 items-center gap-1.5"
        >
          <Clapperboard
            size={23}
            className="shrink-0 text-green-700 dark:text-[#c6f36b] sm:size-6"
          />

          <span className="whitespace-nowrap text-base font-extrabold tracking-tight sm:text-xl">
            NOIR
            <span className="text-green-700 dark:text-[#c6f36b]">
              PLAY
            </span>
          </span>
        </Link>

        {/* Desktop and Tablet Navigation */}
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

        {/* Search and Actions */}
        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <SearchBar
            value={query}
            onChange={setQuery}
            open={searchOpen}
            onToggle={handleSearchToggle}
          />

          {/* Dark / Light Mode Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              darkMode ? "Switch to light mode" : "Switch to dark mode"
            }
            aria-pressed={darkMode}
            title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gray-300 bg-gray-100 text-green-800 transition hover:bg-gray-200 dark:border-white/10 dark:bg-white/5 dark:text-[#c6f36b] dark:hover:bg-white/10 sm:h-10 sm:w-10"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Mobile Profile */}
          <NavLink
            to="/profile"
            aria-label="Profile"
            className={({ isActive }) =>
              `${profileClass({ isActive })} h-8 w-8 sm:h-10 sm:w-10 min-[600px]:hidden`
            }
          >
            <UserRound size={17} />
          </NavLink>

          {/* Tablet and Desktop Profile */}
          <NavLink
            to="/profile"
            aria-label="Profile"
            className={({ isActive }) =>
              `hidden min-[600px]:flex ${profileClass({ isActive })}`
            }
          >
            <UserRound size={18} />
          </NavLink>

          {/* Tablet and Desktop Sign In */}
          <Link
            to="/login"
            className="hidden whitespace-nowrap rounded-full bg-green-700 px-2.5 py-2 text-xs font-bold text-white transition hover:bg-green-800 dark:bg-[#c6f36b] dark:text-[#09090b] dark:hover:bg-[#d5ff85] min-[600px]:inline-flex xl:px-4 xl:py-2.5 xl:text-sm"
          >
            Sign In
          </Link>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMenuOpen((current) => !current)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="noir-mobile-navigation"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gray-300 bg-gray-100 text-gray-800 transition hover:border-green-600 hover:text-green-800 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:border-[#c6f36b]/50 dark:hover:text-[#c6f36b] min-[600px]:hidden sm:h-10 sm:w-10"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        id="noir-mobile-navigation"
        aria-hidden={!menuOpen}
        className={`grid overflow-hidden border-t border-gray-200 bg-white transition-[grid-template-rows,opacity] duration-300 dark:border-white/10 dark:bg-[#09090b] min-[600px]:hidden ${
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
              className="mt-2 rounded-xl bg-green-700 px-4 py-3 text-center text-sm font-bold text-white transition hover:bg-green-800 dark:bg-[#c6f36b] dark:text-[#09090b] dark:hover:bg-[#d5ff85]"
            >
              Sign In
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
