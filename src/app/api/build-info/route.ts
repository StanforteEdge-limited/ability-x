import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    blogSlugFix: true,
    commit: "844f468",
  });
}
