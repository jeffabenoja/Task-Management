import express from "express"
import dotenv from "dotenv"
// Load the environment variables into the application
dotenv.config() // This loads the environment variables from the .env file into process.env

// Middleware to parse incoming JSON requests
app.use(express.json())

const app = express()

app.listen(7000, () => {
  console.log("server is running on port 7000")
})

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
