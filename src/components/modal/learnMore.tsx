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

type LearnMoreProps = {
  infoOpen: boolean;
  setInfoOpen: (open: boolean) => void;
  title: string;
  description: string;
};

const LearnMore = ({
  infoOpen,
  setInfoOpen,
  title,
  description,
}: LearnMoreProps) => {
  return (
    <Dialog open={infoOpen} onOpenChange={setInfoOpen}>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto bg-[#1a1a2e] text-white border border-purple-600 shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
              Learn More About {title}
            </span>
          </DialogTitle>
          <DialogDescription className="mt-5">{description}</DialogDescription>
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

export default LearnMore;
