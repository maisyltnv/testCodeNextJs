"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, LogOut } from "lucide-react"
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarFooter,
} from "@/components/ui/sidebar"

type AdminSidebarNavProps = {
  locale: string
  labels: {
    dashboard: string
    logout: string
  }
  onLogout?: () => Promise<void> | void
}

export function AdminSidebarNav({ locale, labels, onLogout }: AdminSidebarNavProps) {
  const pathname = usePathname()
  const dashboardHref = `/${locale}/admin`
  const isDashboardActive = pathname === dashboardHref

  return (
    <>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{labels.dashboard}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isDashboardActive} tooltip={labels.dashboard}>
                  <Link href={dashboardHref}>
                    <Home />
                    <span>{labels.dashboard}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarSeparator />

      <SidebarFooter>
        <button
          type="button"
          onClick={() => void onLogout?.()}
          className="text-left text-sm flex items-center gap-2 rounded-md p-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <LogOut className="h-4 w-4" />
          <span>{labels.logout}</span>
        </button>
      </SidebarFooter>
    </>
  )
}


