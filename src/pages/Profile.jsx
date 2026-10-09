import { useState } from "react";
import { Link } from "react-router-dom";
import { UserRound, Mail, CalendarDays, Film,Bookmark,Settings,Pencil, Check, X,LogOut,ShieldCheck,} from "lucide-react";
import { useTheme } from "../context/ThemeContext.jsx";
import { useWatchlist } from "../context/WatchlistContext.jsx";

export default function Profile() {
  const { darkMode } = useTheme();
  const { watchlist = [] } = useWatchlist();

  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Dinesh G",
    email: "dina@noirplay.com",
    username: "@dina342",
    joined: "October 2025",
    language: "Tamil, English",
    plan: "Free Plan",
  });
  const [formData, setFormData] = useState(profile);

  const cardClass = darkMode
    ? "border-white/10 bg-[#141620] text-white"
    : "border-gray-200 bg-white text-gray-900";

  const mutedText = darkMode ? "text-gray-400" : "text-gray-500";

  const inputClass = `w-full rounded-xl border px-4 py-3 outline-none transition focus:border-[#c6f36b] ${
    darkMode
      ? "border-white/10 bg-black/20 text-white"
      : "border-gray-200 bg-gray-50 text-gray-900"
  }`;

  const handleSave = (event) => {
    event.preventDefault();
    setProfile(formData);
    setEditing(false);
  };

  const handleCancel = () => {
    setFormData(profile);
    setEditing(false);
  };

  return (
    <main
      className={`min-h-screen px-4 py-0 transition-colors sm:px-6 lg:px-10 ${
        darkMode ? "bg-[#09090b]" : "bg-gray-50"
      }`}
    >
      <div className="mx-auto max-w-full">
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-[#91bd45]">
            Your account
          </p>
          <h1 className="text-3xl font-bold sm:text-4xl">My Profile</h1>
          <p className={`mt-2 ${mutedText}`}>
            Manage your account and personalize your Noir Play experience.
          </p>
        </div>

        <section
          className={`mb-6 overflow-hidden rounded-3xl border ${cardClass}`}
        >
          <div className="h-36 bg-gradient-to-r from-[#243a22] via-[#526b31] to-[#c6f36b]" />

          <div className="px-5 pb-6 sm:px-8">
            <div className="-mt-12 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex items-end gap-4">
                <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-[#141620] bg-[#c6f36b] text-[#09090b] shadow-xl">
                  <UserRound size={43} />
                </div>

                <div className="pb-1">
                  <h2 className="text-2xl font-bold">{profile.name}</h2>
                  <p className={mutedText}>{profile.username}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setFormData(profile);
                  setEditing(true);
                }}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#c6f36b] px-5 py-3 font-bold text-[#09090b] transition hover:bg-[#d5ff85]"
              >
                <Pencil size={17} />
                Edit Profile
              </button>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#c6f36b]/10 px-4 py-2 text-sm font-semibold text-[#91bd45]">
                <ShieldCheck size={16} />
                {profile.plan}
              </span>

              <span
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm ${mutedText} ${
                  darkMode ? "bg-white/5" : "bg-gray-100"
                }`}
              >
                <CalendarDays size={16} />
                Joined {profile.joined}
              </span>
            </div>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-3">
          <section
            className={`rounded-3xl border p-6 sm:p-8 lg:col-span-2 ${cardClass}`}
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-[#c6f36b]/10 p-3 text-[#91bd45]">
                <UserRound size={21} />
              </div>
              <div>
                <h2 className="text-xl font-bold">Personal Information</h2>
                <p className={`text-sm ${mutedText}`}>
                  Your account details
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <p className={`mb-2 text-sm ${mutedText}`}>Full Name</p>
                <div className="flex items-center gap-3">
                  <UserRound size={18} className={mutedText} />
                  <p className="font-semibold">{profile.name}</p>
                </div>
              </div>

              <div className="border-t border-dashed border-gray-500/20 pt-5">
                <p className={`mb-2 text-sm ${mutedText}`}>Email Address</p>
                <div className="flex items-center gap-3">
                  <Mail size={18} className={mutedText} />
                  <p className="break-all font-semibold">{profile.email}</p>
                </div>
              </div>

              <div className="border-t border-dashed border-gray-500/20 pt-5">
                <p className={`mb-2 text-sm ${mutedText}`}>Preferred Language</p>
                <p className="font-semibold">{profile.language}</p>
              </div>

              <div className="border-t border-dashed border-gray-500/20 pt-5">
                <p className={`mb-2 text-sm ${mutedText}`}>Membership</p>
                <p className="font-semibold">{profile.plan}</p>
              </div>
            </div>
          </section>

          <div className="space-y-6">
            <section className={`rounded-3xl border p-6 ${cardClass}`}>
              <div className="mb-5 flex items-center gap-3">
                <div className="rounded-xl bg-[#c6f36b]/10 p-3 text-[#91bd45]">
                  <Bookmark size={21} />
                </div>
                <div>
                  <p className={`text-sm ${mutedText}`}>Saved movies</p>
                  <h3 className="text-2xl font-bold">{watchlist.length}</h3>
                </div>
              </div>

              <p className={`mb-5 text-sm ${mutedText}`}>
                Keep track of the movies you want to watch.
              </p>

              <Link
                to="/my-list"
                className="inline-flex items-center gap-2 font-semibold text-[#91bd45] transition hover:text-[#c6f36b]"
              >
                View My List <Film size={17} />
              </Link>
            </section>

            <section className={`rounded-3xl border p-6 ${cardClass}`}>
              <div className="mb-4 flex items-center gap-3">
                <Settings className="text-[#91bd45]" size={21} />
                <h3 className="text-lg font-bold">Account Settings</h3>
              </div>

              <p className={`mb-5 text-sm ${mutedText}`}>
                Update your details or return to the home page to discover
                more movies.
              </p>

              <Link
                to="/"
                className="block rounded-xl border border-[#c6f36b]/30 px-4 py-3 text-center font-semibold transition hover:bg-[#c6f36b]/10"
              >
                Explore Movies
              </Link>
            </section>
          </div>
        </div>
      </div>

      {editing && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={handleCancel}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="edit-profile-title"
            className={`w-full max-w-lg rounded-3xl border p-6 shadow-2xl sm:p-8 ${cardClass}`}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 id="edit-profile-title" className="text-2xl font-bold">
                  Edit Profile
                </h2>
                <p className={`mt-1 text-sm ${mutedText}`}>
                  Update your personal details.
                </p>
              </div>

              <button
                type="button"
                onClick={handleCancel}
                aria-label="Close edit profile"
                className="rounded-full p-2 transition hover:bg-gray-500/10"
              >
                <X size={21} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <label className="block text-sm font-medium">
                Full Name
                <input
                  className={`mt-2 ${inputClass}`}
                  value={formData.name}
                  onChange={(event) =>
                    setFormData({ ...formData, name: event.target.value })
                  }
                  required
                />
              </label>

              <label className="block text-sm font-medium">
                Email Address
                <input
                  type="email"
                  className={`mt-2 ${inputClass}`}
                  value={formData.email}
                  onChange={(event) =>
                    setFormData({ ...formData, email: event.target.value })
                  }
                  required
                />
              </label>

              <label className="block text-sm font-medium">
                Username
                <input
                  className={`mt-2 ${inputClass}`}
                  value={formData.username}
                  onChange={(event) =>
                    setFormData({ ...formData, username: event.target.value })
                  }
                  required
                />
              </label>

              <label className="block text-sm font-medium">
                Preferred Language
                <select
                  className={`mt-2 ${inputClass}`}
                  value={formData.language}
                  onChange={(event) =>
                    setFormData({ ...formData, language: event.target.value })
                  }
                >
                  <option>English</option>
                  <option>Tamil</option>
                  <option>Malayalam</option>
                  <option>Hindi</option>
                  <option>Telugu</option>
                </select>
              </label>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={handleCancel}
                  className={`flex-1 rounded-xl border px-4 py-3 font-semibold transition ${
                    darkMode
                      ? "border-white/10 hover:bg-white/5"
                      : "border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#c6f36b] px-4 py-3 font-bold text-[#09090b] transition hover:bg-[#d5ff85]"
                >
                  <Check size={18} />
                  Save Changes
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </main>
  );
}