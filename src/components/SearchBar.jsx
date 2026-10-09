
import { Search, X } from "lucide-react";

export default function SearchBar({
  value,
  onChange,
  open,
  onToggle,
}) {
  return (
    <div
      className={`flex items-center gap-2 rounded-full border transition-all duration-300 ${
        open
          ? "w-full border-[#c6f36b]/50 bg-[#141620] px-3 sm:w-72"
          : "w-10 border-transparent bg-transparent"
      }`}
    >
      {open && (
        <input
          autoFocus
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Search movies and series..."
          aria-label="Search movies and series"
          className="min-w-0 flex-1 bg-transparent py-2 text-sm text-white outline-none placeholder:text-gray-500"
        />
      )}

      <button
        type="button"
        onClick={onToggle}
        aria-label={open ? "Close search" : "Open search"}
        aria-expanded={open}
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors duration-200 ${
          open
            ? "text-[#c6f36b] hover:bg-white/10"
            : "text-gray-300 hover:bg-white/10 hover:text-[#c6f36b]"
        }`}
      >
        {open ? <X size={20} /> : <Search size={20} />}
      </button>
    </div>
  );
}
