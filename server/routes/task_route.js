import express from "express"
import {
  task,
  updateSubtasks,
  deleteTask,
} from "../controllers/services/task.js"

const router = express.Router()

router.post("/create", task)
router.put("/updateSubtask/:taskId", updateSubtasks)
router.delete("/delete/:taskId", deleteTask)

export default router
