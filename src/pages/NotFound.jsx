import { Link, useNavigate } from "react-router-dom";
import { Film, Home, RefreshCw, Sparkles, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

function addToWatchHistory(item) {
  try {
    const HISTORY_KEY = "noir_watch_history";
    const existing = JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
    const newEntry = {
      id: item.id || Date.now(),
      title: item.title || "Unknown Title",
      watchedAt: new Date().toISOString(),
      action: item.action || "played",
    };
    const updated = [newEntry, ...existing.filter((i) => i.id !== newEntry.id)];
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated.slice(0, 50)));
  } catch (error) {
    console.error("Failed to update history:", error);
  }
}

export default function NotFound() {
  const navigate = useNavigate();

  const handleReturnHome = () => {
    addToWatchHistory({
      id: "404-navigation",
      title: "Returned to Home from 404",
      action: "navigation",
    });
    navigate("/");
  };

  const handleReload = () => {
    addToWatchHistory({
      id: `reload-${Date.now()}`,
      title: "Reloaded 404 Page",
      action: "retry",
    });
    window.location.reload();
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#070709] px-4 py-12 text-white selection:bg-[#c6f36b] selection:text-black sm:px-6">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 left-1/2 h-[450px] w-[450px] -translate-x-1/2 rounded-full bg-[#c6f36b]/15 blur-[140px]" />
        <div className="absolute -bottom-32 left-1/4 h-[350px] w-[350px] rounded-full bg-purple-600/10 blur-[130px]" />

        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center shadow-[0_0_80px_rgba(0,0,0,0.8)] backdrop-blur-2xl sm:p-12 md:p-16"
      >
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#c6f36b] to-transparent opacity-70" />

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-[#c6f36b]/30 bg-[#c6f36b]/10 px-4 py-1.5 text-xs font-semibold tracking-widest text-[#c6f36b] backdrop-blur-md"
        >
          <Sparkles className="h-3.5 w-3.5 animate-pulse" />
          <span>SIGNAL LOST — CUT 404</span>
        </motion.div>

        <div className="relative my-6 flex justify-center">
          <h1 className="select-none font-black tracking-tighter text-white/[0.04] text-8xl sm:text-9xl md:text-[11rem]">
            404
          </h1>

          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [0, 2, 0, -2, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 m-auto flex h-24 w-24 items-center justify-center rounded-3xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 p-4 shadow-2xl backdrop-blur-xl sm:h-28 sm:w-28"
          >
            <Film className="h-12 w-12 text-[#c6f36b] sm:h-14 sm:w-14" strokeWidth={1.25} />
            <div className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-[#c6f36b] text-black shadow-lg">
              <AlertTriangle className="h-4 w-4" />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            This Reel Couldn't Be Found
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-zinc-400 sm:text-base">
            The story you are looking for has been moved, removed, or never existed in this timeline.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-8 flex flex-col items-center justify-center gap-3.5 sm:flex-row"
        >
          <button
            onClick={handleReturnHome}
            className="group relative inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#c6f36b] px-7 py-3.5 text-sm font-bold text-black transition-all duration-300 hover:bg-[#d5ff7c] hover:shadow-[0_0_25px_rgba(198,243,107,0.4)] sm:w-auto"
          >
            <Home className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
            <span>Return to Home</span>
          </button>

          <button
            onClick={handleReload}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-semibold text-zinc-300 transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white sm:w-auto"
          >
            <RefreshCw className="h-4 w-4 transition-transform group-hover:rotate-180" />
            <span>Try Again</span>
          </button>
        </motion.div>

        <div className="mt-12 border-t border-white/10 pt-6">
          <p className="flex items-center justify-center gap-2 text-xs font-semibold tracking-widest text-zinc-500 uppercase">
            <span>NOIR<span className="text-[#c6f36b]">PLAY</span></span>
            <span className="text-zinc-700">•</span>
            <span>CINEMATIC ARCHIVE</span>
          </p>
        </div>
      </motion.div>
    </main>
  );
}