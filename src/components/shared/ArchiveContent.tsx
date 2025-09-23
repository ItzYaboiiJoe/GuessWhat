"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "../ui/button";
import LearnMore from "../modal/learnMore";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type Props = {
  onBack: () => void;
};

type ApodContent = {
  id: number;
  ImageURL: string;
  Title: string;
  Description: string;
  created_at: string;
};

export default function ArchiveContent({ onBack }: Props) {
  const [content, setContent] = useState<ApodContent[]>([]);
  const [selectedItem, setSelectedItem] = useState<ApodContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [infoOpen, setInfoOpen] = useState(false);
  // These state controls image modal
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLatest() {
      setLoading(true);
      const { data } = await supabase
        .from("Apod_Content")
        .select("*")
        .order("id", { ascending: false })
        .range(1, 5);
      setContent((data as ApodContent[]) || []);
      setLoading(false);
    }
    fetchLatest();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen px-4 space-y-4">
        <div className="flex flex-col space-y-6 items-center p-6 bg-transparent border-2 shadow-xl rounded-xl w-full max-w-md text-white">
          <h1 className="text-3xl font-bold text-gray-900 leading-tight pb-2 relative">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
              Previous Challenges
            </span>
            <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500"></span>
          </h1>

          <Carousel className="w-full max-w-xs">
            <CarouselContent>
              {content.map((item) => (
                <CarouselItem key={item.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
                  >
                    <Image
                      src={item.ImageURL}
                      alt={item.Title}
                      width={512}
                      height={256}
                      priority
                      className="w-full h-64 object-cover rounded-md border border-gray-300 mb-2 cursor-pointer"
                      onClick={() => {
                        setSelectedImage(item.ImageURL);
                        setShowImageModal(true);
                      }}
                    />
                    <p className="text-left text-sm ml-2 text-gray-500">
                      Date: {item.created_at}
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.4, ease: "easeOut" }}
                    className="w-full mt-4"
                  >
                    <div className="flex justify-center items-center border border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-400">
                      {item.Title}
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.4, ease: "easeOut" }}
                  >
                    <Button
                      onClick={() => {
                        setSelectedItem(item);
                        setInfoOpen(true);
                      }}
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 rounded-md hover:opacity-70 transition-all cursor-pointer mt-6"
                      type="button"
                    >
                      Learn More
                    </Button>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-18" />
            <CarouselNext className="-right-18" />
          </Carousel>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.6, ease: "easeOut" }}
        >
          <Button
            variant="default"
            className="relative bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500 hover:cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left after:bg-gradient-to-r after:from-purple-500 after:to-pink-500"
            onClick={onBack}
          >
            Back to Current Challenge
          </Button>
        </motion.div>
      </div>
      <LearnMore
        infoOpen={infoOpen}
        setInfoOpen={setInfoOpen}
        title={selectedItem?.Title || "Error Fetching Title"}
        description={selectedItem?.Description || "Error Fetching Description"}
      />

      {/* This block controls the image modals */}
      <AnimatePresence>
        {showImageModal && selectedImage && (
          <motion.div
            key="archive-image-modal"
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setShowImageModal(false)}
          >
            <motion.div
              className="relative max-w-4xl max-h-[90vh] p-2"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="Selected Archive Image"
                width={1200}
                height={800}
                className="w-auto h-auto max-h-[85vh] rounded-md"
              />

              {/* X button */}
              <button
                className="absolute top-2 right-2 bg-gray-800 text-white rounded-full p-2 hover:bg-gray-700 hover:cursor-pointer"
                onClick={() => setShowImageModal(false)}
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
