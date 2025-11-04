import { type NextRequest, NextResponse } from "next/server"
import axios from "axios"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, password } = body

    if (!username || !password) {
      return NextResponse.json({ error: "Username and password are required" }, { status: 400 })
    }

    // Get API base URL from environment variables
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL

    if (!apiBaseUrl) {
      console.error("API_BASE_URL is not configured in environment variables")
      return NextResponse.json(
        { error: "Server configuration error. Please contact administrator." },
        { status: 500 }
      )
    }

    // Call external API - endpoint: /api/v1/login
    console.log("Calling API:", `${apiBaseUrl}/api/v1/login`)
    console.log("Request payload:", { username, password: "***" })

    const response = await axios.post(`${apiBaseUrl}/api/v1/login`, { username, password })

    console.log("API Response status:", response.status)
    console.log("API Response data:", response.data)

    // Handle different possible response structures
    const token = response.data?.token || response.data?.data?.token || response.data?.access_token || response.data?.data?.access_token

    if (!token) {
      console.error("No token found in response:", response.data)
      return NextResponse.json(
        { error: "No token received from server", responseData: response.data },
        { status: 500 }
      )
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
    console.error("Login error details:")
    console.error("- Error message:", error.message)
    console.error("- Error response status:", error.response?.status)
    console.error("- Error response data:", error.response?.data)
    console.error("- Error stack:", error.stack)

    // Return detailed error information
    const errorMessage = error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "Invalid credentials"

    return NextResponse.json(
      {
        error: errorMessage,
        ok: false,
        details: error.response?.data,
      },
      { status: error.response?.status || 500 },
    )
  }
}
