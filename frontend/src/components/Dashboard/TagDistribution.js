import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Doughnut } from "react-chartjs-2"

ChartJS.register(ArcElement, Tooltip, Legend)

const TagDistribution = ({ tagStats }) => {
  if (!tagStats || tagStats.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 fade-in">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Tag Distribution</h3>
        <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
          No tags found. Start adding tags to your tasks!
        </div>
      </div>
    )
  }

  const colors = [
    "rgb(59, 130, 246)", // blue
    "rgb(16, 185, 129)", // green
    "rgb(245, 158, 11)", // yellow
    "rgb(239, 68, 68)", // red
    "rgb(139, 92, 246)", // purple
    "rgb(236, 72, 153)", // pink
    "rgb(6, 182, 212)", // cyan
    "rgb(34, 197, 94)", // emerald
  ]

  const data = {
    labels: tagStats.map((tag) => tag._id),
    datasets: [
      {
        data: tagStats.map((tag) => tag.count),
        backgroundColor: colors.slice(0, tagStats.length),
        borderColor: colors
          .slice(0, tagStats.length)
          .map((color) => color.replace("rgb", "rgba").replace(")", ", 0.8)")),
        borderWidth: 2,
        hoverBackgroundColor: colors
          .slice(0, tagStats.length)
          .map((color) => color.replace("rgb", "rgba").replace(")", ", 0.8)")),
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "rgb(107, 114, 128)",
          font: {
            size: 12,
          },
          padding: 20,
          usePointStyle: true,
        },
      },
      tooltip: {
        backgroundColor: "rgba(17, 24, 39, 0.9)",
        titleColor: "white",
        bodyColor: "white",
        borderColor: "rgb(59, 130, 246)",
        borderWidth: 1,
        callbacks: {
          label: (context) => {
            const total = context.dataset.data.reduce((a, b) => a + b, 0)
            const percentage = Math.round((context.parsed / total) * 100)
            return `${context.label}: ${context.parsed} tasks (${percentage}%)`
          },
        },
      },
    },
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 fade-in">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Tag Distribution</h3>
      <div className="h-80">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  )
}

export default TagDistribution
