'use client';

import React from 'react';
import { Component as EtheralShadow } from '@/components/etheral-shadow';

export default function VisibleAnimationPage() {
  return (
    <div className="min-h-screen bg-black">
      <EtheralShadow
        color="rgba(255, 0, 0, 0.8)"
        animation={{ scale: 100, speed: 100 }}
        noise={{ opacity: 1, scale: 2 }}
        sizing="fill"
        className="h-screen"
      >
        <div className="text-center">
          <h1 className="text-6xl font-bold text-white mb-4">
            Максимальная анимация
          </h1>
          <p className="text-xl text-white/80">
            Scale: 100, Speed: 100 - должно быть очень заметно
          </p>
        </div>
      </EtheralShadow>
    </div>
  );
}
