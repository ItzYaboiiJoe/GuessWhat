import { supabase } from "@/lib/supabaseClient";
import { getAnswers } from "@/components/answers/answers";
import LiveContent from "@/components/shared/LiveContent";

export default async function Home() {
  const { data: content, error } = await supabase
    .from("ApodContent")
    .select("*")
    .order("id", { ascending: false })
    .limit(1)
    .single();

  const answers = await getAnswers();

  if (error || !content || !answers) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">Error: could not retrieve today’s APOD.</p>
      </div>
    );
  }

  return <LiveContent initialContent={content} answers={answers} />;
}
