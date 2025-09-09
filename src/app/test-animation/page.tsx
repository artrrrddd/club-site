'use client';

import React from 'react';
import { Component as EtheralShadow } from '@/components/etheral-shadow';

export default function TestAnimationPage() {
  return (
    <div className="min-h-screen bg-black">
      <EtheralShadow
        color="rgba(220, 20, 60, 0.8)"
        animation={{ scale: 75, speed: 60 }}
        noise={{ opacity: 0.8, scale: 1.5 }}
        sizing="fill"
        className="h-screen"
      >
        <div className="text-center">
          <h1 className="text-6xl font-bold text-white mb-4">
            Тест анимации
          </h1>
          <p className="text-xl text-white/80">
            Если вы видите это, но нет анимации - проблема в компоненте
          </p>
        </div>
      </EtheralShadow>
    </div>
  );
}
