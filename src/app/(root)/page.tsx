import { supabase } from "@/lib/supabaseClient";
import { getAnswers } from "@/components/answers/answers";
import AnswerForm from "@/components/answers";
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

  //fetching answers
  const answers = await getAnswers();

  // Error handling for content data
  if (noContent || !content || !answers) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">Error, could not retrieve todays Apod</p>
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
            priority
            className="w-full h-64 object-cover rounded-md border border-gray-300 mb-2"
          />
          <p className="text-left text-sm ml-2 text-gray-500">
            Date: {content.created_at}
          </p>
        </div>

        {/* Answers Section */}
        <AnswerForm answers={answers} />
      </div>
    </div>
  );
};

export default Home;
