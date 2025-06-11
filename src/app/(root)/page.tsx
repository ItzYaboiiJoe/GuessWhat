import fetchImage from "@/components/api call";

const Home = async () => {
  const apod = await fetchImage();

  return (
    <div className="flex items-center justify-center min-h-screen">
      <img src={apod.url} alt={apod.title} />
    </div>
  );
};

export default Home;
