import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { error: "Email is disabled in the MindSync presentation prototype." },
    { status: 410 },
  );
}
