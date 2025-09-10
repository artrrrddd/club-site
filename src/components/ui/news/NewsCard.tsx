import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/format";
import Image from "next/image";

type NewsCardProps = {
  id?: string;
  title: string;
  excerpt?: string;
  coverUrl?: string;
  publishedAt?: string | Date;
  ctaLabel?: string;
};

export function NewsCard({ 
  id, 
  title, 
  excerpt, 
  coverUrl, 
  publishedAt, 
  ctaLabel = "Читать далее" 
}: NewsCardProps) {
  return (
    <Card className="overflow-hidden shadow-sm bg-[linear-gradient(180deg,rgba(0,0,0,0.8),rgba(0,0,0,0.6))] backdrop-blur-lg border-white/20 h-full flex flex-col">
      {coverUrl && (
        <Image
          src={coverUrl}
          alt={title}
          width={400}
          height={225}
          className="w-full aspect-video object-cover"
        />
      )}

      <CardHeader>
        <CardTitle className="text-lg text-white">{title}</CardTitle>
        {publishedAt && (
          <p className="text-xs text-white/60">{formatDate(publishedAt)}</p>
        )}
      </CardHeader>

      <CardContent className="flex flex-col gap-3 flex-1 justify-between">
        {excerpt && <p className="text-sm text-white/80 flex-1">{excerpt}</p>}
        <div className="mt-auto">
          <Button 
            onClick={() => id ? alert(`Переход к новости: ${id}`) : alert(`Переход к новости: ${title}`)} 
            aria-label={`Читать новость: ${title}`}
            className="bg-white/10 hover:bg-white/20 text-white border-white/40 hover:border-white/60 w-full"
          >
            {ctaLabel}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}