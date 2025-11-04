import type React from "react"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations } from "next-intl/server"
import { Geist, Geist_Mono } from "next/font/google"
import { Noto_Sans_Lao } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "sonner"
import { Header } from "@/components/header"
import "../globals.css"

const _geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist"
})
const _geistMono = Geist_Mono({ subsets: ["latin"] })
const notoSansLao = Noto_Sans_Lao({
  subsets: ["lao"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-noto-sans-lao"
})

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "common" })

  return {
    title: {
      default: t("title"),
      template: `%s | ${t("title")}`,
    },
    description: t("homeDescription"),
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const messages = await getMessages()
  const t = await getTranslations({ locale, namespace: "common" })

  const headerTranslations = {
    title: t("title"),
    login: t("login"),
    logout: t("logout"),
    dashboard: t("dashboard"),
    language: {
      lo: t("language.lo"),
      en: t("language.en"),
    },
  }

  // Use Noto Sans Lao for Lao locale, Geist for others
  const fontVariable = locale === "lo" ? notoSansLao.variable : _geist.variable

  return (
    <html lang={locale} className={fontVariable}>
      <body className="font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          <Header locale={locale} translations={headerTranslations} />
          <main>{children}</main>
          <Toaster position="top-center" />
          <Analytics />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
