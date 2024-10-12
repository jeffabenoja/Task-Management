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
