import mongoose from "mongoose"

const boardSchema = new mongoose.Schema(
  {
    // userId: {
    //   type: String,
    //   required: true,
    // }
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

const Board = mongoose.model("Board", boardSchema)

export default Board
