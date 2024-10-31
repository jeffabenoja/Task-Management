import express from "express"
import { task, updateSubtasks } from "../controllers/services/task.js"

const router = express.Router()

router.post("/create", task)
router.put("/updateSubtask/:taskId", updateSubtasks)

export default router
