import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import "../styles/auth.css";

const registerSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters"),

    email: z
      .string()
      .email("Please enter a valid email"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain an uppercase letter")
      .regex(/[a-z]/, "Must contain a lowercase letter")
      .regex(/[0-9]/, "Must contain a number"),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const password = watch("password", "");

  const getPasswordStrength = () => {
    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    return score;
  };

  const onSubmit = (data: RegisterFormData) => {
    console.log(data);

    // Later:
    // await registerUser(data);

    navigate("/chat");
  };

  return (
    <>
      <Navbar />
      <div className="auth-page">
        <div className="auth-card">
          <h1>Create Account</h1>

          <p className="auth-subtitle">
            Join NexChat and start chatting instantly.
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              placeholder="Username"
              {...register("username")}
            />
            {errors.username && (
              <p className="error">
                {errors.username.message}
              </p>
            )}

            <input
              type="email"
              placeholder="Email"
              {...register("email")}
            />
            {errors.email && (
              <p className="error">
                {errors.email.message}
              </p>
            )}

            <input
              type="password"
              placeholder="Password"
              {...register("password")}
            />

            <div className="strength-bar">
              <div
                className="strength-fill"
                style={{
                  width: `${getPasswordStrength() * 25}%`,
                }}
              />
            </div>

            {errors.password && (
              <p className="error">
                {errors.password.message}
              </p>
            )}

            <input
              type="password"
              placeholder="Confirm Password"
              {...register("confirmPassword")}
            />

            {errors.confirmPassword && (
              <p className="error">
                {errors.confirmPassword.message}
              </p>
            )}

            <button
              type="submit"
              className="submit-btn"
            >
              Create Account
            </button>
          </form>

          <div className="auth-switch">
            Already have an account?
            <button
              className="link-btn"
              onClick={() => navigate("/login")}
            >
              Sign In
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}