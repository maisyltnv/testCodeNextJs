"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Search,
  Home,
  Plus,
  Grid3x3,
  BookOpen,
  BarChart3,
  LogOut,
  UserPlus,
  Bell,
} from "lucide-react"
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
import { Input } from "@/components/ui/input"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"

type AdminSidebarNavProps = {
  locale: string
  labels: {
    dashboard: string
    logout: string
  }
  onLogout?: () => Promise<void> | void
}

interface MenuItem {
  label: string
  icon: React.ComponentType<{ className?: string }>
  href?: string
  isActive?: boolean
}

export function AdminSidebarNav({ locale, labels, onLogout }: AdminSidebarNavProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { logout } = useAuth()
  const dashboardHref = `/${locale}/admin`

  const handleLogout = async () => {
    if (onLogout) {
      await onLogout()
    } else {
      await logout()
      router.push(`/${locale}/login`)
    }
  }

  // Top navigation items
  const topNavItems: MenuItem[] = [
    { label: "Home", icon: Home, href: `/${locale}` },
    { label: "Dashboards", icon: BarChart3, href: dashboardHref },
    { label: "All Capabilities", icon: Grid3x3 },
    { label: "Integrations & Agents", icon: Plus },
    { label: "Catalogs", icon: BookOpen },
  ]

  const isActive = (href?: string) => {
    if (!href) return false
    return pathname === href
  }

  return (
    <>
      <SidebarContent>
        {/* Quick Find */}
        <div className="px-3 py-2">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Quick Find"
              className="h-8 pl-8 bg-sidebar-accent border-sidebar-border"
            />
          </div>
        </div>

        {/* Top Navigation */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {topNavItems.map((item) => {
                const active = isActive(item.href)
                return (
                  <SidebarMenuItem key={item.label}>
                    {item.href ? (
                      <SidebarMenuButton asChild isActive={active} tooltip={item.label}>
                        <Link href={item.href}>
                          <item.icon />
                          <span>{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    ) : (
                      <SidebarMenuButton isActive={active} tooltip={item.label}>
                        <item.icon />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarSeparator />

      <SidebarFooter>
        <div className="space-y-1">
          <button
            type="button"
            className="text-left text-sm flex items-center gap-2 rounded-md p-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground w-full"
          >
            <Bell className="h-4 w-4" />
            <span>What's New</span>
            <span className="ml-auto bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded-full">
              70
            </span>
          </button>
          <button
            type="button"
            className="text-left text-sm flex items-center gap-2 rounded-md p-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground w-full"
          >
            <UserPlus className="h-4 w-4" />
            <span>Add User</span>
          </button>
          <button
            type="button"
            onClick={() => void handleLogout()}
            className="text-left text-sm flex items-center gap-2 rounded-md p-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground w-full"
          >
            <LogOut className="h-4 w-4" />
            <span>{labels.logout}</span>
          </button>
        </div>
      </SidebarFooter>
    </>
  )
}


