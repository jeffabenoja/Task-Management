import mongoose from "mongoose"

const boardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    columns: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
)

const Board = mongoose.model("Board", boardSchema)

export default Board
