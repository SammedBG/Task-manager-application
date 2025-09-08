const express = require("express")
const Task = require("../models/Task")
const auth = require("../middleware/auth")

const router = express.Router()

// Get all tasks for user
router.get("/", auth, async (req, res) => {
  try {
    const { status, tag, sortBy = "order" } = req.query

    const filter = { user: req.user._id }

    if (status === "completed") {
      filter.completed = true
    } else if (status === "pending") {
      filter.completed = false
    }

    if (tag) {
      filter.tags = { $in: [tag] }
    }

    const tasks = await Task.find(filter).sort({ [sortBy]: 1, createdAt: -1 })
    res.json(tasks)
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

// Create task
router.post("/", auth, async (req, res) => {
  try {
    const { title, description, dueDate, tags, priority } = req.body

    // Get the highest order number for this user
    const lastTask = await Task.findOne({ user: req.user._id }).sort({ order: -1 })
    const order = lastTask ? lastTask.order + 1 : 0

    const task = new Task({
      title,
      description,
      dueDate,
      tags: tags || [],
      priority: priority || "medium",
      order,
      user: req.user._id,
    })

    await task.save()
    res.status(201).json(task)
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

// Update task
router.patch("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id })

    if (!task) {
      return res.status(404).json({ message: "Task not found" })
    }

    const updates = req.body
    Object.keys(updates).forEach((key) => {
      task[key] = updates[key]
    })

    await task.save()
    res.json(task)
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

// Delete task
router.delete("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user._id })

    if (!task) {
      return res.status(404).json({ message: "Task not found" })
    }

    res.json({ message: "Task deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

// Reorder tasks
router.patch("/reorder", auth, async (req, res) => {
  try {
    const { taskOrders } = req.body // Array of { id, order }

    const bulkOps = taskOrders.map(({ id, order }) => ({
      updateOne: {
        filter: { _id: id, user: req.user._id },
        update: { order },
      },
    }))

    await Task.bulkWrite(bulkOps)
    res.json({ message: "Tasks reordered successfully" })
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

// Get task analytics
router.get("/analytics", auth, async (req, res) => {
  try {
    const totalTasks = await Task.countDocuments({ user: req.user._id })
    const completedTasks = await Task.countDocuments({ user: req.user._id, completed: true })
    const pendingTasks = totalTasks - completedTasks

    // Get tasks created in the last 7 days
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    const weeklyTasks = await Task.aggregate([
      {
        $match: {
          user: req.user._id,
          createdAt: { $gte: sevenDaysAgo },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ])

    // Get tag distribution
    const tagStats = await Task.aggregate([
      { $match: { user: req.user._id } },
      { $unwind: "$tags" },
      { $group: { _id: "$tags", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ])

    res.json({
      totalTasks,
      completedTasks,
      pendingTasks,
      weeklyTasks,
      tagStats,
    })
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

module.exports = router
