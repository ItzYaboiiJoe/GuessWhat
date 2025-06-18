"use client";

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
                  value.length > 12 ? value.slice(0, 12) + "…" : value
                }
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
              <Bar dataKey="total" fill="url(#barGradient)" radius={6} />
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
