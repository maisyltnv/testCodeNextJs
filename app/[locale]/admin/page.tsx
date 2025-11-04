import { getTranslations } from "next-intl/server"
import { AdminDashboard } from "@/components/admin-dashboard"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "common" })

  return {
    title: t("dashboard"),
  }
}

export default async function AdminPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "common" })

  const translations = {
    welcome: t("welcome"),
    dashboard: t("dashboard"),
    logout: t("logout"),
  }

  return (
    <div className="container mx-auto max-w-7xl p-6">
      <AdminDashboard locale={locale} translations={translations} />
    </div>
  )
}
