import { getTranslations } from "next-intl/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Globe, Lock, Languages } from "lucide-react"

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "common" })

  return (
    <div className="container mx-auto max-w-5xl p-6">
      <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-balance">{t("homeTitle")}</h1>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl">{t("homeDescription")}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 w-full max-w-4xl">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Languages className="h-5 w-5" />
                Multi-language
              </CardTitle>
              <CardDescription>Support for Lao and English languages</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Seamlessly switch between languages with full translation support.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Secure Auth
              </CardTitle>
              <CardDescription>HTTP-only cookie authentication</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Protected routes with secure token-based authentication.</p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                API Integration
              </CardTitle>
              <CardDescription>Connected to external services</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Seamless integration with Kolao Group APIs.</p>
            </CardContent>
          </Card>
        </div>

        <div className="flex gap-4">
          <Button size="lg" asChild>
            <Link href={`/${locale}/login`}>{t("login")}</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href={`/${locale}/admin`}>{t("dashboard")}</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
