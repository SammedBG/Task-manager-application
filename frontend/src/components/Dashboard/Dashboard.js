"use client"
import { useTask } from "../../contexts/TaskContext"
import { useAuth } from "../../contexts/AuthContext"
import StatsCards from "./StatsCards"
import ActivityChart from "./ActivityChart"
import TagDistribution from "./TagDistribution"
import RecentTasks from "./RecentTasks"
import LoadingSpinner from "../UI/LoadingSpinner"

const Dashboard = () => {
  const { analytics, loading } = useTask()
  const { user } = useAuth()

  if (loading || !analytics) {
    return <LoadingSpinner />
  }

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome back, {user?.username}!</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Here's an overview of your task management activity</p>
      </div>

      {/* Stats Cards */}
      <StatsCards analytics={analytics} />

      {/* Charts Section */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ActivityChart weeklyTasks={analytics.weeklyTasks} />
        <TagDistribution tagStats={analytics.tagStats} />
      </div>

      {/* Recent Tasks */}
      <div className="mt-8">
        <RecentTasks />
      </div>
    </div>
  )
}

export default Dashboard
