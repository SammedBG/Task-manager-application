"use client"

import { useState } from "react"
import { useTask } from "../../contexts/TaskContext"
import { format, isBefore, addDays } from "date-fns"

const TaskItem = ({ task, onEdit, isDragging }) => {
  const { toggleTaskComplete, deleteTask } = useTask()
  const [showConfirmDelete, setShowConfirmDelete] = useState(false)

  const handleToggleComplete = () => {
    toggleTaskComplete(task._id)
  }

  const handleDelete = async () => {
    await deleteTask(task._id)
    setShowConfirmDelete(false)
  }

  const getDueDateStatus = () => {
    if (!task.dueDate) return null

    const dueDate = new Date(task.dueDate)
    const today = new Date()
    const tomorrow = addDays(today, 1)

    if (isBefore(dueDate, today)) {
      return { status: "overdue", color: "text-red-600 dark:text-red-400" }
    } else if (isBefore(dueDate, tomorrow)) {
      return { status: "due-today", color: "text-orange-600 dark:text-orange-400" }
    } else if (isBefore(dueDate, addDays(today, 3))) {
      return { status: "due-soon", color: "text-yellow-600 dark:text-yellow-400" }
    }
    return { status: "future", color: "text-gray-600 dark:text-gray-400" }
  }

  const dueDateStatus = getDueDateStatus()

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-all duration-200 ${
        isDragging ? "shadow-lg transform rotate-1" : ""
      } ${task.completed ? "opacity-75" : ""}`}
    >
      <div className="flex items-start space-x-3">
        {/* Drag Handle */}
        <div className="flex-shrink-0 mt-1 cursor-grab active:cursor-grabbing">
          <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </div>

        {/* Checkbox */}
        <button
          onClick={handleToggleComplete}
          className={`flex-shrink-0 mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors duration-200 ${
            task.completed
              ? "bg-green-500 border-green-500 text-white"
              : "border-gray-300 dark:border-gray-600 hover:border-green-500"
          }`}
        >
          {task.completed && (
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>

        {/* Task Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3
                className={`text-lg font-medium ${
                  task.completed ? "text-gray-500 dark:text-gray-400 line-through" : "text-gray-900 dark:text-white"
                }`}
              >
                {task.title}
              </h3>
              {task.description && (
                <p
                  className={`mt-1 text-sm ${
                    task.completed ? "text-gray-400 dark:text-gray-500" : "text-gray-600 dark:text-gray-300"
                  }`}
                >
                  {task.description}
                </p>
              )}
            </div>

            {/* Priority Badge */}
            <span
              className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${
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

          {/* Tags */}
          {task.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {task.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Due Date */}
          {task.dueDate && (
            <div className={`mt-2 text-sm ${dueDateStatus.color}`}>
              <span className="font-medium">Due: {format(new Date(task.dueDate), "MMM dd, yyyy")}</span>
              {dueDateStatus.status === "overdue" && <span className="ml-1 font-bold">(Overdue)</span>}
              {dueDateStatus.status === "due-today" && <span className="ml-1 font-bold">(Due Today)</span>}
            </div>
          )}

          {/* Actions */}
          <div className="mt-3 flex items-center space-x-2">
            <button
              onClick={() => onEdit(task)}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium transition-colors duration-200"
            >
              Edit
            </button>
            <button
              onClick={() => setShowConfirmDelete(true)}
              className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 text-sm font-medium transition-colors duration-200"
            >
              Delete
            </button>
            <span className="text-gray-300 dark:text-gray-600">•</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Created {format(new Date(task.createdAt), "MMM dd")}
            </span>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showConfirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm mx-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Delete Task</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Are you sure you want to delete "{task.title}"? This action cannot be undone.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={handleDelete}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                Delete
              </button>
              <button
                onClick={() => setShowConfirmDelete(false)}
                className="flex-1 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TaskItem
