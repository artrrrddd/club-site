"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

type PromoCardProps = {
  id: string;
  title: string;
  excerpt?: string;
  coverUrl?: string;
  ctaLabel?: string;
  highlight?: boolean;
};

export function PromoCard({
  id,
  title,
  excerpt,
  coverUrl,
  ctaLabel = "Подробнее",
  highlight = false,
}: PromoCardProps) {
  return (
    <Card className={cn("overflow-hidden transition shadow-sm hover:shadow-md", highlight && "ring-2 ring-primary/50")}>
      {coverUrl && <Image src={coverUrl} alt={title} width={400} height={225} className="w-full aspect-video object-cover" />}

      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>

      <CardContent className="grid gap-3">
        {excerpt && <p className="text-sm text-muted-foreground">{excerpt}</p>}
        <div>
          <Button onClick={() => alert(id)} aria-label={`Подробнее об акции: ${title}`}>
            {ctaLabel}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}