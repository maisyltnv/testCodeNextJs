"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "@/components/language-switcher"
import { LogIn, LogOut, LayoutDashboard } from "lucide-react"

interface HeaderProps {
  locale: string
  translations: {
    title: string
    login: string
    logout: string
    dashboard: string
    language: {
      lo: string
      en: string
    }
  }
}

export function Header({ locale, translations }: HeaderProps) {
  const { user, loading, logout, refetch } = useAuth()
  const pathname = usePathname()

  // Check if we're on an admin page
  const isAdminPage = pathname?.includes("/admin")

  // Force refetch auth state on mount and when pathname changes
  useEffect(() => {
    refetch()

    // Refetch after a short delay to catch any state changes after navigation
    const timeoutId = setTimeout(() => {
      refetch()
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [refetch, pathname])

  // Periodically check auth state (useful after login redirect)
  useEffect(() => {
    const intervalId = setInterval(() => {
      refetch()
    }, 2000)

    // Clear interval after 10 seconds (enough time for login to complete)
    const clearIntervalTimeout = setTimeout(() => {
      clearInterval(intervalId)
    }, 10000)

    return () => {
      clearInterval(intervalId)
      clearTimeout(clearIntervalTimeout)
    }
  }, [refetch])

  const handleLogout = async () => {
    await logout()
    // Redirect to login page with current locale
    window.location.href = `/${locale}/login`
  }

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto max-w-7xl flex h-16 items-center justify-between px-6">
        <Link href={`/${locale}`} className="font-bold text-xl hover:opacity-80 transition-opacity">
          {translations.title}
        </Link>

        <div className="flex items-center gap-3">
          <LanguageSwitcher currentLocale={locale} translations={translations.language} />

          {/* Hide login/logout buttons on admin pages since they're in the sidebar */}
          {!isAdminPage && (
            <>
              {!loading && (
                <>
                  {user ? (
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/${locale}/admin`}>
                          <LayoutDashboard className="mr-2 h-4 w-4" />
                          {translations.dashboard}
                        </Link>
                      </Button>
                      <Button variant="ghost" size="sm" onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        {translations.logout}
                      </Button>
                    </div>
                  ) : (
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/${locale}/login`}>
                        <LogIn className="mr-2 h-4 w-4" />
                        {translations.login}
                      </Link>
                    </Button>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  )
}
