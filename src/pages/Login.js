import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiFetch } from "../api";

function createCaptcha() {
  return {
    first: Math.floor(Math.random() * 10),
    second: Math.floor(Math.random() * 10)
  };
}

function buildProfileFromEmail(email) {
  const username = email.split("@")[0] || "Student User";
  const formattedName = username
    .split(/[._-]/)
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join(" ");

  return {
    name: formattedName || "Student User",
    email,
    course: "B.Tech CSE",
    year: "3rd Year",
    status: "Active"
  };
}

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [captcha, setCaptcha] = useState(createCaptcha);
  const [captchaInput, setCaptchaInput] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isError, setIsError] = useState(false);

  const refreshCaptcha = () => {
    setCaptcha(createCaptcha());
    setCaptchaInput("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      setIsError(true);
      setFeedback("Enter both your email and password to continue.");
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
      const response = await apiFetch('/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });
      
      localStorage.setItem("studentProfile", JSON.stringify(response.users));
      localStorage.setItem("token", response.token);
      localStorage.setItem("isLoggedIn", "true");
      window.dispatchEvent(new Event("authchange"));
      localStorage.setItem("user", JSON.stringify(response));

      navigate("/dashboard");
    } catch (error) {
      setIsError(true);
      setFeedback(error.message || "Login failed. Please check credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-shell">
      <section className="auth-layout">
        <div className="auth-spotlight premium-card">
          <span className="hero-eyebrow hero-eyebrow-light">Member access</span>
          <h2 className="display-title" style={{ marginTop: "18px" }}>
            Return to your wellness hub.
          </h2>
          <p className="subtle-copy">
            Access resources, program schedules, confidential support requests,
            and your weekly care snapshot in one polished dashboard.
          </p>

          <ul className="auth-list">
            <li>
              <span className="auth-index">01</span>
              <div>
                <strong>Fast route back to support</strong>
                <p>Students can pick up where they left off with clear actions.</p>
              </div>
            </li>
            <li>
              <span className="auth-index">02</span>
              <div>
                <strong>Thoughtful security cues</strong>
                <p>Simple verification and a premium form experience build trust.</p>
              </div>
            </li>
            <li>
              <span className="auth-index">03</span>
              <div>
                <strong>Designed like a real product</strong>
                <p>The visuals match the quality users expect from modern apps.</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="premium-card auth-card">
          <span className="mini-kicker">Login</span>
          <h2>Welcome back</h2>
          <p>
            Sign in to view your recommendations, wellbeing progress, and
            upcoming sessions.
          </p>

          <form className="form-stack" onSubmit={handleSubmit}>
            <div className="field-group">
              <label className="field-label" htmlFor="login-email">
                Email address
              </label>
              <input
                className="field-input"
                id="login-email"
                onChange={(event) => setEmail(event.target.value)}
                placeholder="name@university.edu"
                type="email"
                value={email}
              />
            </div>

            <div className="field-group">
              <label className="field-label" htmlFor="login-password">
                Password
              </label>
              <div className="input-row">
                <input
                  className="field-input"
                  id="login-password"
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  type={showPassword ? "text" : "password"}
                  value={password}
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

            <div className="field-group">
              <label className="field-label" htmlFor="login-captcha">
                Verification
              </label>
              <div className="input-row">
                <input
                  className="field-input"
                  id="login-captcha"
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
                {loading ? "Signing in..." : "Login"}
              </button>
              <Link className="secondary-btn" to="/register">
                Create account
              </Link>
            </div>
          </form>

          <p className="auth-footer-note">
            No account yet? Register once and the student profile follows you
            across the interface.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Login;
