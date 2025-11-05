import { getTranslations } from "next-intl/server"
import { MonitoringDashboard } from "@/components/monitoring-dashboard"

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

  return (
    <div className="container mx-auto max-w-[1600px] p-6">
      <MonitoringDashboard />
    </div>
  )
}
