import createMiddleware from "next-intl/middleware"
import { type NextRequest, NextResponse } from "next/server"
import { locales } from "./lib/i18n"

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: "lo",
  localePrefix: "always",
})

export default async function middleware(request: NextRequest) {
  // First, handle i18n
  const response = intlMiddleware(request)

  // Check if the request is for an admin route
  const pathname = request.nextUrl.pathname
  const isAdminRoute = pathname.match(/^\/(lo|en)\/admin/)

  if (isAdminRoute) {
    // Check for access_token cookie
    const token = request.cookies.get("access_token")?.value

    if (!token) {
      // Extract locale from pathname
      const locale = pathname.split("/")[1]
      const loginUrl = new URL(`/${locale}/login`, request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  return response
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
}
