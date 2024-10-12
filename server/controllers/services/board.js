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

    // Update board document using the provided data and generated slug
    const updatedBoard = await Board.findByIdAndUpdate(
      req.params.boardId,
      {
        $set: {
          name: req.body.name,
          slug,
        },
      },
      { new: true }
    )

    // Check if the board was found
    if (!updatedBoard) {
      return next(errorHandler(404, "Board not found")) // Handle the case where the board does not exist
    }

    let updatedColumns = []

    // If columns are provided, map through them and create new columns linked to the board
    if (columns && columns.length > 0) {
      updatedColumns = await Promise.all(
        columns.map(async (columnData) => {
          // Generate a slug for the column name
          const columnSlug = columnData.name
            .split(" ")
            .join("-")
            .toLowerCase()
            .replace(/[^a-zA-Z0-9-]/g, "")

          if (columnData._id) {
            // Update existing column if _id exists
            const updatedColumn = await Column.findByIdAndUpdate(
              columnData._id,
              {
                $set: {
                  name: columnData.name,
                  slug: columnSlug,
                },
              },
              { new: true }
            )

            // Check if the column was updated successfully
            if (!updatedColumn) {
              console.warn(`Column with ID ${columnData._id} not found.`)
            }
            return updatedColumn
          } else {
            // Create a new column if _id does not exist
            const newColumn = new Column({
              board_id: req.params.boardId,
              name: columnData.name,
              slug: columnSlug,
            })

            // Save the new column
            return await newColumn.save()
          }
        })
      )
    }

    // Return the updated board and its columns as a response
    res.status(200).json({
      ...updatedBoard.toObject(),
      columns: updatedColumns,
    })
  } catch (error) {
    next(error)
  }
}

export const getBoard = async (req, res, next) => {
  try {
    // Fetch the board by ID
    const board = await Board.findById(req.params.boardId)


    // If the board is not found, return a 404 error
    if (!board) {
      return next(errorHandler(404, "Board not found"))
    }

    // Fetch all columns associated with the board
    const columns = await Column.find({ board_id: req.params.boardId })

    // Count the total number of columns for this board (optional: or for all columns in the collection)
    const totalColumns = await Column.countDocuments()

    // Return the board, its columns, and the total column count
    res.status(200).json({
      ...board.toObject(),
      columns: columns,
      totalColumns,
    })
  } catch (error) {
    next(error)
  }
}
