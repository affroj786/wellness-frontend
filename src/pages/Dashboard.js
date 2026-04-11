import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./Dashboard.css";

const summaryCards = [
  {
    label: "Programs joined",
    value: "05",
    note: "Two active this week"
  },
  {
    label: "Resources saved",
    value: "12",
    note: "Personalized reading list"
  },
  {
    label: "Support tickets",
    value: "02",
    note: "Both awaiting follow-up"
  },
  {
    label: "Wellness score",
    value: "84",
    note: "Up six points this month"
  }
];

const actionCards = [
  {
    label: "RS",
    title: "Browse curated resources",
    copy:
      "Open the library for stress relief, focus recovery, sleep resets, and practical nutrition guidance.",
    link: "/resources",
    cta: "Open resources"
  },
  {
    label: "PG",
    title: "Join a new program",
    copy:
      "Pick from yoga, strength, or meditation tracks designed around realistic student schedules.",
    link: "/programs",
    cta: "View programs"
  },
  {
    label: "SP",
    title: "Request private support",
    copy:
      "Share what you need, submit a support request, and receive follow-up through the portal.",
    link: "/support",
    cta: "Get support"
  }
];

const nextSteps = [
  {
    title: "Hydration check-in",
    copy: "Complete your afternoon hydration reminder before the 4 PM study block."
  },
  {
    title: "Movement break",
    copy: "A 12 minute mobility session is recommended after today�s classes."
  },
  {
    title: "Evening recovery",
    copy: "Add the sleep reset guide to tonight�s plan to improve tomorrow�s focus."
  }
];

const scheduleItems = [
  {
    time: "7:00 AM",
    title: "Restore yoga",
    copy: "Mobility session in the wellness studio."
  },
  {
    time: "2:00 PM",
    title: "Nutrition office hour",
    copy: "Quick Q and A for meal planning during exam week."
  },
  {
    time: "5:30 PM",
    title: "Counselor follow-up",
    copy: "Private video call with your assigned support advisor."
  }
];

const weeklyRecovery = [
  { day: "Mon", height: "62%" },
  { day: "Tue", height: "78%" },
  { day: "Wed", height: "70%" },
  { day: "Thu", height: "88%" },
  { day: "Fri", height: "76%" },
  { day: "Sat", height: "54%" },
  { day: "Sun", height: "68%" }
];

function readStudentProfile() {
  const rawProfile = localStorage.getItem("studentProfile");

  if (!rawProfile) {
    return { name: "Student User" };
  }

  try {
    return JSON.parse(rawProfile);
  } catch {
    return { name: "Student User" };
  }
}

function Dashboard() {
  const navigate = useNavigate();
  
 const user = JSON.parse(localStorage.getItem("user"));
const firstName = user?.name?.split(" ")[0] || "Student";

useEffect(() => {
  const user = localStorage.getItem("user");
  if (!user) {
    navigate("/login");
  }
}, [navigate]);

  return (
    <div className="page-shell">
      <section className="dashboard-hero">
        <div>
          <span className="hero-eyebrow hero-eyebrow-light">Student hub</span>
          <h1>{firstName}, your wellness week is under control.</h1>
          <p>
            This dashboard now feels closer to a premium digital product, with
            stronger hierarchy, clearer actions, and a calmer overview of what
            matters next.
          </p>

          <div className="dashboard-highlight-row">
            <div className="dashboard-highlight-card">
              <span>Next session</span>
              <strong>Thu, 5:30 PM</strong>
            </div>
            <div className="dashboard-highlight-card">
              <span>Primary focus</span>
              <strong>Recovery and routine</strong>
            </div>
            <div className="dashboard-highlight-card">
              <span>Weekly streak</span>
              <strong>6 healthy days</strong>
            </div>
          </div>
        </div>

        <div className="dashboard-focus-card">
          <span>Focus for today</span>
          <h3>Lighten the load without losing momentum.</h3>

          <ul className="dashboard-focus-list">
            <li>
              <span className="dashboard-focus-index">01</span>
              <span>Keep the counseling follow-up in place for this evening.</span>
            </li>
            <li>
              <span className="dashboard-focus-index">02</span>
              <span>Use the 12 minute movement break between study sessions.</span>
            </li>
            <li>
              <span className="dashboard-focus-index">03</span>
              <span>Finish the day with the sleep reset resource you saved.</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="dashboard-summary-grid">
        {summaryCards.map((card) => (
          <article className="premium-card dashboard-stat-card" key={card.label}>
            <span>{card.label}</span>
            <strong>{card.value}</strong>
            <p>{card.note}</p>
          </article>
        ))}
      </section>

      <section className="dashboard-layout">
        <div className="dashboard-main-column">
          <article className="premium-card dashboard-panel">
            <div className="dashboard-panel-header">
              <div>
                <h2>Recommended next actions</h2>
                <p>High-value shortcuts that keep the week organized.</p>
              </div>
            </div>

            <div className="dashboard-action-grid">
              {actionCards.map((card) => (
                <article className="premium-card dashboard-action-card" key={card.title}>
                  <span className="dashboard-action-icon">{card.label}</span>
                  <div>
                    <h3>{card.title}</h3>
                    <p>{card.copy}</p>
                  </div>
                  <Link className="primary-btn" to={card.link}>
                    {card.cta}
                  </Link>
                </article>
              ))}
            </div>
          </article>

          <article className="premium-card dashboard-panel">
            <div className="dashboard-panel-header">
              <div>
                <h2>Weekly recovery rhythm</h2>
                <p>A simple visual for how your energy has been trending.</p>
              </div>
              <span className="status-badge success">Improving</span>
            </div>

            <div className="dashboard-mini-chart">
              {weeklyRecovery.map((entry) => (
                <div className="dashboard-bar" key={entry.day} style={{ height: entry.height }}>
                  <span>{entry.day}</span>
                </div>
              ))}
            </div>
          </article>
        </div>

        <div className="dashboard-side-column">
          <article className="premium-card dashboard-panel">
            <div className="dashboard-panel-header">
              <div>
                <h2>Today�s checklist</h2>
                <p>Small actions that make the rest of the day easier.</p>
              </div>
            </div>

            <ul className="dashboard-checklist">
              {nextSteps.map((step, index) => (
                <li key={step.title}>
                  <span className="dashboard-check-badge">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <strong>{step.title}</strong>
                    <p>{step.copy}</p>
                  </div>
                </li>
              ))}
            </ul>
          </article>

          <article className="premium-card dashboard-panel">
            <div className="dashboard-panel-header">
              <div>
                <h2>Upcoming schedule</h2>
                <p>A quick look at today�s support and program touchpoints.</p>
              </div>
            </div>

            <div className="dashboard-timeline">
              {scheduleItems.map((item) => (
                <div className="premium-card dashboard-timeline-card" key={item.title}>
                  <div className="dashboard-timeline-time">{item.time}</div>
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.copy}</p>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <aside className="dashboard-tip-card">
            <span className="feature-badge">Daily tip</span>
            <h3>Steady hydration still matters more than another late coffee.</h3>
            <p>
              Keep a bottle nearby during long study blocks and front-load water
              earlier in the day to protect focus by evening.
            </p>
          </aside>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
