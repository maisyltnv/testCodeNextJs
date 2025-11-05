"use client"

import { useState, useEffect, useCallback } from "react"

interface User {
  id: string
  email: string
  name?: string
  [key: string]: any
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchUser = useCallback(async () => {
    try {
      const response = await fetch("/api/auth/me")
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
