import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js"
import { Line } from "react-chartjs-2"
import { format, subDays } from "date-fns"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

const ActivityChart = ({ weeklyTasks }) => {
  // Generate last 7 days
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = subDays(new Date(), 6 - i)
    return format(date, "yyyy-MM-dd")
  })

  // Map data to last 7 days
  const chartData = last7Days.map((date) => {
    const taskData = weeklyTasks.find((task) => task._id === date)
    return taskData ? taskData.count : 0
  })

  const data = {
    labels: last7Days.map((date) => format(new Date(date), "MMM dd")),
    datasets: [
      {
        label: "Tasks Created",
        data: chartData,
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "rgb(59, 130, 246)",
        pointBorderColor: "rgb(59, 130, 246)",
        pointHoverBackgroundColor: "rgb(37, 99, 235)",
        pointHoverBorderColor: "rgb(37, 99, 235)",
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "rgb(107, 114, 128)",
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: true,
        text: "Weekly Activity",
        color: "rgb(17, 24, 39)",
        font: {
          size: 16,
          weight: "bold",
        },
      },
      tooltip: {
        backgroundColor: "rgba(17, 24, 39, 0.9)",
        titleColor: "white",
        bodyColor: "white",
        borderColor: "rgb(59, 130, 246)",
        borderWidth: 1,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          color: "rgb(107, 114, 128)",
        },
        grid: {
          color: "rgba(107, 114, 128, 0.1)",
        },
      },
      x: {
        ticks: {
          color: "rgb(107, 114, 128)",
        },
        grid: {
          color: "rgba(107, 114, 128, 0.1)",
        },
      },
    },
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 fade-in">
      <div className="h-80">
        <Line data={data} options={options} />
      </div>
    </div>
  )
}

export default ActivityChart
