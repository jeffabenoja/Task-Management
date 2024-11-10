import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import boardRoutes from "./routes/board_route.js"
import taskRoutes from "./routes/task_route.js"
import authRoutes from "./routes/auth_route.js"

// Load the environment variables into the application
dotenv.config() // This loads the environment variables from the .env file into process.env

mongoose
  .connect(process.env.MONGOOSE_API_KEY)
  .then(() => {
    // If the connection is successful, this message will be logged
    console.log(`Connected to your Database`)
  })
  .catch((error) => {
    // If the connection fails, the error is logged
    console.log(error)
  })

const app = express()

// Middleware to parse incoming JSON requests
app.use(express.json())

app.listen(7000, () => {
  console.log("server is running on port 7000")
})

app.use("/api/boards", boardRoutes)
app.use("/api/task", taskRoutes)
app.use("/api/auth", authRoutes)

// Middleware to handle errors. If any route or middleware throws an error, it will be caught here.
// `err` is the error object, and the middleware will send a structured JSON response with error details.
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500 // Default to 500 if no status code is provided
  const message = err.message || "Internal Server Error" // Default error message if none is provided
  res.status(statusCode).json({
    success: false, // Indicating that the request was not successful
    statusCode, // Sending back the status code of the error
    message, // Sending back the error message
  })
})
