import mongoose from "mongoose"

const subSTaskSchema = new mongoose.Schema(
  {
    column_id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
)

const SubTask = mongoose.model("SubTask", subTaskSchema)

export default SubTask
