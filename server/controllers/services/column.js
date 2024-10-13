import Column from "../../models/column_model.js"

export const createNewColumn = async (req, res, next) => {
  try {
    const { columns } = req.body

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
            board_id: req.params.boardId,
            name: columnData.name,
            slug: columnSlug,
          })

          // Save each new column
          return await newColumn.save()
        })
      )
    }

    // Return the  new columns
    res.status(200).json({
      columns: createdColumns,
    })
  } catch (error) {
    next(error)
  }
}

export const getColumns = async (req, res, next) => {
  try {
    console.log(req.body)
    // Fetch the board by ID
    const column = await Column.find({ boardId: req.params.boardId })

    // If the board is not found, return a 404 error
    if (!column) {
      return next(errorHandler(404, "Column not found"))
    }

    // Count the total number of columns for this board (optional: or for all columns in the collection)
    const totalColumns = await Column.countDocuments()

    // Return the board, its columns, and the total column count
    res.status(200).json({
      ...column.toObject(),
      totalColumns,
    })
  } catch (error) {
    next(error)
  }
}
