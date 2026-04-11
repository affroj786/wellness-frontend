import { Link } from "react-router-dom";

const proofPoints = [
  { label: "Students supported", value: "12k+" },
  { label: "Average response", value: "< 4 hrs" }
];

const services = [
  {
    badge: "Mental health",
    metric: "Private support",
    title: "Counseling that feels calm, fast, and human.",
    description:
      "Book check-ins, access guided coping tools, and reach professionals through a reassuring digital experience.",
    points: ["Same-week sessions", "Stress and anxiety resources"]
  },
  {
    badge: "Fitness",
    metric: "Routine builder",
    title: "Programs that fit around real student schedules.",
    description:
      "From mobility sessions to strength plans, students can join structured wellness tracks without friction.",
    points: ["Morning and evening slots", "Progress snapshots"]
  },
  {
    badge: "Nutrition",
    metric: "Campus-ready",
    title: "Simple food guidance for busy academic weeks.",
    description:
      "Offer meal tips, hydration plans, and recovery guidance designed for life in hostels, libraries, and labs.",
    points: ["Practical meal plans", "Smart recovery advice"]
  }
];

function Home() {
  return (
    <div className="page-shell">
      <section className="hero-panel hero-panel-compact">
        <div className="hero-grid">
          <div className="hero-copy">
            <span className="hero-eyebrow">Campus wellness, redesigned</span>

            <h1>Student wellness, without the clutter.</h1>

            <p>
              One clean place for support, programs, and resources with a more
              polished real-website feel.
            </p>

            <div className="hero-actions">
              <Link className="primary-btn" to="/register">
                Get started
              </Link>
              <Link className="secondary-btn" to="/dashboard">
                View dashboard
              </Link>
            </div>

            <div className="hero-proof hero-proof-compact">
              {proofPoints.map((item) => (
                <div className="hero-proof-card" key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>
          </div>

          <div className="premium-card spotlight-card">
            <span className="feature-badge">Quick access</span>

            <h3 className="display-title" style={{ fontSize: "1.7rem", marginTop: "14px" }}>
              Everything important is easy to find.
            </h3>

            <p className="subtle-copy">
              Start fast, then explore more only when you need it.
            </p>

            <div className="spotlight-list">
              <div className="spotlight-row">
                <div>
                  <strong>Resources</strong>
                  <p>Helpful guides without digging through clutter.</p>
                </div>
                <span className="spotlight-value">Browse</span>
              </div>

              <div className="spotlight-row">
                <div>
                  <strong>Programs</strong>
                  <p>Join wellness activities in one click.</p>
                </div>
                <span className="spotlight-value">Join</span>
              </div>

              <div className="spotlight-row">
                <div>
                  <strong>Support</strong>
                  <p>Request help privately when you need it.</p>
                </div>
                <span className="spotlight-value">Reach out</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <span className="mini-kicker">Core services</span>
          <h2>Built around how students actually look for help.</h2>
          <p>
            Each area now has stronger structure, clearer hierarchy, and more
            confidence in the presentation so the product feels closer to a
            premium real-world website.
          </p>
        </div>

        <div className="premium-grid">
          {services.map((service) => (
            <article className="premium-card feature-card" key={service.title}>
              <div className="feature-card-top">
                <span className="feature-badge">{service.badge}</span>
                <span className="metric-chip">{service.metric}</span>
              </div>

              <h3>{service.title}</h3>
              <p>{service.description}</p>

              <div className="tag-list">
                {service.points.map((point) => (
                  <span className="tag-pill" key={point}>
                    {point}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
