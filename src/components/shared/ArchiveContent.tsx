"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { getAnswers } from "@/components/answers/answers";
import { ApodAnswers } from "@/components/answers/answers";
import { Button } from "../ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
  const [content, setContent] = useState<ApodContent | null>(null);
  const [answers, setAnswers] = useState<ApodAnswers | null>(null);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="flex flex-col items-center space-y-4 w-full">
      <div className="flex flex-col space-y-6 items-center p-6 bg-transparent border-2 shadow-xl rounded-xl w-full max-w-md text-white">
        <h2 className="text-2xl font-bold text-center">Previous Questions</h2>

        <Carousel className="w-full max-w-xs">
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <span className="text-4xl font-semibold">
                        {index + 1}
                      </span>
                    </CardContent>
                  </Card>
                </div>
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
        Back to Today
      </Button>
    </div>
  );
}
