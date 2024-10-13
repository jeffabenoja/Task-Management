import mongoose from "mongoose"

const taskSchema = new mongoose.Schema(
  {
    columnId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: { type: String },
    status: {
      type: String,
      required: true,
    },
    subtasks: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
)

const Task = mongoose.model("Task", taskSchema)

export default Task
