import { getTranslations } from "next-intl/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LoginForm } from "@/components/forms/login-form"
import Link from "next/link"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "common" })

  return {
    title: t("loginTitle"),
  }
}

export default async function LoginPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "common" })
  const tErrors = await getTranslations({ locale, namespace: "errors" })

  const translations = {
    username: t("username"),
    password: t("password"),
    submit: t("submit"),
    loginTitle: t("loginTitle"),
    loginDescription: t("loginDescription"),
    invalidCredentials: tErrors("invalidCredentials"),
    loginFailed: tErrors("loginFailed"),
  }

  const otherLocale = locale === "lo" ? "en" : "lo"
  const otherLocaleName = locale === "lo" ? "English" : "ລາວ"

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-md space-y-4">
        <Card className="rounded-2xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">{t("loginTitle")}</CardTitle>
            <CardDescription className="text-center">{t("loginDescription")}</CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm locale={locale} translations={translations} />
          </CardContent>
        </Card>

        <div className="text-center">
          <Link
            href={`/${otherLocale}/login`}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Switch to {otherLocaleName}
          </Link>
        </div>
      </div>
    </div>
  )
}
