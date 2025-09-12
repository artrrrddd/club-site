"use client";

import React from "react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { useIsMobile } from "@/hooks/useIsMobile";

interface PricingTier {
  name: string;
  specs: string;
  periods: {
    time: string;
    duration: string;
    weekdays: number;
    weekends: number;
  }[];
  nightPrice?: {
    weekdays?: number;
    weekends: number;
  };
}

interface ConsoleRental {
  duration: string;
  price: number;
}

const pricingData: PricingTier[] = [
  {
    name: "STANDART",
    specs: "RTX 4060, CORE i5 12400F, RAM 16/32GB, 180Hz/165Hz монитор, 24 G102",
    periods: [
      {
        time: "11:00-17:00",
        duration: "1 час",
        weekdays: 110,
        weekends: 120,
      },
      {
        time: "11:00-14:00",
        duration: "3 часа",
        weekdays: 150,
        weekends: 200,
      },
      {
        time: "14:00-17:00",
        duration: "3 часа",
        weekdays: 270,
        weekends: 320,
      },
      {
        time: "11:00-17:00",
        duration: "5 часов",
        weekdays: 420,
        weekends: 500,
      },
      {
        time: "17:00-08:00",
        duration: "1 час",
        weekdays: 120,
        weekends: 130,
      },
      {
        time: "17:00-08:00",
        duration: "3 часа",
        weekdays: 320,
        weekends: 360,
      },
      {
        time: "17:00-08:00",
        duration: "5 часов",
        weekdays: 500,
        weekends: 550,
      },
    ],
    nightPrice: {
      weekends: 600,
    },
  },
  {
    name: "VIP ZONE",
    specs: "RTX 4060ti, CORE i5 12400F, RAM 32GB, 2K 180Hz монитор, 27 MSI GM50",
    periods: [
      {
        time: "11:00-17:00",
        duration: "1 час",
        weekdays: 140,
        weekends: 150,
      },
      {
        time: "11:00-14:00",
        duration: "3 часа",
        weekdays: 240,
        weekends: 300,
      },
      {
        time: "14:00-17:00",
        duration: "3 часа",
        weekdays: 330,
        weekends: 370,
      },
      {
        time: "11:00-17:00",
        duration: "5 часов",
        weekdays: 500,
        weekends: 550,
      },
      {
        time: "17:00-08:00",
        duration: "1 час",
        weekdays: 150,
        weekends: 160,
      },
      {
        time: "17:00-08:00",
        duration: "3 часа",
        weekdays: 370,
        weekends: 400,
      },
      {
        time: "17:00-08:00",
        duration: "5 часов",
        weekdays: 550,
        weekends: 600,
      },
    ],
    nightPrice: {
      weekends: 800,
    },
  },
];

const consoleRental: ConsoleRental[] = [
  { duration: "1 час", price: 300 },
  { duration: "2 часа", price: 500 },
  { duration: "3 часа", price: 650 },
];

export default function Pricing() {
  const isMobile = useIsMobile();

  return (
    <div className="px-5 py-16">
      <div className="max-w-7xl mx-auto">
        {/* Заголовок */}
        <h2 className="text-4xl font-bold text-white text-center mb-16">
          ТАРИФЫ
        </h2>

        {/* Основные тарифы */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {pricingData.map((tier, tierIndex) => (
            <PricingTierCard
              key={tier.name}
              tier={tier}
              isMobile={isMobile}
            />
          ))}
        </div>

        {/* Аренда TV + Консоль */}
        <ConsoleRentalCard rental={consoleRental} isMobile={isMobile} />
      </div>
    </div>
  );
}

const PricingTierCard = ({ tier, isMobile }: { tier: PricingTier; isMobile: boolean }) => {
  return (
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
      <div className="relative flex h-full flex-col overflow-hidden rounded-xl bg-black/80 p-6 shadow-[0_0_27px_0_rgba(45,45,45,0.35)]">
        {/* Заголовок зоны */}
        <h3 className="text-2xl font-bold text-white text-center mb-4">
          {tier.name}
        </h3>

        {/* Характеристики */}
        <p className="text-sm text-neutral-400 text-center mb-6">
          {tier.specs}
        </p>

        {/* Таблица цен */}
        <div className="space-y-4">
          {/* Заголовки таблицы */}
          <div className="grid grid-cols-4 gap-2 text-xs font-semibold text-neutral-300 border-b border-neutral-600 pb-2">
            <div>ПЕРИОД</div>
            <div>Пн-Чт</div>
            <div>Пт-Вс</div>
            <div>Время</div>
          </div>

          {/* Строки с ценами */}
          {tier.periods.map((period, index) => (
            <div key={index} className="grid grid-cols-4 gap-2 text-sm">
              <div className="text-neutral-300">{period.time}</div>
              <div className="text-white font-medium">{period.weekdays} ₽</div>
              <div className="text-white font-medium">{period.weekends} ₽</div>
              <div className="text-neutral-400">{period.duration}</div>
            </div>
          ))}

          {/* Ночной тариф */}
          {tier.nightPrice && (
            <div className="grid grid-cols-4 gap-2 text-sm border-t border-neutral-600 pt-2">
              <div className="text-neutral-300">23:00-08:00</div>
              <div className="text-neutral-500">-</div>
              <div className="text-white font-medium">{tier.nightPrice.weekends} ₽</div>
              <div className="text-neutral-400">Ночь</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ConsoleRentalCard = ({ rental, isMobile }: { rental: ConsoleRental[]; isMobile: boolean }) => {
  return (
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
      <div className="relative flex h-full flex-col overflow-hidden rounded-xl bg-black/80 p-6 shadow-[0_0_27px_0_rgba(45,45,45,0.35)]">
        {/* Заголовок */}
        <h3 className="text-2xl font-bold text-white text-center mb-6">
          АРЕНДА TV + КОНСОЛЬ
        </h3>

        {/* Таблица цен */}
        <div className="space-y-4">
          {rental.map((item, index) => (
            <div key={index} className="flex justify-between items-center py-2 border-b border-neutral-600 last:border-b-0">
              <span className="text-neutral-300">{item.duration}</span>
              <span className="text-white font-medium text-lg">{item.price} ₽</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
