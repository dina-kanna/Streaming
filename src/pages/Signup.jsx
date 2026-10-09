
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Clapperboard, Eye, EyeOff, UserRound, Mail, LockKeyhole, Sparkles,} from "lucide-react";
import { motion } from "framer-motion";

export default function Signup() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (form.name.trim().length < 2) {
      setError("Your name must contain at least 2 characters.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Enter a valid email address.");
      return;
    }

    if (form.password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Your passwords do not match.");
      return;
    }

    navigate("/login");
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#09090b] px-4 py-12 text-white sm:px-6">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#c6f36b]/10 blur-[120px]" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-purple-500/10 blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-lg rounded-2xl border border-white/10 bg-[#141620]/90 p-6 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-9"
      >
        {/* Brand */}
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 font-display text-xl font-bold tracking-tight transition-opacity hover:opacity-80"
        >
          <Clapperboard size={27} className="text-[#c6f36b]" />
          NOIR<span className="text-[#c6f36b]">PLAY</span>
        </Link>

        {/* Heading */}
        <div className="mb-7">
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-[#c6f36b]">
            <Sparkles size={15} />
            JOIN THE EXPERIENCE
          </span>

          <h1 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Create account<span className="text-[#c6f36b]">.</span>
          </h1>

          <p className="mt-3 text-sm leading-6 text-gray-400 sm:text-base">
            Discover a world of stories made for you.
          </p>
        </div>

        {/* Full name */}
        <div className="mb-5">
          <label
            htmlFor="signup-name"
            className="mb-2 block text-sm font-medium text-gray-200"
          >
            Full name
          </label>

          <div className="flex items-center rounded-lg border border-white/10 bg-black/30 transition focus-within:border-[#c6f36b]/70 focus-within:ring-2 focus-within:ring-[#c6f36b]/10">
            <UserRound
              size={18}
              className="ml-4 shrink-0 text-gray-500"
            />

            <input
              id="signup-name"
              type="text"
              autoComplete="name"
              placeholder="Your name"
              value={form.name}
              onChange={(event) =>
                setForm({ ...form, name: event.target.value })
              }
              required
              minLength={2}
              className="min-w-0 flex-1 bg-transparent px-3 py-3.5 text-sm text-white outline-none placeholder:text-gray-600"
            />
          </div>
        </div>
        <div className="mb-5">
          <label
            htmlFor="signup-email"
            className="mb-2 block text-sm font-medium text-gray-200"
          >
            Email address
          </label>

          <div className="flex items-center rounded-lg border border-white/10 bg-black/30 transition focus-within:border-[#c6f36b]/70 focus-within:ring-2 focus-within:ring-[#c6f36b]/10">
            <Mail size={18} className="ml-4 shrink-0 text-gray-500" />

            <input
              id="signup-email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(event) =>
                setForm({ ...form, email: event.target.value })
              }
              required
              className="min-w-0 flex-1 bg-transparent px-3 py-3.5 text-sm text-white outline-none placeholder:text-gray-600"
            />
          </div>
        </div>

        <div className="mb-5">
          <label
            htmlFor="signup-password"
            className="mb-2 block text-sm font-medium text-gray-200"
          >
            Password
          </label>

          <div className="flex items-center rounded-lg border border-white/10 bg-black/30 transition focus-within:border-[#c6f36b]/70 focus-within:ring-2 focus-within:ring-[#c6f36b]/10">
            <LockKeyhole
              size={18}
              className="ml-4 shrink-0 text-gray-500"
            />

            <input
              id="signup-password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="At least 8 characters"
              value={form.password}
              onChange={(event) =>
                setForm({ ...form, password: event.target.value })
              }
              required
              minLength={8}
              className="min-w-0 flex-1 bg-transparent px-3 py-3.5 text-sm text-white outline-none placeholder:text-gray-600"
            />

            <button
              type="button"
              onClick={() => setShowPassword((current) => !current)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
              className="mr-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-gray-400 transition hover:bg-white/10 hover:text-[#c6f36b]"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div className="mb-5">
          <label
            htmlFor="signup-confirm"
            className="mb-2 block text-sm font-medium text-gray-200"
          >
            Confirm password
          </label>

          <div className="flex items-center rounded-lg border border-white/10 bg-black/30 transition focus-within:border-[#c6f36b]/70 focus-within:ring-2 focus-within:ring-[#c6f36b]/10">
            <LockKeyhole
              size={18}
              className="ml-4 shrink-0 text-gray-500"
            />

            <input
              id="signup-confirm"
              type={showConfirmPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Repeat your password"
              value={form.confirmPassword}
              onChange={(event) =>
                setForm({
                  ...form,
                  confirmPassword: event.target.value,
                })
              }
              required
              className="min-w-0 flex-1 bg-transparent px-3 py-3.5 text-sm text-white outline-none placeholder:text-gray-600"
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword((current) => !current)
              }
              aria-label={
                showConfirmPassword
                  ? "Hide confirmation password"
                  : "Show confirmation password"
              }
              aria-pressed={showConfirmPassword}
              className="mr-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-gray-400 transition hover:bg-white/10 hover:text-[#c6f36b]"
            >
              {showConfirmPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>
        </div>

        {error && (
          <p
            role="alert"
            className="mb-4 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2.5 text-sm text-red-400"
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-[#c6f36b] px-5 py-3.5 text-sm font-bold text-[#09090b] shadow-lg shadow-[#c6f36b]/10 transition duration-300 hover:-translate-y-0.5 hover:bg-[#d6ff8b] hover:shadow-[#c6f36b]/20 active:translate-y-0"
        >
          Create account
        </button>

        <p className="mt-7 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-[#c6f36b] transition hover:text-[#d6ff8b] hover:underline"
          >
            Sign in
          </Link>
        </p>

       <p className="mt-6 border-t border-white/10 pt-5 text-center text-xs leading-5 text-gray-500">
  Noir Play Demo — no real credentials or sensitive data required.
</p>
      </motion.form>
    </main>
  );
}
