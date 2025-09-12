import { NextResponse } from "next/server";
import { z } from "zod";
import { promosApi } from "@/lib/data";

export const runtime = "nodejs";

const promoSchema = z.object({
  title: z.string().min(3, "Минимум 3 символа"),
  excerpt: z.string().max(500, "До 500 символов").optional(),
  coverUrl: z.string().url("Должен быть URL").optional().or(z.literal("")),
});

export async function HEAD() {
  return new NextResponse(null, { status: 200 });
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: { Allow: "GET,HEAD,OPTIONS,POST" },
  });
}

export async function GET() {
  const promos = await promosApi.getAll();
  console.log("Getting all promos:", promos);
  return NextResponse.json(promos, { status: 200 });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = promoSchema.parse(body);

    const created = await promosApi.create({
      title: data.title,
      excerpt: data.excerpt || undefined,
      coverUrl: data.coverUrl || undefined,
      publishedAt: new Date(),
    });

    return NextResponse.json(created, { status: 201 });
  } catch (err: unknown) {
    if (err && typeof err === 'object' && 'issues' in err) {
      return NextResponse.json(
        { error: "ValidationError", details: (err as { issues: unknown }).issues },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: "BadRequest" }, { status: 400 });
  }
}
