// pages/submit.js
import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import "../styles/styles.css";
import "../styles/submit.css";

export default function Submit() {
  const [joke, setJoke] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!joke || !category) {
      setError("Please enter a joke and select a category");
      return;
    }

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: joke, type: category }),
      });

      if (response.ok) {
        alert("Joke successfully added!");
        router.push("/");
      } else {
        throw new Error("Failed to add joke");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Layout>
      <h2>Submit a Joke</h2>
      <div className="form-container">
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <textarea
              placeholder="Enter your joke"
              value={joke}
              onChange={(e) => setJoke(e.target.value)}
            />
          </div>
          <div className="input-group">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select a category</option>
              <option value="Animal Jokes">Animal Jokes</option>
              <option value="Sports Jokes">Sports Jokes</option>
              <option value="Car Jokes">Car Jokes</option>
            </select>
          </div>
          <div className="input-group">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
