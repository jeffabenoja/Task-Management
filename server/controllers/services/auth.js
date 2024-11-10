import User from "../../models/users_model.js"
import bcryptjs from "bcryptjs"
import { errorHandler } from "../../utils/errorHandler.js"

export const registerUser = async (req, res, next) => {
  try {
    const { firstname, lastname, email, password } = req.body

    if (!firstname || !lastname || !email || !password) {
      return next(errorHandler(400, "Please provide all the required fields"))
    }

    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return next(errorHandler(400, "User already exists with this email"))
    }

    const hashedPassword = bcryptjs.hashSync(password, 10)

    // Create a new user object with the hashed password
    const newUser = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    })

    // Save the new user to the database
    await newUser.save()

    res.status(200).json("Register Successfully")
  } catch (error) {
    next(error)
  }
}

export const loginUser = async (req, res, next) => {}
