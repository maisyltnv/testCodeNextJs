import { type NextRequest, NextResponse } from "next/server"
import axios from "axios"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Call external API
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, { email, password })

    const { token } = response.data

    if (!token) {
      return NextResponse.json({ error: "No token received from server" }, { status: 500 })
    }

    // Create response with HTTP-only cookie
    const res = NextResponse.json({ ok: true })

    res.cookies.set("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 86400, // 1 day
      path: "/",
    })

    return res
  } catch (error: any) {
    console.error("Login error:", error.response?.data || error.message)

    return NextResponse.json(
      {
        error: error.response?.data?.message || "Invalid credentials",
        ok: false,
      },
      { status: error.response?.status || 401 },
    )
  }
}
