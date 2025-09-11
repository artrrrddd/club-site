"use client";
import { TypewriterEffectSmooth } from "./ui/typewriter-effect";
import { useIsMobile } from "../hooks/useIsMobile";

export function TypewriterEffectSmoothDemo() {
  const isMobile = useIsMobile();
  
  const words = [
    {
      text: "Киберпространство,",
      className: "text-white",
    },
    {
      text: "созданное",
      className: "text-white",
    },
    {
      text: "для",
      className: "text-white",
    },
      {
        text: "твоих",
        className: "text-crimson",
      },
    {
      text: "побед.",
      className: "text-white",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[15rem] sm:h-[20rem] px-2 sm:px-4 w-full max-w-full">
      {isMobile ? (
        <div className="text-center">
          <h1 className="text-2xl sm:text-4xl font-bold leading-tight">
            <span className="text-white">Киберпространство,</span>{" "}
            <span className="text-white">созданное</span>{" "}
            <span className="text-white">для</span>{" "}
            <span className="text-crimson">твоих</span>{" "}
            <span className="text-white">побед.</span>
          </h1>
        </div>
      ) : (
        <TypewriterEffectSmooth words={words} />
      )}
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 space-x-0 sm:space-x-4 mt-4 sm:mt-6">
        
        <button className="w-32 sm:w-40 h-8 sm:h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-xs sm:text-sm">
        </button>
      </div>
    </div>
  );
}
