import fetchImage from "@/components/api call";
import { options } from "@/components/options";

// Function to get a random option from the options array
const getRandomOptions = (count: number) => {
  return options.sort(() => Math.random() - 0.5).slice(0, count);
};

// Main Home component
const Home = async () => {
  // Fetch the Astronomy Picture of the Day (APOD) data
  const apod = await fetchImage();

  //Grab 3 random incorrect answers from the options
  const incorrectAnswers = getRandomOptions(3);

  //Shuffle function to randomize the order of options
  const shuffle = (array: string[]) => {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  };

  // Will create a randomized list of options with the correct answer and 3 incorrect answers
  const optionsList = shuffle([...incorrectAnswers, apod.title]);

  // UI
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
        {/* The Red Background is a temp so I know the paddings and the size of the options when creating buttons */}
        <ul className="flex items-center flex-col space-y-4 mt-10 p-3 bg-red-500 rounded-md">
          {optionsList.map((option, idx) => (
            <li key={idx}>{option}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
