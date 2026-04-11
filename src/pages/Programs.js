import { useState, useEffect } from "react";
import { apiFetch, isAuthenticated } from "../api";

function Programs() {
  const [joinedPrograms, setJoinedPrograms] = useState({});
  const [programCatalog, setProgramCatalog] = useState([]);

  useEffect(() => {
    // Fetch available programs
    apiFetch('/programs').then(data => setProgramCatalog(data)).catch(console.error);
    
    // Fetch enrollments if logged in
    if (isAuthenticated()) {
      apiFetch('/user/enrollments').then(data => setJoinedPrograms(data)).catch(console.error);
    }
  }, []);

  const joinedCount = Object.values(joinedPrograms).filter(Boolean).length;

  const toggleProgram = async (id) => {
    if (!isAuthenticated()) {
        alert("Please login to join programs.");
        return;
    }
    
    try {
        const result = await apiFetch(`/programs/${id}/enroll`, { method: 'POST' });
        setJoinedPrograms((current) => ({
            ...current,
            [id]: result.enrolled
        }));
    } catch (error) {
        console.error("Failed to enroll", error);
    }
  };

  return (
    <div className="page-shell">
      <section className="hero-panel">
        <div className="hero-grid">
          <div className="hero-copy">
            <span className="hero-eyebrow">Program catalog</span>
            <h1>Structured wellness programs with a premium enrollment flow.</h1>
            <p>
              Students can now browse programs in a more credible, product-like
              layout with clear scheduling cues and stronger calls to action.
            </p>

            <div className="metric-strip" style={{ marginTop: "26px" }}>
              <div className="metric-pill">
                <span>Active enrollments</span>
                <strong>{joinedCount.toString().padStart(2, "0")}</strong>
              </div>
              <div className="metric-pill">
                <span>Program style</span>
                <strong>Guided cohorts</strong>
              </div>
              <div className="metric-pill">
                <span>Availability</span>
                <strong>Rolling weekly</strong>
              </div>
            </div>
          </div>

          <div className="premium-card spotlight-card">
            <span className="feature-badge">Enrollment summary</span>

            <div className="list-stack">
              <div className="list-row">
                <div>
                  <strong>Flexible participation</strong>
                  <p>Programs balance consistency with realistic student calendars.</p>
                </div>
                <span className="status-badge success">Live</span>
              </div>
              <div className="list-row">
                <div>
                  <strong>Clear commitment signals</strong>
                  <p>Students can see frequency and delivery style before joining.</p>
                </div>
                <span className="status-badge pending">Weekly</span>
              </div>
              <div className="list-row">
                <div>
                  <strong>Low-friction joining</strong>
                  <p>The join action now feels more like a polished product control.</p>
                </div>
                <span className="status-badge neutral">1 click</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <span className="mini-kicker">Featured programs</span>
          <h2>Each track is framed like a premium service offering.</h2>
          <p>
            Better spacing, stronger content, and clearer actions make the
            program list feel far more credible.
          </p>
        </div>

        <div className="premium-grid">
          {programCatalog.map((program) => {
            const isJoined = Boolean(joinedPrograms[program.id]);

            return (
              <article className="premium-card feature-card" key={program.id}>
                <div className="feature-card-top">
                  <span className="feature-badge">{program.category}</span>
                  <span className="metric-chip">{program.metric}</span>
                </div>

                <h3>{program.title}</h3>
                <p>{program.description}</p>

                <div className="tag-list">
                  {program.details.map((detail) => (
                    <span className="tag-pill" key={detail}>
                      {detail}
                    </span>
                  ))}
                </div>

                <div className="form-actions" style={{ marginTop: "auto" }}>
                  <button
                    className={isJoined ? "secondary-btn" : "primary-btn"}
                    onClick={() => toggleProgram(program.id)}
                    type="button"
                  >
                    {isJoined ? "Joined" : "Join program"}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default Programs;
