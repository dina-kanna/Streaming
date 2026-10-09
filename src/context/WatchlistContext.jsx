
import {createContext,useContext, useEffect, useState,} from "react";

const WatchlistContext = createContext(null);

export function WatchlistProvider({ children }) {
  const [watchlist, setWatchlist] = useState(() => {
    try {
      const stored = localStorage.getItem("noir-watchlist");
      const parsed = JSON.parse(stored || "[]");

      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(
        "noir-watchlist",
        JSON.stringify(watchlist)
      );
    } catch {
    }
  }, [watchlist]);

  function toggleWatchlist(movie) {
    setWatchlist((current) =>
      current.some((item) => item.id === movie.id)
        ? current.filter((item) => item.id !== movie.id)
        : [...current, movie]
    );
  }

  function isInWatchlist(id) {
    return watchlist.some((movie) => movie.id === id);
  }

  return (
    <WatchlistContext.Provider
      value={{
        watchlist,
        toggleWatchlist,
        isInWatchlist,
      }}
    >
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  const context = useContext(WatchlistContext);

  if (!context) {
    throw new Error(
      "useWatchlist must be used within WatchlistProvider"
    );
  }

  return context;
}
