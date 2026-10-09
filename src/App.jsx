
import { Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";

import Home from "./pages/Home.jsx";
import Movies from "./pages/Movies.jsx";
import TVShows from "./pages/TVShows.jsx";
import Trending from "./pages/Trending.jsx";
import MoviePage from "./pages/MoviePage.jsx";
import MyList from "./pages/MyList.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Profile from "./pages/Profile.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50 font-sans text-gray-900 transition-colors duration-300 dark:bg-[#09090b] dark:text-white">
      <ScrollToTop />

      <Navbar />

      <main className="mx-auto w-full max-w-[1500px] flex-1 px-4 py-6 transition-colors duration-300 sm:px-6 lg:px-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movie/:id" element={<MoviePage />} />
          <Route path="/tv-shows" element={<TVShows />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/my-list" element={<MyList />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
