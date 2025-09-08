"use client"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { useTheme } from "../contexts/ThemeContext"
import { useEffect } from "react"

const Navbar = () => {
  const { user, logout, updatePreferences } = useAuth()
  const { darkMode, toggleDarkMode, syncWithUserPreferences } = useTheme()
  const location = useLocation()
  const navigate = useNavigate()

  // Sync theme with user preferences when user loads
  useEffect(() => {
    if (user?.preferences?.darkMode !== undefined) {
      syncWithUserPreferences(user.preferences.darkMode)
    }
  }, [user, syncWithUserPreferences])

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  const handleToggleDarkMode = async () => {
    await toggleDarkMode()

    // Update user preferences if logged in
    if (user) {
      await updatePreferences({ darkMode: !darkMode })
    }
  }

  const isActive = (path) => location.pathname === path

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/dashboard" className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">TaskManager</h1>
            </Link>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <Link
                to="/dashboard"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200 ${
                  isActive("/dashboard")
                    ? "border-blue-500 text-blue-600 dark:text-blue-400"
                    : "border-transparent text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 hover:border-gray-300"
                }`}
              >
                Dashboard
              </Link>
              <Link
                to="/tasks"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200 ${
                  isActive("/tasks")
                    ? "border-blue-500 text-blue-600 dark:text-blue-400"
                    : "border-transparent text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 hover:border-gray-300"
                }`}
              >
                Tasks
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={handleToggleDarkMode}
              className="p-2 rounded-md text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>

            {/* User Menu */}
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-700 dark:text-gray-300">Welcome, {user?.username}</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200 dark:border-gray-700">
          <Link
            to="/dashboard"
            className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
              isActive("/dashboard")
                ? "bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300"
                : "text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700"
            }`}
          >
            Dashboard
          </Link>
          <Link
            to="/tasks"
            className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
              isActive("/tasks")
                ? "bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300"
                : "text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700"
            }`}
          >
            Tasks
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
