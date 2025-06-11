import fetchImage from "@/components/api call";
import { options } from "@/components/options";

const getRandomOption = () =>
  options[Math.floor(Math.random() * options.length)];

const Home = async () => {
  const apod = await fetchImage();

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col space-y-4 items-center mb-50">
        <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-2 pb-4 relative mb-5">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
            What is this?
          </span>
          <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500"></span>
        </h1>
        <img src={apod.url} alt={apod.title} className="w-lg" />
        <ul className="flex items-center flex-col space-y-4 mt-10 p-3 bg-red-500 rounded-md">
          <li>{getRandomOption()}</li>
          <li>{apod.title}</li>
          <li>{getRandomOption()}</li>
          <li>{getRandomOption()}</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
