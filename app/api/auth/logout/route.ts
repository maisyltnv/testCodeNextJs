import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const res = NextResponse.json({ ok: true })

  // Clear the access_token cookie
  res.cookies.set("access_token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  })

  return res
}
