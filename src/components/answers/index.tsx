"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ApodAnswers } from "@/components/answers/answers";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup } from "@/components/ui/radio-group";
import SubmitAnswer from "../modal/submit";
import { spamPrevent } from "./spamPrevent";
import ChartReport from "../modal/chart";
import { motion } from "motion/react";

const formSchema = z.object({
  answer: z.string().nonempty("Please select an answer."),
});

export default function AnswerForm({
  answers,
  createdAt,
}: {
  answers: ApodAnswers;
  createdAt: string;
}) {
  const [ResultsOpen, setResultsOpen] = useState(false);
  const [chartOpen, setChartOpen] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | undefined>();
  const [answerDecision, setAnswerDecision] = useState<string>("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [description, setDescription] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const todayApodDate = createdAt;

  const options = [
    answers.FirstAnswer,
    answers.SecondAnswer,
    answers.ThirdAnswer,
    answers.FourthAnswer,
  ];

  // Check if the user already submitted
  useEffect(() => {
    const submitted = localStorage.getItem("createdAt");
    if (submitted === todayApodDate) {
      setHasSubmitted(true);
    }
  }, [todayApodDate]);

  // Handle form submission
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setSelectedAnswer(values.answer);
    setResultsOpen(true);

    if (values.answer === answers.CorrectAnswer) {
      setAnswerDecision("Correct Answer Selected!");
    } else {
      setAnswerDecision("Incorrect Answer.");
    }

    await spamPrevent(values.answer);

    // Save submission flag in localStorage
    localStorage.setItem("createdAt", todayApodDate);
    setHasSubmitted(true);
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-full max-w-md mx-auto"
        >
          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    className="space-y-3"
                    defaultValue={field.value}
                  >
                    {options.map((option, idx) => (
                      <motion.div
                        key={idx}
                        className="w-full"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: idx * 0.15,
                          duration: 0.4,
                          ease: "easeOut",
                        }}
                      >
                        <input
                          type="radio"
                          name="answer"
                          value={option}
                          id={`option-${idx}`}
                          className="peer hidden"
                          checked={field.value === option}
                          onChange={() =>
                            !hasSubmitted && field.onChange(option)
                          }
                          disabled={hasSubmitted}
                        />
                        <FormLabel
                          htmlFor={`option-${idx}`}
                          className="flex justify-center items-center border border-gray-300 rounded-md px-4 py-2 transition-all cursor-pointer w-full
        hover:border-purple-500 hover:bg-purple-100
        peer-checked:border-purple-500 peer-checked:bg-purple-100
        text-sm font-medium text-gray-400 hover:text-gray-700"
                        >
                          {option}
                        </FormLabel>
                      </motion.div>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.4, ease: "easeOut" }}
          >
            {hasSubmitted ? (
              <Button
                onClick={() => setChartOpen(true)}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 rounded-md hover:opacity-70 transition-all cursor-pointer"
                type="button"
              >
                View Results
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 rounded-md hover:opacity-70 transition-all cursor-pointer"
              >
                Submit
              </Button>
            )}
          </motion.div>

          {hasSubmitted && (
            <motion.p
              className="text-center text-sm text-gray-400 mt-2"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.3 }}
            >
              You’ve already submitted your answer for today!
            </motion.p>
          )}
        </form>
      </Form>

      <SubmitAnswer
        open={ResultsOpen}
        onOpenChange={setResultsOpen}
        selectedAnswer={selectedAnswer}
        answerDecision={answerDecision}
        setDescription={setDescription}
      />
      <ChartReport
        open={chartOpen}
        onOpenChange={setChartOpen}
        description={description}
        title={answers.CorrectAnswer}
      />
    </>
  );
}
