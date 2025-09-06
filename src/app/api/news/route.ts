import { NextResponse } from "next/server";
import { newsApi } from "@/lib/data";
import { newsSchema } from "@/validation/news";

export const runtime = "nodejs";

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
  try {
    const items = newsApi.getAll();
    console.log("Getting all news:", items);
    return NextResponse.json(items, { status: 200 });
  } catch (e: unknown) {
    console.error("GET /api/news error:", e);
    const errorMessage = e instanceof Error ? e.message : "Internal error";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = newsSchema.parse(body);
    const created = newsApi.create({
      title: data.title,
      excerpt: data.excerpt || undefined,
      coverUrl: data.coverUrl || undefined,
      publishedAt: new Date(),
    });
    return NextResponse.json(created, { status: 201 });
  } catch (err: unknown) {
    if (err && typeof err === 'object' && 'issues' in err) {
      return NextResponse.json({ error: "ValidationError", details: (err as { issues: unknown }).issues }, { status: 400 });
    }
    return NextResponse.json({ error: "BadRequest" }, { status: 400 });
  }
}
