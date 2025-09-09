'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function MotionTestPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center space-y-8">
        <h1 className="text-4xl text-white mb-4">Тест Framer Motion</h1>
        
        <motion.div
          className="w-32 h-32 bg-gradient-to-r from-red-500 to-blue-500 rounded-lg mx-auto"
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div className="w-full h-full bg-white/20 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">Framer</span>
          </div>
        </motion.div>
        
        <p className="text-white">Если этот квадрат вращается и масштабируется - Framer Motion работает</p>
      </div>
    </div>
  );
}
