'use client';

import React, { useEffect, useRef } from 'react';
import { animate, useMotionValue } from 'framer-motion';

export default function SimpleShadowPage() {
  const hueRotateMotionValue = useMotionValue(0);
  const shadowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log('Starting shadow animation...');
    
    const animation = animate(hueRotateMotionValue, 360, {
      duration: 4,
      repeat: Infinity,
      repeatType: "loop",
      ease: "linear",
      onUpdate: (value) => {
        if (shadowRef.current) {
          shadowRef.current.style.filter = `hue-rotate(${value}deg) blur(2px)`;
        }
      }
    });

    return () => {
      console.log('Stopping shadow animation...');
      animation.stop();
    };
  }, [hueRotateMotionValue]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="relative w-96 h-96">
        {/* Анимированная тень */}
        <div 
          ref={shadowRef}
          className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg opacity-60"
          style={{
            transform: 'translate(10px, 10px)',
            zIndex: 1
          }}
        />
        
        {/* Основной контент */}
        <div className="relative bg-gradient-to-r from-blue-500 to-green-500 rounded-lg p-8 z-10">
          <h1 className="text-4xl font-bold text-white text-center mb-4">
            Простая тень
          </h1>
          <p className="text-white text-center">
            Если тень меняет цвета - анимация работает
          </p>
        </div>
      </div>
    </div>
  );
}
