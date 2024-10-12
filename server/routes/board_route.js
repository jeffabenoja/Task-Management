import express from "express"
import { board, updateBoard, getBoard } from "../controllers/services/board.js"

const router = express.Router()

router.post("/create", board)
router.put("/update/:boardId", updateBoard)
router.get("/get/:boardId", getBoard)

export default router
