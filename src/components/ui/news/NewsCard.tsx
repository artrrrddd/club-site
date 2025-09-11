import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { formatDate } from "@/lib/format";
import Image from "next/image";

type NewsCardProps = {
  id?: string;
  title: string;
  excerpt?: string;
  coverUrl?: string;
  publishedAt?: string | Date;
};

export function NewsCard({ 
  id, 
  title, 
  excerpt, 
  coverUrl, 
  publishedAt
}: NewsCardProps) {
  return (
    <Card className="overflow-hidden h-full flex flex-col bg-transparent border-0">
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

      <CardContent className="flex flex-col gap-3 flex-1">
        {excerpt && <p className="text-sm text-white/80 flex-1">{excerpt}</p>}
      </CardContent>
    </Card>
  );
}