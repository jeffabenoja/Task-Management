import { errorHandler } from "../../utils/errorHandler.js"
import Board from "../../models/boards_model.js"
import Column from "../../models/column_model.js"

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

    // Create a new Board document using the provided data and generated slug
    const newBoard = new Board({ ...req.body, slug })
    const savedBoard = await newBoard.save()

    let createdColumns = []

    // If columns are provided, map through them and create new columns linked to the board
    if (columns && columns.length > 0) {
      createdColumns = await Promise.all(
        columns.map(async (columnData) => {
          // Generate a slug for the column name
          const columnSlug = columnData.name
            .split(" ")
            .join("-")
            .toLowerCase()
            .replace(/[^a-zA-Z0-9-]/g, "")

          const newColumn = new Column({
            board_id: savedBoard._id,
            name: columnData.name,
            slug: columnSlug,
          })

          // Save each new column
          return await newColumn.save()
        })
      )
    }

    // Return the newly created board and its columns as a response
    res.status(201).json({
      ...savedBoard._doc,
      columns: createdColumns,
    })
  } catch (error) {
    if (error.code === 11000) {
      return next(errorHandler(400, "This title topic already posted"))
    }
    next(error)
  }
}
