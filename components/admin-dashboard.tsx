"use client"

import { useAuth } from "@/hooks/use-auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, LogOut, User } from "lucide-react"
import { useRouter } from "next/navigation"

interface AdminDashboardProps {
  locale: string
  translations: {
    welcome: string
    dashboard: string
    logout: string
  }
}

export function AdminDashboard({ locale, translations }: AdminDashboardProps) {
  const { user, loading, logout } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    router.push(`/${locale}/login`)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  const imageBaseUrl = process.env.NEXT_PUBLIC_API_BASE_IMAGE

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {translations.welcome}, {user?.name || user?.email || "Admin"}!
          </h1>
          <p className="text-muted-foreground mt-2">{translations.dashboard}</p>
        </div>
        <Button onClick={handleLogout} variant="outline">
          <LogOut className="mr-2 h-4 w-4" />
          {translations.logout}
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              User Information
            </CardTitle>
            <CardDescription>Your account details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Email</p>
              <p className="text-sm">{user?.email || "N/A"}</p>
            </div>
            {user?.name && (
              <div>
                <p className="text-sm font-medium text-muted-foreground">Name</p>
                <p className="text-sm">{user.name}</p>
              </div>
            )}
            {user?.id && (
              <div>
                <p className="text-sm font-medium text-muted-foreground">User ID</p>
                <p className="text-sm font-mono text-xs">{user.id}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>API Configuration</CardTitle>
            <CardDescription>Connected services</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <p className="text-sm font-medium text-muted-foreground">API Base URL</p>
              <p className="text-xs font-mono break-all">{process.env.NEXT_PUBLIC_API_BASE_URL}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Image Base URL</p>
              <p className="text-xs font-mono break-all">{imageBaseUrl}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Sample Image</CardTitle>
            <CardDescription>Using image base URL</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-muted rounded-lg overflow-hidden">
              <img
                src={`${imageBaseUrl}/sample-image.jpg`}
                alt="Sample"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/abstract-geometric-shapes.png"
                }}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
