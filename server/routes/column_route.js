import express from "express"
import { createNewColumn } from "../controllers/services/column.js"

const router = express.Router()

router.post("/create/:boardId", createNewColumn)

export default router
