"use client";
import { APP_NAME } from "@/lib/constants";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      {/* Background Layer */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/Space.svg')",
        }}
      />

      {/* Content */}
      <Image
        src={"/images/QuestionMark.svg"}
        width={48}
        height={48}
        alt={`${APP_NAME} logo`}
        priority={true}
      />
      <div className="p-6 rounded-lg shadow-md text-center backdrop-blur-sm bg-black/40">
        <h1 className="text-3xl font-bold mb-4 text-white">Not Found</h1>
        <p className="text-pink-400">Could not find requested page</p>
        <Link href={"/"} passHref>
          <Button
            variant={"outline"}
            className="mt-4 ml-2 hover:opacity-70 cursor-pointer"
          >
            Back To Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
