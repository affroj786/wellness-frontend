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
  const [captcha, setCaptcha] = useState(createCaptcha());
  const [captchaInput, setCaptchaInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isError, setIsError] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    course: "B.Tech CSE",
    year: "3rd Year"
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
      const response = await apiFetch("/auth/register", {
        method: "POST",
        body: JSON.stringify(formData)
      });

      const profile = response.user || {
        name: formData.name,
        email: formData.email,
        course: formData.course,
        year: formData.year,
        status: "Active"
      };

      localStorage.setItem("studentProfile", JSON.stringify(profile));
      localStorage.setItem("user", JSON.stringify(profile));
      localStorage.setItem("token", response.token);
      localStorage.setItem("isLoggedIn", "true");
      window.dispatchEvent(new Event("authchange"));

      setFeedback("Account created successfully. Redirecting...");
      setTimeout(() => navigate("/dashboard"), 1000);
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
          <h2>Join the Wellness Platform</h2>
          <p>
            Create your student account to access fitness programs,
            mental health support, and nutrition guidance.
          </p>
        </div>

        <div className="premium-card auth-card">
          <h2>Create Account</h2>

          <form onSubmit={handleSubmit}>
            <input
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => updateField("name", e.target.value)}
            />

            <input
              placeholder="Email"
              type="email"
              value={formData.email}
              onChange={(e) => updateField("email", e.target.value)}
            />

            <div>
              <input
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => updateField("password", e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <select
              value={formData.course}
              onChange={(e) => updateField("course", e.target.value)}
            >
              <option>B.Tech CSE</option>
              <option>BBA</option>
              <option>MBA</option>
              <option>B.Sc Nutrition</option>
            </select>

            <select
              value={formData.year}
              onChange={(e) => updateField("year", e.target.value)}
            >
              <option>1st Year</option>
              <option>2nd Year</option>
              <option>3rd Year</option>
              <option>4th Year</option>
            </select>

            <input
              placeholder={`Solve ${captcha.first} + ${captcha.second}`}
              value={captchaInput}
              onChange={(e) => setCaptchaInput(e.target.value)}
            />

            <button type="button" onClick={refreshCaptcha}>
              Refresh Captcha
            </button>

            {feedback && (
              <p style={{ color: isError ? "red" : "green" }}>
                {feedback}
              </p>
            )}

            <button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Register"}
            </button>

            <Link to="/login">Already have an account?</Link>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Register;
