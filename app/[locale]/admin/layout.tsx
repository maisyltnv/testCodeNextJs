import type React from "react"
import { getTranslations } from "next-intl/server"
import { SidebarProvider, Sidebar, SidebarHeader, SidebarInset, SidebarTrigger, SidebarRail } from "@/components/ui/sidebar"
import { AdminSidebarNav } from "@/components/admin-sidebar-nav"
import { Separator } from "@/components/ui/separator"

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "common" })

  const labels = {
    dashboard: t("dashboard"),
    logout: t("logout"),
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="px-3 py-2 text-sm font-semibold">
          {t("title")}
        </SidebarHeader>

        {/* Client nav for active states + logout */}
        <AdminSidebarNav locale={locale} labels={labels} />

        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <div className="flex h-12 items-center gap-2 px-4">
          <SidebarTrigger />
          <Separator orientation="vertical" className="mx-2 h-6" />
          <div className="text-sm text-muted-foreground">{labels.dashboard}</div>
        </div>
        <div className="p-4">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}


