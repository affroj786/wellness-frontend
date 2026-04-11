import { useState } from "react";
import { apiFetch, isAuthenticated } from "../api";

function Support() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: "Counseling",
    message: ""
  });

  const updateField = (field, value) => {
    setFormData((current) => ({
      ...current,
      [field]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isAuthenticated()) {
      alert("Please login to submit private support requests.");
      return;
    }
    
    try {
      await apiFetch('/support', {
        method: 'POST',
        body: JSON.stringify(formData)
      });
      setSubmitted(true);
    } catch (error) {
      alert(error.message || "Failed to submit support request.");
    }
  };

  return (
    <div className="page-shell">
      <section className="premium-card callout-band">
        <div>
          <span className="hero-eyebrow">Support concierge</span>
          <h2 className="display-title">
            Ask for help through a calmer, more trustworthy interface.
          </h2>
          <p className="subtle-copy">
            The support page now feels less like a plain form and more like a
            real service touchpoint, with urgency cues, office details, and a
            cleaner request flow.
          </p>
        </div>

        <div className="callout-note">
          <span className="feature-badge">Fast note</span>
          <p className="subtle-copy" style={{ marginTop: "12px" }}>
            If this is an immediate safety concern, contact campus emergency
            support or your local emergency service first. This form is best for
            non-urgent requests and follow-up care.
          </p>
        </div>
      </section>

      <section className="content-section split-layout">
        <div className="premium-card auth-card">
          <span className="mini-kicker">Request support</span>
          <h2>Tell the team what you need</h2>
          <p>
            Share the basics and the platform can route your request to the
            right care path.
          </p>

          <form className="form-stack" onSubmit={handleSubmit}>
            <div className="form-grid-two">
              <div className="field-group">
                <label className="field-label" htmlFor="support-name">
                  Full name
                </label>
                <input
                  className="field-input"
                  id="support-name"
                  onChange={(event) => updateField("name", event.target.value)}
                  placeholder="Enter your name"
                  type="text"
                  value={formData.name}
                />
              </div>

              <div className="field-group">
                <label className="field-label" htmlFor="support-email">
                  Email address
                </label>
                <input
                  className="field-input"
                  id="support-email"
                  onChange={(event) => updateField("email", event.target.value)}
                  placeholder="Enter your email"
                  type="email"
                  value={formData.email}
                />
              </div>
            </div>

            <div className="field-group">
              <label className="field-label" htmlFor="support-topic">
                Support topic
              </label>
              <select
                className="field-select"
                id="support-topic"
                onChange={(event) => updateField("topic", event.target.value)}
                value={formData.topic}
              >
                <option>Counseling</option>
                <option>Academic stress</option>
                <option>Fitness coaching</option>
                <option>Nutrition guidance</option>
              </select>
            </div>

            <div className="field-group">
              <label className="field-label" htmlFor="support-message">
                Describe your request
              </label>
              <textarea
                className="field-textarea"
                id="support-message"
                onChange={(event) => updateField("message", event.target.value)}
                placeholder="Share as much context as feels comfortable."
                value={formData.message}
              />
            </div>

            {submitted ? (
              <div className="form-feedback form-feedback-success">
                Your request has been submitted. A coordinator can now review it
                and respond with next steps.
              </div>
            ) : null}

            <div className="form-actions">
              <button className="primary-btn" type="submit">
                Submit request
              </button>
            </div>
          </form>
        </div>

        <div className="premium-grid-two">
          <div className="premium-card detail-card">
            <span className="feature-badge">Office hours</span>
            <h3>When the team is online</h3>
            <ul className="detail-list">
              <li>
                <strong>Mon to Fri</strong>
                <span>8:00 AM to 6:00 PM</span>
              </li>
              <li>
                <strong>Response target</strong>
                <span>Within 4 hours</span>
              </li>
              <li>
                <strong>Private follow-up</strong>
                <span>Email and dashboard</span>
              </li>
            </ul>
          </div>

          <div className="premium-card detail-card">
            <span className="feature-badge">Alternative access</span>
            <h3>Other ways to get help</h3>
            <ul className="detail-list">
              <li>
                <strong>Campus helpline</strong>
                <span>1800 321 009</span>
              </li>
              <li>
                <strong>Peer support desk</strong>
                <span>Student center, level 2</span>
              </li>
              <li>
                <strong>Fitness inquiries</strong>
                <span>coach@wellness.edu</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Support;
