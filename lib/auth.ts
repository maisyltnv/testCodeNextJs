import { cookies } from "next/headers"

export async function getTokenFromCookie() {
  const cookieStore = await cookies()
  return cookieStore.get("access_token")?.value
}

export async function isAuthenticated() {
  const token = await getTokenFromCookie()
  return !!token
}
