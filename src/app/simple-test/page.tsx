'use client';

import React, { useEffect, useRef } from 'react';
import { animate, useMotionValue } from 'framer-motion';

export default function SimpleTestPage() {
  const hueRotateMotionValue = useMotionValue(0);
  const testRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log('Starting animation...');
    
    const animation = animate(hueRotateMotionValue, 360, {
      duration: 3,
      repeat: Infinity,
      repeatType: "loop",
      ease: "linear",
      onUpdate: (value) => {
        console.log('Animation value:', value);
        if (testRef.current) {
          testRef.current.style.filter = `hue-rotate(${value}deg)`;
        }
      }
    });

    return () => {
      console.log('Stopping animation...');
      animation.stop();
    };
  }, [hueRotateMotionValue]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center space-y-8">
        <h1 className="text-4xl text-white mb-4">Простой тест анимации</h1>
        
        <div 
          ref={testRef}
          className="w-64 h-64 bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 rounded-lg mx-auto"
        >
          <div className="w-full h-full bg-white/20 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">Анимация</span>
          </div>
        </div>
        
        <p className="text-white">Если этот квадрат меняет цвета - Framer Motion работает</p>
        <p className="text-white text-sm">Проверьте консоль браузера на наличие логов</p>
      </div>
    </div>
  );
}
