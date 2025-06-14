import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";

// Main Home component
const Home = async () => {
  // Fetch data from the ApodContent table in Supabase
  const { data: content, error: noContent } = await supabase
    .from("ApodContent")
    .select("*")
    .order("id", { ascending: false })
    .limit(1)
    .single();

  //Fetch the answer selection from ApodContentAnswers table
  const { data: answers, error: noAnswers } = await supabase
    .from("ApodContentAnswers")
    .select("*")
    .order("id", { ascending: false })
    .limit(1)
    .single();

  // Error handling for content and answers data
  if (noContent || !content) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">Error, could not retrieve todays Apod</p>
      </div>
    );
  }

  if (noAnswers || !answers) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">Error, could not retrieve Answers</p>
      </div>
    );
  }

  // UI
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-purple-100 px-4">
      <div className="flex flex-col space-y-6 items-center p-6 bg-white shadow-xl rounded-xl w-full max-w-md">
        {/* Title Section */}
        <h1 className="text-3xl font-bold text-gray-900 leading-tight pb-2 relative">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
            What is this?
          </span>
          <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500"></span>
        </h1>

        {/* Image Date Section */}
        <div className="w-full">
          <Image
            src={content.ImageURL}
            alt={content.Title}
            width={512}
            height={256}
            className="w-full h-64 object-cover rounded-md border border-gray-300 mb-2"
          />
          <p className="text-left text-sm ml-1 text-gray-700">
            Date: {content.created_at}
          </p>
        </div>

        {/* Answers Section */}
        {answers && (
          <RadioGroup className="w-full space-y-3" defaultValue="">
            <Label
              htmlFor="option-1"
              className="flex items-center space-x-3 border border-gray-300 rounded-md px-4 py-2 hover:border-purple-500 hover:bg-purple-100 transition-all cursor-pointer w-full"
            >
              <RadioGroupItem
                value={answers.FirstAnswer}
                id="option-1"
                className="peer hidden"
              />
              <span className="text-sm font-medium text-gray-700 peer-checked:text-purple-600">
                {answers.FirstAnswer}
              </span>
            </Label>

            <Label
              htmlFor="option-2"
              className="flex items-center space-x-3 border border-gray-300 rounded-md px-4 py-2 hover:border-purple-500 hover:bg-purple-100 transition-all cursor-pointer w-full"
            >
              <RadioGroupItem
                value={answers.SecondAnswer}
                id="option-2"
                className="peer hidden"
              />
              <span className="text-sm font-medium text-gray-700 peer-checked:text-purple-600">
                {answers.SecondAnswer}
              </span>
            </Label>

            <Label
              htmlFor="option-3"
              className="flex items-center space-x-3 border border-gray-300 rounded-md px-4 py-2 hover:border-purple-500 hover:bg-purple-100 transition-all cursor-pointer w-full"
            >
              <RadioGroupItem
                value={answers.ThirdAnswer}
                id="option-3"
                className="peer hidden"
              />
              <span className="text-sm font-medium text-gray-700 peer-checked:text-purple-600">
                {answers.ThirdAnswer}
              </span>
            </Label>

            <Label
              htmlFor="option-4"
              className="flex items-center space-x-3 border border-gray-300 rounded-md px-4 py-2 hover:border-purple-500 hover:bg-purple-100 transition-all cursor-pointer w-full"
            >
              <RadioGroupItem
                value={answers.FourthAnswer}
                id="option-4"
                className="peer hidden"
              />
              <span className="text-sm font-medium text-gray-700 peer-checked:text-purple-600">
                {answers.FourthAnswer}
              </span>
            </Label>
          </RadioGroup>
        )}

        <Button className="w-full mt-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 rounded-md hover:opacity-90 transition-all cursor-pointer">
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Home;
