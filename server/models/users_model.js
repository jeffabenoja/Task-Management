import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: string,
      required: true,
    },
    lastname: {
      type: string,
      required: true,
    },
    email: {
      type: string,
      required: true,
      unique: true,
    },
    password: {
      type: string,
      required: true,
      unique: true,
    },
  },

  { timestamps: true }
)

const User = mongoose.model("User", userSchema)

export default Task
