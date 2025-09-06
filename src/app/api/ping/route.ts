// src/app/api/ping/route.ts

import { NextResponse } from "next/server";

// Иногда браузер делает HEAD-запрос — добавим обработчик, чтобы не было 405.
export async function HEAD() {
  return new NextResponse(null, { status: 200 });
}

export async function GET() {
  // Подсказка: загляни в терминал — увидишь лог, если хендлер реально вызвался.
  console.log("HIT /api/ping GET");
  return new NextResponse("pong", { status: 200 });
}

// На всякий случай добавим OPTIONS, чтобы исключить 405 на preflight.
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: { "Allow": "GET,HEAD,OPTIONS" },
  });
}
