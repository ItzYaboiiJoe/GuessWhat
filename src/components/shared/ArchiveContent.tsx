"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { supabase } from "@/lib/supabaseClient";
import { getAnswers } from "@/components/answers/answers";
import { ApodAnswers } from "@/components/answers/answers";
import { Button } from "../ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type Props = {
  onBack: () => void;
};

type ApodContent = {
  id: number;
  ImageURL: string;
  Title: string;
  created_at: string;
};

export default function ArchiveContent({ onBack }: Props) {
  const [content, setContent] = useState<ApodContent[]>([]);
  const [answers, setAnswers] = useState<ApodAnswers | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLatest() {
      setLoading(true);
      const { data } = await supabase
        .from("ApodContent")
        .select("*")
        .order("id", { ascending: false })
        .limit(5);
      setContent((data as ApodContent[]) || []);
      const latestAnswers = await getAnswers();
      setAnswers(latestAnswers);
      setLoading(false);
    }
    fetchLatest();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 space-y-4">
      <div className="flex flex-col space-y-6 items-center p-6 bg-transparent border-2 shadow-xl rounded-xl w-full max-w-md text-white">
        <h1 className="text-3xl font-bold text-gray-900 leading-tight pb-2 relative">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
            Previous Quiz
          </span>
          <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500"></span>
        </h1>

        <Carousel className="w-full max-w-xs">
          <CarouselContent>
            {content.map((item) => (
              <CarouselItem key={item.id}>
                <Image
                  src={item.ImageURL}
                  alt={item.Title}
                  width={512}
                  height={256}
                  priority
                  className="w-full h-64 object-cover rounded-md border border-gray-300 mb-2"
                />
                <p className="text-left text-sm ml-2 text-gray-500">
                  Date: {item!.created_at}
                </p>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      <Button
        variant="link"
        className="relative bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500 hover:cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left after:bg-gradient-to-r after:from-purple-500 after:to-pink-500"
        onClick={onBack}
      >
        Back to Current Quiz
      </Button>
    </div>
  );
}
