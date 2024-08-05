export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const apiUrl = "http://localhost:3000/joke-types";
      console.log("API URL:", apiUrl);

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Response status:", response.status);

      if (response.ok) {
        const jokeTypes = await response.json();
        const jokeTypeNames = jokeTypes.map((jokeType) => jokeType.name);
        console.log("Joke type names:", jokeTypeNames);

        return res.status(200).json(jokeTypeNames);
      } else {
        const error = await response.text();
        console.log("Error response:", error);
        return res
          .status(response.status)
          .json({ message: "Failed to fetch joke types", error });
      }
    } catch (error) {
      console.error("Error fetching joke types:", error);
      return res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
