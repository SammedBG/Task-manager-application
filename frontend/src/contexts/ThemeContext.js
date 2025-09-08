"use client"

import { createContext, useContext, useState, useEffect } from "react"

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    // Initialize theme from localStorage or system preference
    const savedTheme = localStorage.getItem("darkMode")
    if (savedTheme !== null) {
      setDarkMode(JSON.parse(savedTheme))
    } else {
      // Check system preference
      setDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches)
    }
  }, [])

  const toggleDarkMode = async () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    localStorage.setItem("darkMode", JSON.stringify(newDarkMode))
  }

  // Function to sync with user preferences (called from AuthContext)
  const syncWithUserPreferences = (userDarkMode) => {
    setDarkMode(userDarkMode)
    localStorage.setItem("darkMode", JSON.stringify(userDarkMode))
  }

  const value = {
    darkMode,
    toggleDarkMode,
    syncWithUserPreferences,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
