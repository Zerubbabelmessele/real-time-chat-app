import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/auth";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import "../styles/auth.css";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // FRONTEND VALIDATION
    if (!form.username || !form.email || !form.password || !form.confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (form.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setError("");

      await registerUser({
        username: form.username,
        email: form.email,
        password: form.password,
      });

      navigate("/login");
    } catch (err: any) {
      const message = err.response?.data?.message;

      if (message === "Email already exists") {
        setError("This email is already registered");
      } else {
        setError(message || "Registration failed");
      }
    }
  };

  return (
    <>
      <Navbar />

      <div className="auth-page">
        <div className="auth-card">
          <h1>Create Account</h1>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              value={form.username}
              onChange={(e) =>
                setForm({ ...form, username: e.target.value })
              }
            />

            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />

            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={(e) =>
                setForm({ ...form, confirmPassword: e.target.value })
              }
            />

            {error && <p className="error-text">{error}</p>}

            <button type="submit" className="submit-btn">
              Create Account
            </button>
          </form>

          <p
            onClick={() => navigate("/login")}
            style={{ cursor: "pointer", color: "#6366f1" }}
          >
            Already have an account? Sign in
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
}