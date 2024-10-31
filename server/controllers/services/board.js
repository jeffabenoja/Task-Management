import { errorHandler } from "../../utils/errorHandler.js"
import mongoose from "mongoose"
import Board from "../../models/boards_model.js"
import Task from "../../models/task_model.js"

export const board = async (req, res, next) => {
  try {
    const { name, columns } = req.body

    // Check if required fields are provided
    if (!name || !columns) {
      return next(errorHandler(400, "Please provide all the required fields"))
    }

    // Generate a slug for the board name
    const slug = name
      .split(" ")
      .join("-")
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, "")

    const generateRandomColor = () => {
      const letters = "0123456789ABCDEF"
      let color = "#"
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
      }
      return color
    }

    const filteredColumns = columns
      ? columns
          .filter((column) => column.name.trim() !== "")
          .map((c) => ({
            ...c,
            _id: new mongoose.Types.ObjectId(),
            color: generateRandomColor(),
          }))
      : []

    // Create a new Board document using the provided data and generated slug
    const newBoard = new Board({ ...req.body, slug, columns: filteredColumns })
    const savedBoard = await newBoard.save()

    // Return the newly created board and its columns as a response
    res.status(201).json(savedBoard)
  } catch (error) {
    if (error.code === 11000) {
      console.log(error)
      return next(errorHandler(400, "This board name is already posted"))
    }
    next(error)
  }
}

export const updateBoard = async (req, res, next) => {
  try {
    const { name, columns } = req.body

    // Check if required fields are provided
    if (!name || !columns) {
      return next(errorHandler(400, "Please provide all the required fields"))
    }

    // Generate a slug for the board name
    const slug = name
      .split(" ")
      .join("-")
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, "")

    const filteredColumns = columns
      ? columns
          .filter((column) => column.name.trim() !== "")
          .map((c) => {
            if (!c._id) {
              return {
                ...c,
                _id: new mongoose.Types.ObjectId(),
              }
            }
            return {
              ...c,
            }
          })
      : []

    // Update board document using the provided data and generated slug
    const updatedBoard = await Board.findByIdAndUpdate(
      req.params.boardId,
      {
        $set: {
          name: req.body.name,
          slug,
          columns: filteredColumns,
        },
      },
      { new: true }
    )

    // Check if the board was found
    if (!updatedBoard) {
      return next(errorHandler(404, "Board not found")) // Handle the case where the board does not exist
    }

    // Return the updated board and its columns as a response
    res.status(200).json(updatedBoard)
  } catch (error) {
    next(error)
  }
}

export const getAllBoards = async (req, res, next) => {
  try {
    // Fetch all boards
    const boards = await Board.find().lean()

    // If no boards are found, return a 404 error
    if (!boards || boards.length === 0) {
      return next(errorHandler(404, "No boards found"))
    }

    // Use Promise.all to handle asynchronous fetching of tasks for each column in each board
    const boardsWithTasks = await Promise.all(
      boards.map(async (board) => {
        // Fetch tasks for each column in the board
        const columnsWithTasks = await Promise.all(
          board.columns.map(async (column) => {
            const tasks = await Task.find({ columnId: column._id }).lean()
            return {
              ...column,
              tasks, // Add tasks to the column
            }
          })
        )

        return {
          ...board,
          columns: columnsWithTasks, // Add columns with their tasks to the board
        }
      })
    )

    // Count the total number of columns and boards
    // const totalColumns = boards?.columns.length
    const totalBoards = boards.length

    // Return the boards with their columns, and the total counts
    res.status(200).json({
      boards: boardsWithTasks,
      totalBoards,
      // totalColumns, // Total number of columns
    })
  } catch (error) {
    next(error)
  }
}

export const deleteBoard = async (req, res, next) => {
  try {
    // Fetch the board
    let board = await Board.findById(req.params.boardId).lean()
    if (!board) {
      return res.status(404).json({ message: "Board not found" })
    }

    // Delete tasks associated with each column of the board
    await Promise.all(
      board.columns.map(async (column) => {
        await Task.deleteMany({ columnId: column._id }) // Correct deletion method
      })
    )

    // Delete the board
    await Board.findByIdAndDelete(req.params.boardId)

    res
      .status(200)
      .json({ message: "Board and associated tasks deleted successfully" })
  } catch (error) {
    next(error)
  }
}
