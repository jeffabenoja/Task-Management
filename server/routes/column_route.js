import express from "express"
import { createNewColumn, getColumns } from "../controllers/services/column.js"

const router = express.Router()

router.post("/create/:boardId", createNewColumn)
router.post("/get/:boardId", getColumns)

export default router
