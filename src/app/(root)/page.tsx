import fetchImage from "@/components/api call";

const Home = async () => {
  const apod = await fetchImage();

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col space-y-4 items-center mb-50">
        <h1 className="text-2xl mb-10">What is this?</h1>
        <img src={apod.url} alt={apod.title} className="w-lg" />
        <ul className="flex items-center flex-col space-y-4 mt-10">
          <li>Option A</li>
          <li>{apod.title}</li>
          <li>Option C</li>
          <li>Option D</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
