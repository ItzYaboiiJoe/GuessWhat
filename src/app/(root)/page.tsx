import { supabase } from "@/lib/supabaseClient";
import { options } from "@/components/options";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Function to get a random option from the options array
const getRandomOptions = (count: number) => {
  return options.sort(() => Math.random() - 0.5).slice(0, count);
};

// Function to get today's date in YYYY-MM-DD format
const getTodayDate = () => new Date().toISOString().split("T")[0];

// Main Home component
const Home = async () => {
  // Calling todays date function to get the current date
  const today = getTodayDate();

  // Fetch data from the ApodContent table in Supabase
  const { data, error } = await supabase
    .from("ApodContent")
    .select("*")
    .eq("created_at", today)
    .limit(1)
    .single();

  if (error || !data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">Error!!</p>
      </div>
    );
  }

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
  const optionsList = shuffle([...incorrectAnswers, data.Title]);

  // UI
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-purple-100 px-4">
      <div className="flex flex-col space-y-6 items-center p-6 bg-white shadow-xl rounded-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-900 leading-tight pb-2 relative">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
            What is this?
          </span>
          <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500"></span>
        </h1>

        <div className="w-full">
          <img
            src={data.ImageURL}
            alt={data.Title}
            className="w-full h-64 object-cover rounded-md border border-gray-300 mb-2"
          />
          <p className="text-left text-sm ml-1 text-gray-700">
            Dates: {data.created_at}
          </p>
        </div>

        <RadioGroup className="w-full space-y-3">
          {optionsList.map((option, idx) => (
            <div
              key={idx}
              className="flex items-center space-x-3 border border-gray-300 rounded-md px-4 py-2 hover:border-purple-500 hover:bg-purple-100 transition-all"
            >
              <RadioGroupItem value={option} id={`option-${idx}`} />
              <Label
                htmlFor={`option-${idx}`}
                className="text-sm font-medium text-gray-700 cursor-pointer w-full"
              >
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>

        <Button className="w-full mt-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 rounded-md hover:opacity-90 transition-all">
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Home;
