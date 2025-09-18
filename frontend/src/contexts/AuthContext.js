"use client"

import { createContext, useContext, useState, useEffect } from "react"
import api from "../config/axios"

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      fetchUser()
    } else {
      setLoading(false)
    }
  }, [])

  const fetchUser = async () => {
    try {
      const response = await api.get("/api/auth/me")
      setUser(response.data.user)
    } catch (error) {
      localStorage.removeItem("token")
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    try {
      const response = await api.post("/api/auth/login", { email, password })
      const { token, user } = response.data

      localStorage.setItem("token", token)
      setUser(user)

      return { success: true }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      }
    }
  }

  const register = async (username, email, password) => {
    try {
      const response = await api.post("/api/auth/register", {
        username,
        email,
        password,
      })
      const { token, user } = response.data

      localStorage.setItem("token", token)
      setUser(user)

      return { success: true }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Registration failed",
      }
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    setUser(null)
  }

  const updatePreferences = async (preferences) => {
    try {
      const response = await api.patch("/api/auth/preferences", preferences)
      setUser(response.data.user)
      return { success: true }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Update failed",
      }
    }
  }

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updatePreferences,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
