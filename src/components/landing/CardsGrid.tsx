"use client";

import React from "react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import Image from "next/image";
import { useIsMobile } from "@/hooks/useIsMobile";

type Item = {
  area: string;                 // tailwind arbitrary grid-area
  title: string;
  description: React.ReactNode;
  icon?: React.ReactNode;
};

type GridItemProps = Item & {
  isMobile: boolean;
};

const leftColumnItems: Item[] = [
  {
    area: "[grid-area:1/1/2/2]",
    icon: <Image src="/designComponents/gpu.svg" alt="GPU" width={110} height={110} />,
    title: "Видеокарта и процессор GPU + CPU",
    description: "Intel Core i5-13400F идеальный баланс для игр и многозадачности. NVIDIA GeForce RTX 4060 - поддержка DLSS 3 и лучей трассировка для невероятной графики в Full HD.",
  },
  {
    icon: <Image src="/designComponents/monik.svg" alt="GPU" width={110} height={110} />,
    area: "[grid-area:2/1/3/2]",
    title: "Монитор",
    description: `24-25" | 165 Гц | Full HD (1920х1080)`,
  },
  {
    area: "[grid-area:3/1/4/2]",
    icon: <Image src="/designComponents/klava.svg" alt="GPU" width={110} height={110} />,
    title: "Клавиатура и мышь",
    description: "Профессиональная игровая периферия: мышь - G102, клава, ковер — все для твоей точности.",
  },
];

const rightColumnItems: Item[] = [
  {
    area: "[grid-area:1/1/2/2]",
    icon: <Image src="/designComponents/gpu.svg" alt="GPU" width={110} height={110} />,
    title: "Видеокарта и процессор GPU + CPU",
    description:
      "Intel Core i5-13400F стабильная и мощная основа. NVIDIA GeForce RTX 4060 Ti / 5060ti— настоящая топовая мощь для разрешения 2К!",
  },
  {
    area: "[grid-area:2/1/3/2]",
    icon: <Image src="/designComponents/monik.svg" alt="GPU" width={110} height={110} />,
    title: "Монитор",
    description:
      `27" | 180 Гц | QHD (2560х1440) - в 1.7 раза детальнее, чем Full HD!`,
  },
  {
    area: "[grid-area:3/1/4/2]",
    icon: <Image src="/designComponents/klava.svg" alt="GPU" width={110} height={110} />,
    title: "Клавиатура и мышь",
    description: "Профессиональная игровая периферия: мышь - MSI GM50, клава, ковер — все для твоей точности.",
  },
];

export default function CardsGrid() {
  const isMobile = useIsMobile();
  
  return (
    <div className="px-5">
      {/* Контейнер с двумя секциями */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Левая секция - Основной зал */}
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold text-white text-center mb-12">
            Основной зал
          </h2>
          <ul className="grid grid-cols-1 gap-4">
            {leftColumnItems.map((it, i) => (
              <GridItem key={i} {...it} isMobile={isMobile} />
            ))}
          </ul>
        </div>

        {/* Правая секция - VIP-зона */}
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold text-white text-center mb-12">
            VIP-зона
          </h2>
          <ul className="grid grid-cols-1 gap-4">
            {rightColumnItems.map((it, i) => (
              <GridItem key={i} {...it} isMobile={isMobile} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

const GridItem = ({ area, icon, title, description, isMobile }: GridItemProps) => {
  return (
    <li className={`list-none ${area}`}>
      <div className="relative h-full rounded-2xl border border-white/20 p-2 md:rounded-3xl md:p-3">
        <GlowingEffect
          blur={0}
          borderWidth={2}
          spread={64}
          glow
          disabled={isMobile}
          proximity={72}
          inactiveZone={0.08}
        />

        {/* Темно-серая кайма по всему периметру */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl">
          <div className="absolute inset-0 rounded-2xl opacity-60 blur-[4px] bg-[radial-gradient(ellipse_at_center,transparent_60%,#2a2a2a_80%,#1a1a1a_100%)]" />
        </div>

        {/* Содержимое карточки */}
        <div className="relative flex h-full flex-col gap-6 overflow-hidden rounded-xl
                        bg-black/80 p-6 md:p-6
                        shadow-[0_0_27px_0_rgba(45,45,45,0.35)]">
          <div className="flex items-start gap-3">
            {/* Маленькая квадратная плашка под иконку */}
              {icon}
            <h3 className="pt-0.5 font-sans text-xl/[1.375rem] md:text-2xl/[1.875rem]
                           font-semibold -tracking-4 text-white">
              {title}
            </h3>
          </div>

          <p className="font-sans text-sm/[1.125rem] md:text-base/[1.375rem] text-neutral-400">
            {description}
          </p>
        </div>
      </div>
    </li>
  );
};
