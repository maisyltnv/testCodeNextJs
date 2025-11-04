"use client"

import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Languages } from "lucide-react"

interface LanguageSwitcherProps {
  currentLocale: string
  translations: {
    lo: string
    en: string
  }
}

export function LanguageSwitcher({ currentLocale, translations }: LanguageSwitcherProps) {
  const pathname = usePathname()
  const router = useRouter()

  const switchLocale = (newLocale: string) => {
    if (!pathname) return

    // Replace the locale in the pathname
    const segments = pathname.split("/")
    segments[1] = newLocale
    const newPath = segments.join("/")

    router.push(newPath)
  }

  const otherLocale = currentLocale === "lo" ? "en" : "lo"
  const otherLocaleName = translations[otherLocale as keyof typeof translations]

  return (
    <Button variant="outline" size="sm" onClick={() => switchLocale(otherLocale)} className="gap-2">
      <Languages className="h-4 w-4" />
      {otherLocaleName}
    </Button>
  )
}
