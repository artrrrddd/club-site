"use client";
import { TypewriterEffectSmooth } from "./ui/typewriter-effect";
export function TypewriterEffectSmoothDemo() {
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
      
      <TypewriterEffectSmooth words={words} />
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 space-x-0 sm:space-x-4 mt-4 sm:mt-6">
        <button className="w-32 sm:w-40 h-8 sm:h-10 rounded-xl bg-crimson text-white border border-black text-base sm:text-lg font-titillium">
          Забронировать
        </button>
        <button className="w-32 sm:w-40 h-8 sm:h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-xs sm:text-sm">
        </button>
      </div>
    </div>
  );
}
