import User from "../../models/users_model.js"
import bcryptjs from "bcryptjs"
import { errorHandler } from "../../utils/errorHandler.js"
import jwt from "jsonwebtoken"

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

    res.status(200).json({ success: true, message: "Register Successfully" })
  } catch (error) {
    next(error)
  }
}

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password) {
    return next(errorHandler(400, "Please provide all the required fields"))
  }
  try {
    const user = await User.findOne({ email })

    if (!user) {
      return next(errorHandler(400, "User not found"))
    }

    const isPasswordMatch = bcryptjs.compareSync(password, user.password)

    if (!isPasswordMatch) {
      return next(errorHandler(400, "Invalid credentials"))
    }

    const token = jwt.sign(
      {
        id: user._id,
        firstName: user.firstname,
        lastName: user.lastname,
      },
      process.env.JWT_SECRET
    )

    const { password: _password, ...rest } = user._doc

    res
      .status(200)
      .cookie("access_token", token, { httpOnly: true })
      .json({
        success: true,
        data: { ...rest },
        message: "Successfully Login",
      })
  } catch (error) {
    next(error)
  }
}
