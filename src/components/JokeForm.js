import { useState } from "react";

export default function JokeForm({ onSubmit, jokeTypes = [] }) {
  const [joke, setJoke] = useState({
    type: "",
    content: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJoke((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(joke);
  };

  const isFormValid = joke.type !== "" && joke.content.trim() !== "";

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Type</label>
        <select name="type" value={joke.type} onChange={handleChange}>
          <option value="">Select a type</option>
          {jokeTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Content</label>
        <input
          type="text"
          name="content"
          value={joke.content}
          onChange={handleChange}
        />
      </div>
      <button type="submit" disabled={!isFormValid}>
        Submit
      </button>
    </form>
  );
}
