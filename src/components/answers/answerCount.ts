import { supabase } from "@/lib/supabaseClient";
import { getAnswers } from "./answers";

export async function answerCount(): Promise<Record<
  string,
  number | null
> | null> {
  const answers = await getAnswers();
  if (!answers) return null;

  const fetchCount = async (answer: string) => {
    const { count, error } = await supabase
      .from("ApodSpamPrevent")
      .select("*", { count: "exact", head: true })
      .eq("Answer", answer)
      .eq("created_at", answers.created_at);

    if (error) {
      console.error(`Error fetching count for ${answer}:`, error.message);
      return null;
    }

    return count;
  };

  const [first, second, third, fourth] = await Promise.all([
    fetchCount(answers.FirstAnswer),
    fetchCount(answers.SecondAnswer),
    fetchCount(answers.ThirdAnswer),
    fetchCount(answers.FourthAnswer),
  ]);

  return {
    [answers.FirstAnswer]: first,
    [answers.SecondAnswer]: second,
    [answers.ThirdAnswer]: third,
    [answers.FourthAnswer]: fourth,
  };
}
