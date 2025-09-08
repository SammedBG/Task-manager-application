const StatsCards = ({ analytics }) => {
  const { totalTasks, completedTasks, pendingTasks } = analytics
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  const stats = [
    {
      name: "Total Tasks",
      value: totalTasks,
      icon: "📋",
      color: "bg-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      name: "Completed",
      value: completedTasks,
      icon: "✅",
      color: "bg-green-500",
      bgColor: "bg-green-50 dark:bg-green-900/20",
    },
    {
      name: "Pending",
      value: pendingTasks,
      icon: "⏳",
      color: "bg-yellow-500",
      bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
    },
    {
      name: "Completion Rate",
      value: `${completionRate}%`,
      icon: "📊",
      color: "bg-purple-500",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div
          key={stat.name}
          className={`${stat.bgColor} rounded-lg p-6 border border-gray-200 dark:border-gray-700 fade-in`}
        >
          <div className="flex items-center">
            <div className={`${stat.color} rounded-lg p-3 text-white text-xl`}>{stat.icon}</div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.name}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default StatsCards
