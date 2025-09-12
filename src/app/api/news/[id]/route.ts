import { NextRequest, NextResponse } from "next/server";
import { newsApi, debugData } from "@/lib/data";
import { newsSchema } from "@/validation/news";

export const runtime = "nodejs";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const news = await newsApi.getById(id);

    if (news) {
      return NextResponse.json(news);
    } else {
      return NextResponse.json(
        { error: "News not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Get news error:", error);
    return NextResponse.json(
      { error: "Failed to get news" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Временно убираем проверку аутентификации для тестирования
  // const session = await getServerSession(authOptions);
  // if (!session || session.user.role !== "ADMIN") {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // }

  try {
    const { id } = await params;
    const body = await request.json();
    console.log("Updating news with ID:", id, "Data:", body);
    
    const data = newsSchema.parse(body);

    const updated = await newsApi.update(id, {
      title: data.title,
      excerpt: data.excerpt || undefined,
      coverUrl: data.coverUrl || undefined,
    });

    console.log("Update result:", updated);

    if (updated) {
      console.log("News updated successfully");
      return NextResponse.json(updated);
    } else {
      console.log("News not found for update");
      return NextResponse.json(
        { error: "News not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    if (error && typeof error === 'object' && 'issues' in error) {
      console.log("Validation error:", (error as { issues: unknown }).issues);
      return NextResponse.json(
        { error: "ValidationError", details: (error as { issues: unknown }).issues },
        { status: 400 }
      );
    }
    console.error("Update news error:", error);
    return NextResponse.json(
      { error: "Failed to update news" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Временно убираем проверку аутентификации для тестирования
  // const session = await getServerSession(authOptions);
  // if (!session || session.user.role !== "ADMIN") {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // }

  try {
    const { id } = await params;
    console.log("Attempting to delete news with ID:", id);
    
    // Отладочная информация
    await debugData();
    
    const success = await newsApi.delete(id);
    console.log("Delete result:", success);

    if (success) {
      console.log("News deleted successfully");
      return NextResponse.json({ success: true });
    } else {
      console.log("News not found");
      return NextResponse.json(
        { error: "News not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Delete news error:", error);
    return NextResponse.json(
      { error: "Failed to delete news" },
      { status: 500 }
    );
  }
}
