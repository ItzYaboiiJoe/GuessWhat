//This file handles fetching answers from the Supabase database for the APOD content.

import { supabase } from "@/lib/supabaseClient";

export type ApodAnswers = {
  FirstAnswer: string;
  SecondAnswer: string;
  ThirdAnswer: string;
  FourthAnswer: string;
  CorrectAnswer: string;
};

export async function getAnswers(): Promise<ApodAnswers | null> {
  const { data, error } = await supabase
    .from("ApodContentAnswers")
    .select("*")
    .order("id", { ascending: false })
    .limit(1)
    .single();

  if (error || !data) {
    console.error("Failed to fetch answers:", error);
    return null;
  }

  return data;
}
