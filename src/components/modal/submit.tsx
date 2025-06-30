import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";
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

const SubmitAnswer = ({
  open,
  onOpenChange,
  selectedAnswer,
  answerDecision,
  setDescription,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedAnswer?: string;
  answerDecision?: string;
  setDescription: (desc: string) => void;
}) => {
  const [content, setContent] = useState<{
    Description: string;
    Title: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      const { data, error } = await supabase
        .from("ApodContent")
        .select("*")
        .order("id", { ascending: false })
        .limit(1)
        .single();
      if (error || !data) {
        setError("Error, could not retrieve todays Apod");
      } else {
        setContent(data);
        setDescription(data.Description);
      }
    };
    fetchContent();
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!content || !open) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto bg-[#1a1a2e] text-white border border-purple-600 shadow-xl">
        <DialogHeader>
          <DialogTitle
            className={
              (answerDecision === "Correct Answer Selected!"
                ? "text-green-600 "
                : answerDecision === "Incorrect Answer."
                ? "text-red-600 "
                : "") + "text-center"
            }
          >
            {answerDecision === "Correct Answer Selected!"
              ? "Correct!"
              : answerDecision === "Incorrect Answer."
              ? "Incorrect"
              : "Answer Submitted"}
          </DialogTitle>
          <DialogDescription asChild>
            <div className="flex flex-col items-center">
              <p className="text-center">You selected: {selectedAnswer}</p>
              {answerDecision !== "Correct Answer Selected!" && (
                <p className="text-center text-gray-400">
                  Correct Answer Was: {content.Title}
                </p>
              )}
            </div>
          </DialogDescription>
          <Accordion type="single" collapsible className="mt-4 w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Show Details</AccordionTrigger>
              <AccordionContent>{content.Description}</AccordionContent>
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

export default SubmitAnswer;
