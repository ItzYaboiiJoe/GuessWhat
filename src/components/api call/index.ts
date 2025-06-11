const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const fetchImage = async () => {
  const res = await fetch(
    `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`,
    { cache: "no-store" }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};

fetchImage().then(console.log).catch(console.error);

export default fetchImage;
