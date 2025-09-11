import { supabase } from "@/lib/supabaseClient";

export async function spamPrevent(answer: string): Promise<string | null> {
  const { data: content, error } = await supabase
    .from("Apod_Content")
    .select("*")
    .order("id", { ascending: false })
    .limit(1)
    .single();

  if (error || !content) {
    console.error("Failed to fetch content:", error);
    return null;
  }

  const { error: dateError } = await supabase.from("Apod_SpamPrevent").insert([
    {
      created_at: content.created_at,
      Answer: answer,
    },
  ]);

  if (dateError) {
    console.error("Failed to insert spam prevent:", dateError);
  }

  return content;
}
