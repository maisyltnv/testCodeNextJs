import { type NextRequest, NextResponse } from "next/server"
import axios from "axios"

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("access_token")?.value

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
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

    // Forward request to external API with token
    const response = await axios.get(`${apiBaseUrl}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return NextResponse.json(response.data)
  } catch (error: any) {
    console.error("Auth me error:", error.response?.data || error.message)

    return NextResponse.json({ error: "Failed to fetch user data" }, { status: error.response?.status || 401 })
  }
}
