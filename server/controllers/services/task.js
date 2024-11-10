import { errorHandler } from "../../utils/errorHandler.js"
import Task from "../../models/task_model.js"

export const task = async (req, res, next) => {
  try {
    const { title, subtasks } = req.body

    // Check if required fields are provided
    if (!title) {
      return next(errorHandler(400, "Please provide all the required fields"))
    }

    // Filter out subtasks with empty titles
    const filteredSubtasks = subtasks
      ? subtasks.filter((subtask) => subtask.title.trim() !== "")
      : []

    // Create a new task with filtered subtasks
    const newTask = new Task({ ...req.body, subtasks: filteredSubtasks })

    const saveNewTask = await newTask.save()

    res.status(201).json(saveNewTask)
  } catch (error) {
    next(error)
  }
}

export const updateSubtasks = async (req, res, next) => {
  try {
    const { title, description, id, subtasks, status, columnId } = req.body

    if (id !== req.params.taskId) {
      errorHandler("You're not allowed to make this update")
    }

    // Avoid using the function name here
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.taskId,
      {
        $set: {
          columnId: columnId,
          title: title,
          description: description,
          status: status,
          subtasks: subtasks,
        },
      }, // Update only the subtasks field
      { new: true } // Return the updated document
    )

    // Check if the task was found and updated
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" })
    }

    res.status(200).json(updatedTask)
  } catch (error) {
    next(error)
  }
}

export const deleteTask = async (req, res, next) => {
  try {
    // Fetch the board
    let task = await Task.findById(req.params.taskId).lean()
    if (!task) {
      return res.status(404).json({ message: "Task not found" })
    }

    // Delete the Task
    await Task.findByIdAndDelete(req.params.taskId)

    res
      .status(200)
      .json({ message: "Board and associated tasks deleted successfully" })
  } catch (error) {
    next(error)
  }
}
