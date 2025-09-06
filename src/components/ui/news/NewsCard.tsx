import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { formatDate } from "@/lib/format";
import Image from "next/image";

type NewsCardProps = {
  title: string;
  excerpt?: string;
  coverUrl?: string;
  publishedAt?: string | Date;
};

export function NewsCard({ title, excerpt, coverUrl, publishedAt }: NewsCardProps) {
  return (
    <Card className="overflow-hidden shadow-sm">
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
        <CardTitle className="text-lg">{title}</CardTitle>
        {publishedAt && (
          <p className="text-xs text-muted-foreground">{formatDate(publishedAt)}</p>
        )}
      </CardHeader>

      <CardContent>
        {excerpt && <p className="text-sm text-muted-foreground">{excerpt}</p>}
      </CardContent>
    </Card>
  );
}