import { Button } from "../ui/button";
import Link from "next/link";

const AboutButton = () => {
  return (
    <div className="flex justify-end gap-3">
      <Button
        asChild
        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 rounded-md hover:opacity-90 transition-all cursor-pointer"
      >
        <Link href={"/about"}>About</Link>
      </Button>
    </div>
  );
};

export default AboutButton;
