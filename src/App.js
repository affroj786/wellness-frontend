import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";

import Navbar from "./components/Navbar";
import Admin from "./pages/Admin";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Programs from "./pages/Programs";
import Register from "./pages/Register";
import Resources from "./pages/Resources";
import Support from "./pages/Support";
import Users from "./pages/Users";

function App() {
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <BrowserRouter>
      <div className={`app-shell ${darkMode ? "theme-dark" : "theme-light"}`}>
        <div className="app-backdrop app-backdrop-top" />
        <div className="app-backdrop app-backdrop-bottom" />

        <Navbar
          darkMode={darkMode}
          onToggleTheme={() => setDarkMode((current) => !current)}
        />

        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/users" element={<Users />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/support" element={<Support />} />
            <Route path="/admin" element={<Admin />} />
            
          </Routes>
        </main>

        <footer className="app-footer">
          <div className="page-shell footer-content premium-card">
            <div>
              <p className="footer-brand">Wellness Portal</p>
              <p className="footer-copy">
                A calm, premium student wellness experience for mental health,
                fitness, and support services.
              </p>
            </div>

            <p className="footer-meta">
              2026 Student Health and Wellness Platform. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
