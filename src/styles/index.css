// pages/index.js
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import "../styles/styles.css";
import "../styles/home.css";

const addLineBreaks = (text) => {
  const specialChars = ["?", "!", ".", ","];
  let formattedText = text;

  specialChars.forEach((char) => {
    const regex = new RegExp(`\\${char}`, "g");
    formattedText = formattedText.replace(regex, `${char}<br>`);
  });

  return formattedText;
};

export default function Home() {
  const [jokes, setJokes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJokes = async () => {
      try {
        const response = await fetch("/api/jokes");
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        console.log(data); // Log the data structure for debugging
        setJokes(data.reverse()); // Reverse the order to show latest jokes on top
      } catch (err) {
        setError(err.message);
      }
    };

    fetchJokes();
  }, []);

  return (
    <Layout>
      <h2>Latest Jokes</h2>
      {error ? (
        <p className="error">{error}</p>
      ) : (
        jokes.map((joke, index) => (
          <div
            key={index}
            className="joke-card"
            dangerouslySetInnerHTML={{ __html: addLineBreaks(joke.content) }}
          ></div>
        ))
      )}
    </Layout>
  );
}
