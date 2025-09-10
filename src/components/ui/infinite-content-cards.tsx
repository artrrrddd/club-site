"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState, useCallback } from "react";
import { NewsCard } from "./news/NewsCard";
import { PromoCard } from "./promo/PromoCard";
import type { News } from "../../types/contents";

type PromoFromApi = {
  id: string;
  title: string;
  excerpt: string | null;
  coverUrl: string | null;
  publishedAt?: string;
};

type ContentItem = {
  type: 'news' | 'promo';
  data: News | PromoFromApi;
  key: string;
};

export const InfiniteContentCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: ContentItem[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  const [start] = useState(true); // Начинаем сразу с true
  
  const getDirection = useCallback(() => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards",
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse",
        );
      }
    }
  }, [direction]);

  const getSpeed = useCallback(() => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  }, [speed]);

  const addAnimation = useCallback(() => {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      // Дублируем карточки для бесконечной анимации
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      // Дублируем еще раз для более плавного перехода
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
    }
  }, [getDirection, getSpeed]);

  useEffect(() => {
    addAnimation();
  }, [addAnimation]);
  // Если нет элементов, не рендерим ничего
  if (items.length === 0) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 w-full overflow-hidden",
        className,
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4 -ml-4",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]",
        )}
      >
        {items.map((item) => (
          <li
            className="relative w-[350px] h-[400px] max-w-full shrink-0 rounded-2xl md:w-[450px] md:h-[450px] transition-transform duration-300 hover:scale-105 hover:z-10"
            key={item.key}
          >
            {item.type === 'news' ? (
              <NewsCard
                id={item.data.id}
                title={item.data.title}
                excerpt={item.data.excerpt ?? undefined}
                coverUrl={item.data.coverUrl ?? undefined}
                publishedAt={item.data.publishedAt}
              />
            ) : (
              <PromoCard
                id={item.data.id}
                title={item.data.title}
                excerpt={item.data.excerpt ?? undefined}
                coverUrl={item.data.coverUrl ?? undefined}
                highlight={false}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
