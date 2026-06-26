import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import "../styles/auth.css";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    try {
      setError("");

      const res = await loginUser({ email, password });

      localStorage.setItem("token", res.data.token);

      navigate("/chat");
    } catch (err: any) {
      const message = err.response?.data?.message;

      if (message === "User not found") {
        setError("No account found with this email");
      } else if (message === "Incorrect password") {
        setError("Wrong password. Try again");
      } else {
        setError(message || "Login failed");
      }
    }
  };

  return (
    <>
      <Navbar />

      <div className="auth-page">
        <div className="auth-card">
          <h1>Welcome Back</h1>

          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error && error.toLowerCase().includes("email") && (
              <p className="error-text">{error}</p>
            )}

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && !error.toLowerCase().includes("email") && (
              <p className="error-text">{error}</p>
            )}

            <button type="submit" className="submit-btn">
              Sign In
            </button>
          </form>

          <p onClick={() => navigate("/register")} style={{ cursor: "pointer", color: "#6366f1" }}>
            Create an account
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
}