export default async function handler(req, res) {
  if (req.method === "POST") {
    const joke = req.body;
    console.log("Received joke:", joke);

    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_SUBMIT_JOKES_API}/jokes`;
      console.log("API URL:", apiUrl);

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(joke),
      });

      console.log("Response status:", response.status);

      if (response.ok) {
        const result = await response.json();
        console.log("Success response:", result);
        return res
          .status(200)
          .json({ message: "Joke submitted successfully!", result });
      } else {
        const error = await response.text();
        console.log("Error response:", error);
        return res
          .status(response.status)
          .json({ message: "Failed to submit joke", error });
      }
    } catch (error) {
      console.error("Error forwarding joke:", error);
      return res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  } else {
    // Handle any other HTTP methods
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
