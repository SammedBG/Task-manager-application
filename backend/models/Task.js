const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    dueDate: {
      type: Date,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    order: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

// Index for efficient querying
taskSchema.index({ user: 1, order: 1 })
taskSchema.index({ user: 1, completed: 1 })
taskSchema.index({ user: 1, tags: 1 })

module.exports = mongoose.model("Task", taskSchema)
