"use client";

import { useEffect, useState } from "react";
import { getAnswers } from "../answers/answers";
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
};

const ChartReport = ({ open, onOpenChange }: ChartReportProps) => {
  const [chartData, setChartData] = useState<
    { answer: string; total: number }[]
  >([]);

  useEffect(() => {
    const fetchAnswers = async () => {
      const answers = await getAnswers();
      if (!answers) return;

      const data = [
        { answer: answers.FirstAnswer, total: 120 },
        { answer: answers.SecondAnswer, total: 90 },
        { answer: answers.ThirdAnswer, total: 60 },
        { answer: answers.FourthAnswer, total: 30 },
      ];

      setChartData(data);
    };

    fetchAnswers();
  }, []);

  const totalAnswers = chartData.reduce((sum, item) => sum + item.total, 0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
              Answer Poll
            </span>
          </DialogTitle>
          <DialogDescription></DialogDescription>
          <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="answer"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
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
              <Bar dataKey="total" fill="var(--color-answers)" radius={6} />
            </BarChart>
          </ChartContainer>
        </DialogHeader>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button
              type="button"
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 rounded-md hover:opacity-90 transition-all cursor-pointer"
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
