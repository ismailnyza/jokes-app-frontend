export default async function handler(req, res) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_MODERATE_JOKES_API}/api/jokes`,
    {
      headers: {
        Authorization: `Bearer ${req.headers.authorization}`,
      },
    },
  );
  const data = await response.json();
  res.status(200).json(data);
}
