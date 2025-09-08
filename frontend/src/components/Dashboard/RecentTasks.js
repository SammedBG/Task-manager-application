import { useTask } from "../../contexts/TaskContext"
import { format } from "date-fns"

const RecentTasks = () => {
  const { tasks } = useTask()

  // Get 5 most recent tasks
  const recentTasks = tasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5)

  if (recentTasks.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 fade-in">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Tasks</h3>
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          No tasks yet. Create your first task to get started!
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 fade-in">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Tasks</h3>
      <div className="space-y-3">
        {recentTasks.map((task) => (
          <div
            key={task._id}
            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
          >
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${task.completed ? "bg-green-500" : "bg-yellow-500"}`} />
              <div>
                <p
                  className={`font-medium ${
                    task.completed ? "text-gray-500 dark:text-gray-400 line-through" : "text-gray-900 dark:text-white"
                  }`}
                >
                  {task.title}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Created {format(new Date(task.createdAt), "MMM dd, yyyy")}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {task.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 rounded-full"
                >
                  {tag}
                </span>
              ))}
              <span
                className={`px-2 py-1 text-xs rounded-full ${
                  task.priority === "high"
                    ? "bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300"
                    : task.priority === "medium"
                      ? "bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300"
                      : "bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300"
                }`}
              >
                {task.priority}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecentTasks
