"use client"

import { createContext, useContext, useState, useEffect } from "react"
import axios from "axios"
import { useAuth } from "./AuthContext"

const TaskContext = createContext()

export const useTask = () => {
  const context = useContext(TaskContext)
  if (!context) {
    throw new Error("useTask must be used within a TaskProvider")
  }
  return context
}

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState("all") // all, completed, pending
  const [tagFilter, setTagFilter] = useState("")
  const [analytics, setAnalytics] = useState(null)
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      fetchTasks()
      fetchAnalytics()
    }
  }, [user, filter, tagFilter])

  const fetchTasks = async () => {
    setLoading(true)
    try {
      const params = {}
      if (filter !== "all") params.status = filter
      if (tagFilter) params.tag = tagFilter

      const response = await axios.get("/api/tasks", { params })
      setTasks(response.data)
    } catch (error) {
      console.error("Error fetching tasks:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchAnalytics = async () => {
    try {
      const response = await axios.get("/api/tasks/analytics")
      setAnalytics(response.data)
    } catch (error) {
      console.error("Error fetching analytics:", error)
    }
  }

  const createTask = async (taskData) => {
    try {
      const response = await axios.post("/api/tasks", taskData)
      setTasks((prev) => [...prev, response.data])
      fetchAnalytics() // Refresh analytics
      return { success: true, task: response.data }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to create task",
      }
    }
  }

  const updateTask = async (taskId, updates) => {
    try {
      const response = await axios.patch(`/api/tasks/${taskId}`, updates)
      setTasks((prev) => prev.map((task) => (task._id === taskId ? response.data : task)))
      fetchAnalytics() // Refresh analytics
      return { success: true, task: response.data }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to update task",
      }
    }
  }

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`/api/tasks/${taskId}`)
      setTasks((prev) => prev.filter((task) => task._id !== taskId))
      fetchAnalytics() // Refresh analytics
      return { success: true }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to delete task",
      }
    }
  }

  const reorderTasks = async (reorderedTasks) => {
    // Optimistically update UI
    setTasks(reorderedTasks)

    try {
      const taskOrders = reorderedTasks.map((task, index) => ({
        id: task._id,
        order: index,
      }))

      await axios.patch("/api/tasks/reorder", { taskOrders })
      return { success: true }
    } catch (error) {
      // Revert on error
      fetchTasks()
      return {
        success: false,
        message: error.response?.data?.message || "Failed to reorder tasks",
      }
    }
  }

  const toggleTaskComplete = async (taskId) => {
    const task = tasks.find((t) => t._id === taskId)
    if (!task) return

    return updateTask(taskId, { completed: !task.completed })
  }

  const getAllTags = () => {
    const tagSet = new Set()
    tasks.forEach((task) => {
      task.tags.forEach((tag) => tagSet.add(tag))
    })
    return Array.from(tagSet)
  }

  const value = {
    tasks,
    loading,
    filter,
    setFilter,
    tagFilter,
    setTagFilter,
    analytics,
    createTask,
    updateTask,
    deleteTask,
    reorderTasks,
    toggleTaskComplete,
    getAllTags,
    fetchTasks,
    fetchAnalytics,
  }

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
}
