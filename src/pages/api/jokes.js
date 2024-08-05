export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SUBMIT_JOKES_API}/jokes`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      console.log("Fetched data:", data); // Log the fetched data
      const approvedJokes = data.filter((joke) => joke.status === "approved");
      console.log("Approved jokes:", approvedJokes); // Log the filtered data
      res.status(200).json(approvedJokes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
