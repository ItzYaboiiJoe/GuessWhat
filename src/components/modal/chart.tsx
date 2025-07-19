"use client";

import { supabase } from "@/lib/supabaseClient";
import { answerCount } from "../answers/answerCount";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const chartConfig = {
  answers: {
    label: "answer",
    color: "blue",
  },
} satisfies ChartConfig;

type ChartReportProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  description?: string | null;
  title?: string | null;
};

const ChartReport = ({
  open,
  onOpenChange,
  description,
  title,
}: ChartReportProps) => {
  const [chartData, setChartData] = useState<
    { answer: string; total: number }[]
  >([]);

  useEffect(() => {
    if (!open) return;

    const fetchData = async () => {
      const counts = await answerCount();
      if (!counts) return;

      const data = Object.entries(counts).map(([answer, count]) => ({
        answer,
        total: count ?? 0,
      }));

      setChartData(data);
    };

    fetchData();

    const channel = supabase
      .channel("realtime-poll")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "ApodSpamPrevent",
        },
        () => {
          fetchData();
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
      supabase.removeChannel(channel);
    };
  }, [open]);

  const totalAnswers = chartData.reduce((sum, item) => sum + item.total, 0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto bg-[#1a1a2e] text-white border border-purple-600 shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
              Answer Results
            </span>
          </DialogTitle>
          <DialogDescription className="text-center text-gray-400">
            Correct Answer: {title}
          </DialogDescription>
          <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <BarChart accessibilityLayer data={chartData}>
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#a855f7" />{" "}
                  {/* from-purple-500 */}
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="answer"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) =>
                  value.length > 12 ? value.slice(0, 7) + "…" : value
                }
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="rounded-md px-3 py-2 bg-[#2a2a3b] text-white shadow-md border border-purple-600"
                    formatter={(value) => {
                      const num =
                        typeof value === "number" ? value : Number(value);
                      if (isNaN(num) || totalAnswers === 0) return "0%";
                      const percent = ((num / totalAnswers) * 100).toFixed(1);
                      return `${percent}%`;
                    }}
                  />
                }
              />
              <Bar dataKey="total" fill="url(#barGradient)" radius={6} />
            </BarChart>
          </ChartContainer>
          <Accordion type="single" collapsible className="mt-4 w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Learn More About {title}</AccordionTrigger>
              <AccordionContent>{description}</AccordionContent>
            </AccordionItem>
          </Accordion>
        </DialogHeader>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button
              type="button"
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 rounded-md hover:opacity-70 transition-all cursor-pointer"
            >
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChartReport;
