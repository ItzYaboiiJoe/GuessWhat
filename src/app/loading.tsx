import Image from "next/image";
import loader from "@/assets/loader.gif";

const LoadingPage = () => {
  return (
    <div className="bg-[#F8ECE1] flex justify-center items-center h-screen w-screen">
      <div className="relative w-[150px] h-[150px]">
        <Image
          src={loader}
          alt="Loading..."
          fill
          sizes="150px"
          style={{ objectFit: "contain" }}
        />
      </div>
    </div>
  );
};

export default LoadingPage;
