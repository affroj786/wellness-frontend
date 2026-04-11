import { useState, useEffect } from "react";
import { apiFetch } from "../api";
import "./Admin.css";

const sidebarItems = [
  { title: "Operations", description: "Dashboard and service overview" },
  { title: "Students", description: "Profiles, status, and engagement" },
  { title: "Reports", description: "Usage and performance insights" },
  { title: "Resources", description: "Library curation and publishing" },
  { title: "Settings", description: "Platform controls and permissions" }
];

const metrics = [
  { label: "Total students", value: "1,284", note: "Up 8% this month" },
  { label: "Open requests", value: "24", note: "Six need urgent triage" },
  { label: "Reports generated", value: "48", note: "Weekly summary ready" },
  { label: "Programs live", value: "12", note: "Three cohorts start Friday" }
];

const students = [
  {
    name: "Arif Khan",
    email: "arif@email.com",
    program: "Restore Yoga",
    status: "Active"
  },
  {
    name: "Rahul Verma",
    email: "rahul@email.com",
    program: "Focus Reset",
    status: "Follow-up"
  },
  {
    name: "Maya Thomas",
    email: "maya@email.com",
    program: "Strength Lab",
    status: "Active"
  }
];

const requestQueue = [
  {
    title: "Counseling escalation review",
    meta: "3 new requests in the last hour",
    status: "Pending"
  },
  {
    title: "Program attendance export",
    meta: "Fitness team requested cohort summary",
    status: "Ready"
  },
  {
    title: "Resource library refresh",
    meta: "Sleep content bundle awaiting approval",
    status: "In review"
  }
];

const activityFeed = [
  "New student profile synced from registration.",
  "Weekly wellness performance report generated.",
  "Support team updated service response targets.",
  "Meditation program reached 90 percent occupancy."
];

function Admin() {
  const [stats, setStats] = useState({
    recentStudents: students,
    requestQueue: requestQueue,
    studentsCount: 1284,
    openRequestsCount: 24
  });

  useEffect(() => {
    apiFetch('/admin/stats')
      .then(data => {
        setStats({
          recentStudents: data.recentStudents?.length > 0 ? data.recentStudents : students,
          requestQueue: data.requestQueue?.length > 0 ? data.requestQueue : requestQueue,
          studentsCount: data.students || 1284,
          openRequestsCount: data.openRequests || 24
        });
      })
      .catch(console.error);
  }, []);

  const currentMetrics = [
    { label: "Total students", value: stats.studentsCount, note: "Loaded from DB" },
    { label: "Open requests", value: stats.openRequestsCount, note: "Requires attention" },
    { label: "Reports generated", value: "48", note: "Weekly summary ready" },
    { label: "Programs live", value: "12", note: "Three cohorts start Friday" }
  ];

  return (
    <div className="admin-page">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <span className="hero-eyebrow hero-eyebrow-light">Admin console</span>
          <h1>Wellness operations</h1>
          <p>
            A cleaner, premium control center for monitoring student wellbeing
            services at a glance.
          </p>
        </div>

        <div className="admin-nav">
          {sidebarItems.map((item) => (
            <div className="admin-nav-item" key={item.title}>
              <strong>{item.title}</strong>
              <span>{item.description}</span>
            </div>
          ))}
        </div>

        <div className="admin-trust-card">
          <span className="mini-kicker" style={{ color: "#ffffff" }}>
            Admin note
          </span>
          <p>
            The panel now mirrors the tone of a modern SaaS dashboard with
            stronger spacing, hierarchy, and reporting surfaces.
          </p>
        </div>
      </aside>

      <section className="admin-content">
        <div className="premium-card admin-header">
          <div>
            <span className="mini-kicker">Operations overview</span>
            <h2>Admin dashboard</h2>
            <p>
              Monitor wellness demand, student activity, and resource health in
              a single premium interface that feels closer to a production
              website.
            </p>
          </div>

          <div className="admin-header-actions">
            <button className="secondary-btn" type="button">
              Export report
            </button>
            <button className="primary-btn" type="button">
              Create update
            </button>
          </div>
        </div>

        <div className="admin-metrics">
          {currentMetrics.map((metric) => (
            <article className="premium-card admin-metric-card" key={metric.label}>
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
              <p>{metric.note}</p>
            </article>
          ))}
        </div>

        <div className="admin-board">
          <article className="premium-card admin-table-card">
            <div className="admin-section-header">
              <div>
                <h3>Recent students</h3>
                <p>Latest profiles and their current wellness engagement.</p>
              </div>
              <span className="status-badge success">Synced</span>
            </div>

            <table className="admin-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Program</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentStudents.map((student) => (
                  <tr key={student.email}>
                    <td>
                      <div className="admin-user">
                        <strong>{student.name}</strong>
                        <span>{student.email}</span>
                      </div>
                    </td>
                    <td>{student.program || 'No program'}</td>
                    <td>
                      <span
                        className={`status-badge ${
                          student.status === "Active" ? "success" : "pending"
                        }`}
                      >
                        {student.status || 'Active'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </article>

          <div className="admin-side-stack">
            <article className="premium-card admin-queue-card">
              <div className="admin-section-header">
                <div>
                  <h3>Priority queue</h3>
                  <p>Tasks requiring admin attention today.</p>
                </div>
              </div>

              {stats.requestQueue.map((item, index) => (
                <div className="admin-queue-item" key={item.title || index}>
                  <span className="admin-number-chip">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.meta}</p>
                    <span className="status-badge neutral">{item.status}</span>
                  </div>
                </div>
              ))}
            </article>

            <article className="premium-card admin-activity-card">
              <div className="admin-section-header">
                <div>
                  <h3>Activity feed</h3>
                  <p>Recent operational moments across the platform.</p>
                </div>
              </div>

              {activityFeed.map((entry, index) => (
                <div className="admin-activity-item" key={entry}>
                  <span className="admin-number-chip">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p>{entry}</p>
                </div>
              ))}
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Admin;
