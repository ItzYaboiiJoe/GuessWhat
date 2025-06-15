"use client";

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
import { useState } from "react";

const formSchema = z.object({
  answer: z.string().nonempty("Please select an answer."),
});

export default function AnswerForm({ answers }: { answers: ApodAnswers }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | undefined>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const options = [
    answers.FirstAnswer,
    answers.SecondAnswer,
    answers.ThirdAnswer,
    answers.FourthAnswer,
  ];

  function onSubmit(values: z.infer<typeof formSchema>) {
    setSelectedAnswer(values.answer);
    setModalOpen(true);
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
                      <div key={idx} className="w-full">
                        <input
                          type="radio"
                          name="answer"
                          value={option}
                          id={`option-${idx}`}
                          className="peer hidden"
                          checked={field.value === option}
                          onChange={() => field.onChange(option)}
                        />
                        <FormLabel
                          htmlFor={`option-${idx}`}
                          className="flex justify-center items-center border border-gray-300 rounded-md px-4 py-2 transition-all cursor-pointer w-full
    hover:border-purple-500 hover:bg-purple-100
    peer-checked:border-purple-500 peer-checked:bg-purple-100
    text-sm font-medium text-gray-700"
                        >
                          {option}
                        </FormLabel>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 rounded-md hover:opacity-90 transition-all cursor-pointer"
          >
            Submit
          </Button>
        </form>
      </Form>
      <SubmitAnswer
        open={modalOpen}
        onOpenChange={setModalOpen}
        selectedAnswer={selectedAnswer}
      />
    </>
  );
}
