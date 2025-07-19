"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import AnswerForm from "@/components/answers";
import { getAnswers } from "@/components/answers/answers";
import { motion } from "motion/react";
import { ApodAnswers } from "@/components/answers/answers";
import { Button } from "../ui/button";
import Link from "next/link";

type ApodContent = {
  id: number;
  ImageURL: string;
  Title: string;
  created_at: string;
};

export default function LiveContent() {
  const [content, setContent] = useState<ApodContent | null>(null);
  const [answers, setAnswers] = useState<ApodAnswers | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch latest content and answers on mount
  useEffect(() => {
    async function fetchLatest() {
      setLoading(true);
      const { data } = await supabase
        .from("ApodContent")
        .select("*")
        .order("id", { ascending: false })
        .limit(1)
        .single();
      setContent(data);
      const latestAnswers = await getAnswers();
      setAnswers(latestAnswers);
      setLoading(false);
    }
    fetchLatest();
  }, []);

  // Listen for new inserts and update content/answers
  useEffect(() => {
    const channelId = `realtime:apodcontent-${Date.now()}`;
    const channel = supabase
      .channel(channelId)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "ApodContent",
        },
        async (payload) => {
          const newRow = payload.new as ApodContent;
          setContent((prev) =>
            !prev || newRow.created_at > prev.created_at ? newRow : prev
          );

          setLoading(true);
          const latestAnswers = await getAnswers();
          setAnswers(latestAnswers);
          setLoading(false);
        }
      )
      .subscribe();
    return () => {
      channel.unsubscribe();
    };
  }, []);

  if (loading || !content || !answers) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 space-y-4">
      {/* Card */}
      <motion.div
        className="flex flex-col space-y-6 items-center p-6 bg-transparent border-2 shadow-xl rounded-xl w-full max-w-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1 className="text-3xl font-bold text-gray-900 leading-tight pb-2 relative">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
            What is this?
          </span>
          <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500"></span>
        </h1>

        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
        >
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
        </motion.div>

        <AnswerForm answers={answers} createdAt={content.created_at} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3, duration: 0.6, ease: "easeOut" }}
      >
        {/* Display Archive Page */}
        <Button
          variant="link"
          className="relative bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500 hover:cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left after:bg-gradient-to-r after:from-purple-500 after:to-pink-500"
        >
          <Link href={"/archive"}>View Previous Questions</Link>
        </Button>
      </motion.div>
    </div>
  );
}
