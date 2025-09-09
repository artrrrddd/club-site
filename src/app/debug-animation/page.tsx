'use client';

import React, { useEffect, useRef } from 'react';
import { animate, useMotionValue } from 'framer-motion';

export default function DebugAnimationPage() {
  const hueRotateMotionValue = useMotionValue(0);
  const testRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Простая анимация для тестирования
    const animation = animate(hueRotateMotionValue, 360, {
      duration: 2,
      repeat: Infinity,
      repeatType: "loop",
      ease: "linear",
      onUpdate: (value) => {
        if (testRef.current) {
          testRef.current.style.filter = `hue-rotate(${value}deg)`;
        }
      }
    });

    return () => animation.stop();
  }, [hueRotateMotionValue]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center space-y-8">
        <h1 className="text-4xl text-white mb-4">Тест анимации</h1>
        
        {/* Простой тест с hue-rotate */}
        <div 
          ref={testRef}
          className="w-32 h-32 bg-gradient-to-r from-red-500 to-blue-500 rounded-lg mx-auto"
        >
          <div className="w-full h-full bg-white/20 rounded-lg"></div>
        </div>
        
        <p className="text-white">Если этот квадрат меняет цвета - Framer Motion работает</p>
        
        {/* Тест SVG фильтра */}
        <div className="w-32 h-32 mx-auto">
          <svg width="100%" height="100%" style={{ position: "absolute" }}>
            <defs>
              <filter id="testFilter">
                <feTurbulence
                  result="turbulence"
                  numOctaves="2"
                  baseFrequency="0.01,0.02"
                  seed="0"
                  type="turbulence"
                />
                <feColorMatrix
                  in="turbulence"
                  type="hueRotate"
                  values="0"
                />
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="turbulence"
                  scale="20"
                />
              </filter>
            </defs>
          </svg>
          <div 
            className="w-full h-full bg-red-500 rounded-lg"
            style={{ filter: 'url(#testFilter)' }}
          >
            <div className="w-full h-full bg-white/20 rounded-lg"></div>
          </div>
        </div>
        
        <p className="text-white">Если этот квадрат искажен - SVG фильтры работают</p>
      </div>
    </div>
  );
}
