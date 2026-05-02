import { useEffect, useState } from "react";
import { apiFetch, isAuthenticated } from "../api";

function readStoredProfile() {
  const rawProfile = localStorage.getItem("studentProfile");

  if (!rawProfile) {
    return null;
  }

  try {
    return JSON.parse(rawProfile);
  } catch {
    return null;
  }
}

function Users() {
  const [profile, setProfile] = useState(readStoredProfile);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isAuthenticated()) {
      setLoading(false);
      return;
    }

    apiFetch("/auth/me")
      .then((data) => {
        setProfile(data);
        localStorage.setItem("studentProfile", JSON.stringify(data));
        localStorage.setItem("user", JSON.stringify(data));
      })
      .catch((err) => {
        setError(err.message || "Unable to load your profile right now.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="page-shell">
      <section className="premium-card auth-card">
        <span className="mini-kicker">Profile</span>
        <h2>Your saved user details</h2>

        {loading ? <p>Loading your profile...</p> : null}
        {!loading && error ? <p>{error}</p> : null}

        {!loading && !profile ? (
          <p>No profile details are available yet. Register or log in first.</p>
        ) : null}

        {!loading && profile ? (
          <div className="profile-detail-grid">
            <div className="profile-detail">
              <span>Name</span>
              <strong>{profile.name || "Student User"}</strong>
            </div>
            <div className="profile-detail">
              <span>Email</span>
              <strong>{profile.email || "Not available"}</strong>
            </div>
            <div className="profile-detail">
              <span>Course</span>
              <strong>{profile.course || "Not available"}</strong>
            </div>
            <div className="profile-detail">
              <span>Academic year</span>
              <strong>{profile.year || "Not available"}</strong>
            </div>
          </div>
        ) : null}
      </section>
    </div>
  );
}

export default Users;
