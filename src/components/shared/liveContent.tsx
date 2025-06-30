"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import AnswerForm from "@/components/answers";

type ApodContent = {
  id: number;
  ImageURL: string;
  Title: string;
  created_at: string;
};

type Props = {
  initialContent: ApodContent;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  answers: any;
};

export default function LiveContent({ initialContent, answers }: Props) {
  const [content, setContent] = useState(initialContent);

  useEffect(() => {
    const channel = supabase
      .channel("realtime:apodcontent")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "ApodContent",
        },
        (payload) => {
          const newRow = payload.new as ApodContent;
          if (newRow.created_at > content.created_at) {
            setContent(newRow);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [content.created_at]);

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="flex flex-col space-y-6 items-center p-6 bg-transparent border-2 shadow-xl rounded-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-900 leading-tight pb-2 relative">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
            What is this?
          </span>
          <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500"></span>
        </h1>

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

        <AnswerForm answers={answers} createdAt={content.created_at} />
      </div>
    </div>
  );
}
