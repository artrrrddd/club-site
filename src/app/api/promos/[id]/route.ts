import { NextRequest, NextResponse } from "next/server";
import { promosApi, debugData } from "@/lib/data";
import { z } from "zod";

const promoSchema = z.object({
  title: z.string().min(3, "Минимум 3 символа"),
  excerpt: z.string().max(200).optional(),
  coverUrl: z.string().url().optional().or(z.literal("")),
});

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const promo = promosApi.getById(id);

    if (promo) {
      return NextResponse.json(promo);
    } else {
      return NextResponse.json(
        { error: "Promo not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Get promo error:", error);
    return NextResponse.json(
      { error: "Failed to get promo" },
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
    console.log("Updating promo with ID:", id, "Data:", body);
    
    const data = promoSchema.parse(body);

    const updated = promosApi.update(id, {
      title: data.title,
      excerpt: data.excerpt || undefined,
      coverUrl: data.coverUrl || undefined,
    });

    console.log("Update result:", updated);

    if (updated) {
      console.log("Promo updated successfully");
      return NextResponse.json(updated);
    } else {
      console.log("Promo not found for update");
      return NextResponse.json(
        { error: "Promo not found" },
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
    console.error("Update promo error:", error);
    return NextResponse.json(
      { error: "Failed to update promo" },
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
    console.log("Attempting to delete promo with ID:", id);
    
    // Отладочная информация
    debugData();
    
    const success = promosApi.delete(id);
    console.log("Delete result:", success);

    if (success) {
      console.log("Promo deleted successfully");
      return NextResponse.json({ success: true });
    } else {
      console.log("Promo not found");
      return NextResponse.json(
        { error: "Promo not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Delete promo error:", error);
    return NextResponse.json(
      { error: "Failed to delete promo" },
      { status: 500 }
    );
  }
}