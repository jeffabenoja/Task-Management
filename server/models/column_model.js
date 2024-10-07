import mongoose from "mongoose"

const columnSchema = new mongoose.Schema(
  {
    // user_id: {
    //   type: String,
    //   required: true,
    // },
    board_id: {
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

const Column = mongoose.model("Column", columnSchema)

export default Column
