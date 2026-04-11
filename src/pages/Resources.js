const featuredResources = [
  {
    category: "Mental health",
    metric: "12 min read",
    title: "Anxiety reset toolkit",
    description:
      "Grounding prompts, short breathing exercises, and practical ways to de-escalate stressful academic moments.",
    tags: ["Breathing", "Exam stress", "Recovery"]
  },
  {
    category: "Fitness",
    metric: "Guided plan",
    title: "Desk-to-daily movement routine",
    description:
      "A low-pressure routine for students who spend long hours sitting in lectures, libraries, or labs.",
    tags: ["Mobility", "Low impact", "Daily use"]
  },
  {
    category: "Nutrition",
    metric: "Smart checklist",
    title: "Fueling study weeks without overcomplicating meals",
    description:
      "Simple food guidance, hydration reminders, and snack combinations that help focus and recovery.",
    tags: ["Hydration", "Snacks", "Meal timing"]
  },
  {
    category: "Sleep",
    metric: "7 day guide",
    title: "Reset your sleep rhythm before exams",
    description:
      "A practical sequence for reducing late-night overstimulation and rebuilding a more stable routine.",
    tags: ["Sleep hygiene", "Routine", "Evening reset"]
  },
  {
    category: "Resilience",
    metric: "Quick module",
    title: "Bounce-back habits after a hard week",
    description:
      "Use reflection prompts and lightweight habits to regain momentum without forcing a full reset overnight.",
    tags: ["Mindset", "Burnout prevention", "Reflection"]
  },
  {
    category: "Community",
    metric: "Peer format",
    title: "How to ask for support early instead of late",
    description:
      "Scripts, examples, and confidence boosters for reaching out to mentors, peers, and counselors.",
    tags: ["Communication", "Peer care", "Confidence"]
  }
];

const curationNotes = [
  {
    title: "Curated for real student pressure",
    copy:
      "Resources focus on exams, inconsistent schedules, social fatigue, and workload peaks rather than generic advice."
  },
  {
    title: "Written for action",
    copy:
      "Each item is framed around something a student can do immediately, not just something they can read."
  },
  {
    title: "Presented with premium clarity",
    copy:
      "The page now feels closer to a modern content platform, with stronger structure and more useful scanning patterns."
  }
];

function Resources() {
  return (
    <div className="page-shell">
      <section className="hero-panel">
        <div className="hero-grid">
          <div className="hero-copy">
            <span className="hero-eyebrow">Resource library</span>
            <h1>Wellness content with the polish of a real product.</h1>
            <p>
              Instead of plain cards, the library now feels editorial,
              organized, and premium. Students can quickly scan the format,
              category, and purpose of every resource.
            </p>

            <div className="metric-strip" style={{ marginTop: "28px" }}>
              <div className="metric-pill">
                <span>Collections</span>
                <strong>18 curated</strong>
              </div>
              <div className="metric-pill">
                <span>Most viewed</span>
                <strong>Mental health</strong>
              </div>
              <div className="metric-pill">
                <span>Recommended cadence</span>
                <strong>Weekly refresh</strong>
              </div>
            </div>
          </div>

          <div className="premium-card spotlight-card">
            <span className="feature-badge">Editor notes</span>
            <div className="list-stack">
              {curationNotes.map((note) => (
                <div className="list-row" key={note.title}>
                  <div>
                    <strong>{note.title}</strong>
                    <p>{note.copy}</p>
                  </div>
                  <span className="status-badge success">Ready</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <span className="mini-kicker">Featured reading</span>
          <h2>Designed to be browsed, not just listed.</h2>
          <p>
            These cards carry clearer hierarchy and better metadata so the page
            feels more like a curated digital library.
          </p>
        </div>

        <div className="premium-grid">
          {featuredResources.map((resource) => (
            <article className="premium-card feature-card" key={resource.title}>
              <div className="feature-card-top">
                <span className="feature-badge">{resource.category}</span>
                <span className="metric-chip">{resource.metric}</span>
              </div>

              <h3>{resource.title}</h3>
              <p>{resource.description}</p>

              <div className="tag-list">
                {resource.tags.map((tag) => (
                  <span className="tag-pill" key={tag}>
                    {tag}
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

export default Resources;
