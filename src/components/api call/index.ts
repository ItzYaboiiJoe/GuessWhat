import { supabase } from "@/lib/supabaseClient";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const fetchImage = async () => {
  const res = await fetch(
    `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`,
    { cache: "no-store" }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();

  const { title, explanation, url } = data;

  const { error } = await supabase.from("ApodContent").insert([
    {
      Title: title,
      Description: explanation,
      ImageURL: url,
    },
  ]);

  if (error) {
    console.error("Error inserting data into Supabase:", error);
  } else {
    console.log("Data inserted successfully into Supabase");
  }

  return data;
};

fetchImage().then(console.log).catch(console.error);

export default fetchImage;
