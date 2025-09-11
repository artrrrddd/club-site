"use client";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

const words = `Киберпространство принципиально нового уровня, созданное для твоих побед.`;

export function TextGenerateEffectDemo() {
  return (
    <div className="text-white text-center">
      <TextGenerateEffect 
        words={words} 
        className="text-white text-lg font-medium"
        duration={0.3}
        filter={false}
      />
    </div>
  );
}
