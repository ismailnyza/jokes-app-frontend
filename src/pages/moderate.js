import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import "../styles/styles.css";
import "../styles/moderate.css";

const fetchJokes = async () => {
  try {
    const response = await fetch("http://localhost:4000/api/jokes", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch jokes");
    }
    const jokes = await response.json();
    console.log("Fetched jokes:", jokes); // Log the response
    return Array.isArray(jokes) ? jokes : [];
  } catch (error) {
    console.error("Error fetching jokes:", error);
    return [];
  }
};

export default function Moderate() {
  const [jokes, setJokes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [jokeToReject, setJokeToReject] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      const getJokes = async () => {
        const jokesList = await fetchJokes();
        setJokes(jokesList);
        setLoading(false);
      };
      getJokes();
    }
  }, [router]);

  const updateJokeStatus = async (jokeId, status, rejectionComment = "") => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/jokes/${jokeId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ status, rejectionComment }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to update joke status");
      }

      // Update the joke status in the local state
      setJokes((prevJokes) =>
        prevJokes.map((joke) =>
          joke._id === jokeId ? { ...joke, status, rejectionComment } : joke,
        ),
      );
    } catch (error) {
      console.error("Error updating joke status:", error);
    }
  };

  const handleApprove = (jokeId) => {
    updateJokeStatus(jokeId, "approved");
  };

  const handleReject = (jokeId) => {
    setJokeToReject(jokeId);
    setShowConfirmation(true);
  };

  const confirmReject = () => {
    updateJokeStatus(jokeToReject, "rejected", rejectionReason);
    setShowConfirmation(false);
  };

  const cancelReject = () => {
    setJokeToReject(null);
    setShowConfirmation(false);
  };

  if (loading) {
    return (
      <Layout>
        <h2 className="text-3xl font-bold">Moderate Jokes</h2>
        <p>Loading...</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <h2 className="text-3xl font-bold">Moderate Jokes</h2>
      <div className="main-content">
        <table>
          <thead>
            <tr>
              <th>Joke</th>
              <th>Type</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {jokes.length > 0 ? (
              jokes.map((joke) => (
                <tr
                  key={joke._id}
                  className={
                    joke.status === "approved"
                      ? "approved"
                      : joke.status === "rejected"
                        ? "rejected"
                        : ""
                  }
                >
                  <td>{joke.content}</td>
                  <td>{joke.type.name}</td>
                  <td>{joke.status}</td>
                  <td className="action-buttons">
                    <button
                      className="approve"
                      onClick={() => handleApprove(joke._id)}
                    >
                      ✔️
                    </button>
                    <button
                      className="delete"
                      onClick={() => handleReject(joke._id)}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No jokes available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showConfirmation && (
        <div className="confirmation-dialog">
          <h3>Are you sure you want to reject this joke?</h3>
          <input
            type="text"
            placeholder="Enter rejection reason"
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
          />
          <div className="confirmation-dialog-buttons">
            <button onClick={confirmReject}>Confirm</button>
            <button onClick={cancelReject}>Cancel</button>
          </div>
        </div>
      )}
    </Layout>
  );
}
