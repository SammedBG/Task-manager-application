"use client"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "./contexts/AuthContext"
import { useTheme } from "./contexts/ThemeContext"

// Components
import Navbar from "./components/Navbar"
import Login from "./components/Auth/Login"
import Register from "./components/Auth/Register"
import Dashboard from "./components/Dashboard/Dashboard"
import TaskList from "./components/Tasks/TaskList"
import LoadingSpinner from "./components/UI/LoadingSpinner"

function App() {
  const { user, loading } = useAuth()
  const { darkMode } = useTheme()

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-200 ${
        darkMode ? "dark bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <Router>
        {user && <Navbar />}
        <Routes>
          <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
          <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />
          <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/tasks" element={user ? <TaskList /> : <Navigate to="/login" />} />
          <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
