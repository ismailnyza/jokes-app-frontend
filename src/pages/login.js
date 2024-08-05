import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import "../styles/login.css"; // Import the login CSS file

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_MODERATE_JOKES_API}/api/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      },
    );

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.token);
      router.push("/moderate");
    } else {
      // Handle login error
      console.error("Login failed");
    }
  };

  return (
    <Layout>
      <div className="login-container min-h-screen flex items-center justify-center">
        <form onSubmit={handleSubmit} className="login-form">
          <h2 className="login-title">Login</h2>
          <div className="login-field">
            <label className="login-label">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
              required
            />
          </div>
          <div className="login-field">
            <label className="login-label">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              required
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </Layout>
  );
}
