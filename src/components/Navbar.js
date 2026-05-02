import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { clearAuthState } from "../api";

const defaultProfile = {
  name: "Affroj Shaik",
  email: "affroj@example.com",
  course: "B.Tech CSE",
  year: "3rd Year",
  status: "Active"
};

const publicLinks = [
  { to: "/", label: "Home" },
  { to: "/resources", label: "Resources" },
  { to: "/programs", label: "Programs" },
  { to: "/support", label: "Support" }
];

function readStoredProfile() {
  const rawProfile = localStorage.getItem("studentProfile");

  if (!rawProfile) {
    return defaultProfile;
  }

  try {
    return { ...defaultProfile, ...JSON.parse(rawProfile) };
  } catch {
    return defaultProfile;
  }
}

function getInitials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("");
}

function Navbar({ darkMode, onToggleTheme }) {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem("isLoggedIn") === "true"
  );
  const [showProfile, setShowProfile] = useState(false);
  const [profile, setProfile] = useState(readStoredProfile);

  useEffect(() => {
    const syncAuth = () => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
      setProfile(readStoredProfile());
    };

    window.addEventListener("authchange", syncAuth);
    window.addEventListener("storage", syncAuth);

    return () => {
      window.removeEventListener("authchange", syncAuth);
      window.removeEventListener("storage", syncAuth);
    };
  }, []);

  const navLinks = isLoggedIn
    ? [...publicLinks, { to: "/dashboard", label: "Dashboard" }]
    : publicLinks;

  const handleLogout = () => {
    clearAuthState();
    setShowProfile(false);
    navigate("/");
  };

  return (
    <header className="site-nav">
      <div className="page-shell site-nav-inner">
        <NavLink className="nav-brand" to="/">
          <span className="nav-brand-mark">W</span>

          <span className="nav-brand-copy">
            <strong>Wellness Portal</strong>
            <span>Student care platform</span>
          </span>
        </NavLink>

        <nav className="nav-menu">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              className={({ isActive }) =>
                `nav-link-pill${isActive ? " active" : ""}`
              }
              end={link.to === "/"}
              to={link.to}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav-actions">
          <button className="theme-toggle" onClick={onToggleTheme} type="button">
            {darkMode ? "Light" : "Dark"}
          </button>

          {!isLoggedIn ? (
            <>
              <NavLink className="nav-cta nav-cta-secondary" to="/login">
                Login
              </NavLink>
              <NavLink className="nav-cta nav-cta-primary" to="/register">
                Register
              </NavLink>
              <NavLink className="nav-cta nav-cta-ghost" to="/admin">
                Admin
              </NavLink>
            </>
          ) : (
            <>
              <button
                className="profile-trigger"
                onClick={() => setShowProfile((current) => !current)}
                type="button"
              >
                <span className="profile-avatar">{getInitials(profile.name)}</span>
                <span>{profile.name}</span>
              </button>

              <button
                className="nav-cta nav-cta-ghost"
                onClick={handleLogout}
                type="button"
              >
                Log out
              </button>
            </>
          )}

          {showProfile && (
            <div className="profile-panel premium-card">
              <div className="profile-panel-header">
                <div>
                  <h3>{profile.name}</h3>
                  <p>{profile.email}</p>
                </div>

                <span className="status-badge success">{profile.status}</span>
              </div>

              <div className="profile-detail-grid">
                <div className="profile-detail">
                  <span>Program</span>
                  <strong>{profile.course}</strong>
                </div>

                <div className="profile-detail">
                  <span>Academic year</span>
                  <strong>{profile.year}</strong>
                </div>
              </div>

              <div className="form-actions" style={{ marginTop: "16px" }}>
                <NavLink
                  className="secondary-btn"
                  onClick={() => setShowProfile(false)}
                  to="/dashboard"
                >
                  Open dashboard
                </NavLink>

                <button className="ghost-btn" onClick={handleLogout} type="button">
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
