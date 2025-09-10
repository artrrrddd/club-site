"use client";

import React, { memo } from "react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import Image from "next/image"

type Item = {
  area: string;                 // tailwind arbitrary grid-area
  title: string;
  description: React.ReactNode;
  icon?: React.ReactNode;
};

const items: Item[] = [
  {
    area: "[grid-area:1/1/2/2]",
    icon: <Image src="/designComponents/gpu.svg" alt="GPU" width={110} height={110} />,
    title: "Do things the right way",
    description: "Running out of copy so I'll write anything.",
  },
  {
    area: "[grid-area:1/2/2/3]",
    icon: <Image src="/designComponents/gpu.svg" alt="GPU" width={110} height={110} />,
    title: "The best AI code editor ever.",
    description:
      "Yes, it's true. I'm not even kidding. Ask my mom if you don't believe me.",
  },
  {
    icon: <Image src="/designComponents/monik.svg" alt="GPU" width={110} height={110} />,

    area: "[grid-area:2/1/3/2]",
    title: "You should buy Aceternity UI Pro",
    description: "It's the best money you'll ever spend",
  },
  {
    area: "[grid-area:2/2/3/3]",
    icon: <Image src="/designComponents/monik.svg" alt="GPU" width={110} height={110} />,
    title: "This card is also built by Cursor",
    description:
      "I'm not even kidding. Ask my mom if you don't believe me.",
  },
  {
    area: "[grid-area:3/1/4/2]",
    icon: <Image src="/designComponents/klava.svg" alt="GPU" width={110} height={110} />,
    title: "Coming soon on Aceternity UI",
    description: "I'm writing the code as I record this, no shit.",
  },
  {
    area: "[grid-area:3/2/4/3]",
    icon: <Image src="/designComponents/klava.svg" alt="GPU" width={110} height={110} />,
    title: "Another amazing feature",
    description: "This is the sixth card to fill the grid properly.",
  },
];

export default function CardsGrid() {
  return (
    <ul className="grid grid-cols-1 gap-4 px-5
                   lg:grid-cols-2 lg:grid-rows-3">
      {items.map((it, i) => (
        <GridItem key={i} {...it} />
      ))}
    </ul>
  );
}

const GridItem = memo(function GridItem({
  area,
  icon,
  title,
  description,
}: Item) {
  return (
    <li className={`min-h-[14rem] list-none lg:${area}`}>
      <div className="relative h-full rounded-2xl border border-white/10 p-2 md:rounded-3xl md:p-3">
        <GlowingEffect
          // чуть легче для мобильных/низких FPS
          blur={0}
          borderWidth={2}
          spread={64}
          glow
          disabled={false}
          proximity={72}
          inactiveZone={0.08}
        />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden
                        rounded-xl p-6 md:p-6
                        bg-black/80 dark:bg-black/10
                        shadow-none dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
          <div className="flex flex-1 flex-col justify-between gap-3">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                {icon && (
                  <div className="w-fit">
                    {icon}
                  </div>
                )}
                <h3 className="pt-0.5 font-sans text-xl/[1.375rem] md:text-2xl/[1.875rem]
                               font-semibold -tracking-4 text-white">
                  {title}
                </h3>
              </div>
              <p className="font-sans text-sm/[1.125rem] md:text-base/[1.375rem]
                            text-neutral-400 [&_b]:md:font-semibold [&_strong]:md:font-semibold">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
});
