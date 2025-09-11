"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";

type PromoCardProps = {
  id: string;
  title: string;
  excerpt?: string;
  coverUrl?: string;
  highlight?: boolean;
};

export function PromoCard({
  id,
  title,
  excerpt,
  coverUrl,
  highlight = false,
}: PromoCardProps) {
  return (
    <Card className={cn("overflow-hidden h-full flex flex-col bg-transparent border-0", highlight && "ring-2 ring-primary/50")}>
      {coverUrl && <Image src={coverUrl} alt={title} width={400} height={225} className="w-full aspect-video object-cover" />}

      <CardHeader>
        <CardTitle className="text-lg text-white">{title}</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-3 flex-1">
        {excerpt && <p className="text-sm text-white/80 flex-1">{excerpt}</p>}
      </CardContent>
    </Card>
  );
}