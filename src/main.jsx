import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { WatchlistProvider } from "./context/WatchlistContext.jsx";
import "./index.css";


createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <WatchlistProvider>
          <App />
        </WatchlistProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);