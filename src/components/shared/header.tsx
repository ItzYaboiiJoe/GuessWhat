import Image from "next/image";
import Link from "next/link";
import { APP_NAME } from "@/lib/constants";
import AboutButton from "./about";

const Header = () => {
  return (
    <header className="w-full bg-gray-800">
      <div className="max-w-screen-xl mx-auto px-4 py-2 flex justify-between items-center">
        <div className="flex items-center">
          <Link href={"/"} className="flex items-center">
            <Image
              src="/images/QuestionMark.svg"
              alt={`${APP_NAME} logo`}
              height={48}
              width={48}
              priority={true}
            />
            <div className="hidden lg:block font-bold text-2xl ml-3 text-white">
              {APP_NAME}
            </div>
          </Link>
        </div>
        <AboutButton />
      </div>
    </header>
  );
};

export default Header;
