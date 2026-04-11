import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiFetch } from "../api";

function createCaptcha() {
  return {
    first: Math.floor(Math.random() * 10),
    second: Math.floor(Math.random() * 10)
  };
}

function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [captcha, setCaptcha] = useState(createCaptcha);
  const [captchaInput, setCaptchaInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isError, setIsError] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    course: "B.Tech CSE",
    academicYear: "3rd Year"
  });

  const updateField = (field, value) => {
    setFormData((current) => ({
      ...current,
      [field]: value
    }));
  };

  const refreshCaptcha = () => {
    setCaptcha(createCaptcha());
    setCaptchaInput("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      setIsError(true);
      setFeedback("Complete all required details before continuing.");
      return;
    }

    if (Number(captchaInput) !== captcha.first + captcha.second) {
      setIsError(true);
      setFeedback("Verification answer is incorrect. Please try again.");
      refreshCaptcha();
      return;
    }

    setLoading(true);
    setIsError(false);
    setFeedback("");

    try {
      const response = await apiFetch('/users',{
        method: 'POST',
        body: JSON.stringify(formData)
      });
      
      localStorage.setItem("studentProfile", JSON.stringify(response));
      localStorage.setItem("token", response.token);
      localStorage.setItem("isLoggedIn", "true");
      window.dispatchEvent(new Event("authchange"));

      setFeedback("Account created successfully. Redirecting...");
      window.setTimeout(() => navigate("/dashboard"), 900);
    } catch (error) {
      setIsError(true);
      setFeedback(error.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-shell">
      <section className="auth-layout">
        <div className="auth-spotlight premium-card">
          <span className="hero-eyebrow hero-eyebrow-light">New account</span>
          <h2 className="display-title" style={{ marginTop: "18px" }}>
            Join a wellness platform that feels intentionally designed.
          </h2>
          <p className="subtle-copy">
            Registration now looks and behaves like a real digital product,
            with clearer fields, stronger pacing, and a more premium first
            impression.
          </p>

          <div className="metric-strip" style={{ marginTop: "22px" }}>
            <div className="metric-pill">
              <span>Onboarding</span>
              <strong>Under 2 min</strong>
            </div>
            <div className="metric-pill">
              <span>Profile setup</span>
              <strong>Guided</strong>
            </div>
            <div className="metric-pill">
              <span>Dashboard access</span>
              <strong>Ready next</strong>
            </div>
          </div>

          <ul className="auth-list">
            <li>
              <span className="auth-index">01</span>
              <div>
                <strong>Create your student profile</strong>
                <p>Store the basic details used throughout the interface.</p>
              </div>
            </li>
            <li>
              <span className="auth-index">02</span>
              <div>
                <strong>Enter the wellness dashboard</strong>
                <p>Access resources, programs, and support in one place.</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="premium-card auth-card">
          <span className="mini-kicker">Register</span>
          <h2>Create your account</h2>
          <p>
            Set up a student profile to unlock a more polished wellness
            experience across every page.
          </p>

          <form className="form-stack" onSubmit={handleSubmit}>
            <div className="field-group">
              <label className="field-label" htmlFor="register-name">
                Full name
              </label>
              <input
                className="field-input"
                id="register-name"
                onChange={(event) => updateField("name", event.target.value)}
                placeholder="Enter your full name"
                type="text"
                value={formData.name}
              />
            </div>

            <div className="field-group">
              <label className="field-label" htmlFor="register-email">
                Email address
              </label>
              <input
                className="field-input"
                id="register-email"
                onChange={(event) => updateField("email", event.target.value)}
                placeholder="name@university.edu"
                type="email"
                value={formData.email}
              />
            </div>

            <div className="field-group">
              <label className="field-label" htmlFor="register-password">
                Password
              </label>
              <div className="input-row">
                <input
                  className="field-input"
                  id="register-password"
                  onChange={(event) => updateField("password", event.target.value)}
                  placeholder="Create a secure password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                />
                <button
                  className="ghost-btn"
                  onClick={() => setShowPassword((current) => !current)}
                  type="button"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="form-grid-two">
              <div className="field-group">
                <label className="field-label" htmlFor="register-course">
                  Course
                </label>
                <select
                  className="field-select"
                  id="register-course"
                  onChange={(event) => updateField("course", event.target.value)}
                  value={formData.course}
                >
                  <option>B.Tech CSE</option>
                  <option>BBA</option>
                  <option>MBA</option>
                  <option>B.Sc Nutrition</option>
                </select>
              </div>

              <div className="field-group">
                <label className="field-label" htmlFor="register-year">
                  Academic year
                </label>
                <select
                  className="field-select"
                  id="register-year"
                 onChange={(event) => updateField("academicYear", event.target.value)}
                 value={formData.academicYear}
                >
                  <option>1st Year</option>
                  <option>2nd Year</option>
                  <option>3rd Year</option>
                  <option>4th Year</option>
                </select>
              </div>
            </div>

            <div className="field-group">
              <label className="field-label" htmlFor="register-captcha">
                Verification
              </label>
              <div className="input-row">
                <input
                  className="field-input"
                  id="register-captcha"
                  onChange={(event) => setCaptchaInput(event.target.value)}
                  placeholder={`Solve ${captcha.first} + ${captcha.second}`}
                  type="text"
                  value={captchaInput}
                />
                <button className="ghost-btn" onClick={refreshCaptcha} type="button">
                  Refresh
                </button>
              </div>
            </div>

            {feedback ? (
              <div
                className={`form-feedback ${
                  isError ? "form-feedback-error" : "form-feedback-success"
                }`}
              >
                {feedback}
              </div>
            ) : null}

            <div className="form-actions">
              <button className="primary-btn" disabled={loading} type="submit">
                {loading ? "Creating..." : "Register"}
              </button>
              <Link className="secondary-btn" to="/login">
                Already registered
              </Link>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Register;
