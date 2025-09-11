"use client";
import React, { useEffect, useId, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { Container, SingleOrMultiple } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { cn } from "@/lib/utils";
import { motion, useAnimation } from "framer-motion";

type ParticlesProps = {
  id?: string;
  className?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  speed?: number; // не обязателен, оставим для гибкости
  particleColor?: string;
  particleDensity?: number;
};

export const SparklesCore = (props: ParticlesProps) => {
  const {
    id,
    className,
    background,
    minSize = 0.4,
    maxSize = 1,
    speed, // если придёт — переопределит нижние значения
    particleColor = "#ffffff",
    particleDensity = 1200,
  } = props;

  const [init, setInit] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  const particlesLoaded = async (container?: Container) => {
    if (container) {
      controls.start({ opacity: 1, transition: { duration: 1 } });
    }
  };

  const generatedId = useId();

  return (
    <motion.div animate={controls} className={cn("opacity-0", className)}>
      {init && (
        <Particles
          id={id || generatedId}
          className="h-full w-full"
          particlesLoaded={particlesLoaded}
          options={{
            background: {
              color: { value: background || "transparent" }, // прозрачный фон
            },
            fullScreen: { enable: false, zIndex: 1 },
            fpsLimit: 60, // достаточно, выглядит плавно и легче для мобилок
            detectRetina: true,

            interactivity: {
              events: {
                onClick: { enable: false, mode: "push" }, // отключаем интерактив
                onHover: { enable: false, mode: "repulse" },
                resize: { enable: true },
              },
            },

            particles: {
              number: {
                density: { enable: true, width: 800, height: 260 },
                limit: { mode: "delete", value: 0 },
                value: particleDensity, // 1000–1400 даёт «туман» как на скрине
              },

              color: { value: particleColor },

              size: {
                value: { min: minSize, max: maxSize }, // 0.4–1 — мелкая «пыль»
                animation: { enable: false },
              },

              opacity: {
                value: { min: 0.2, max: 0.9 },
                animation: {
                  enable: true,
                  speed: speed ?? 0.5, // мягкое мерцание
                  sync: false,
                  startValue: "random",
                },
              },

              move: {
                enable: true,
                direction: "none",
                random: true,
                straight: false,
                speed: { min: 0.05, max: 0.25 }, // почти неподвижные
                outModes: { default: "out" },
              },

              shape: { type: "circle" },
              links: { enable: false },
              collisions: { enable: false },
              shadow: { enable: false },
              zIndex: { value: 0 },
              life: { count: 0 },
              rotate: { value: 0, animation: { enable: false } },
              twinkle: { lines: { enable: false }, particles: { enable: false } },
              wobble: { enable: false },
              roll: { enable: false },
              tilt: { enable: false },
              orbit: { enable: false },
              repulse: { enabled: false, value: 0, distance: 1, duration: 1, speed: 1, factor: 1 },
              effect: {
                close: true,
                fill: true,
                options: {},
                type: {} as SingleOrMultiple<string> | undefined,
              },
            },
          }}
        />
      )}
    </motion.div>
  );
};
