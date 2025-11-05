"use client"

import { useState, useEffect, useCallback } from "react"
import { usePathname } from "next/navigation"

interface User {
  id: string
  email: string
  name?: string
  [key: string]: any
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const pathname = usePathname()

  const fetchUser = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/auth/me", {
        credentials: "include",
        cache: "no-store",
      })
      if (response.ok) {
        const data = await response.json()
        setUser(data)
      } else {
        setUser(null)
      }
    } catch (error) {
      console.error("Failed to fetch user:", error)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchUser()
  }, [fetchUser, pathname])

  // Also refetch on window focus (in case login happened in another tab)
  useEffect(() => {
    const handleFocus = () => {
      fetchUser()
    }
    window.addEventListener("focus", handleFocus)
    return () => window.removeEventListener("focus", handleFocus)
  }, [fetchUser])

  const logout = useCallback(async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      setUser(null)
      // Note: Redirect is handled by the calling component (e.g., Header)
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }, [])

  return { user, loading, logout, refetch: fetchUser }
}
