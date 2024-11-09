import express from "express"
import {
  board,
  updateBoard,
  getAllBoards,
  deleteBoard,
  updateColumn,
} from "../controllers/services/board.js"

const router = express.Router()

router.post("/create", board)
router.put("/update/:boardId", updateBoard)
router.put("/update/columns/:boardId", updateColumn)
router.get("/get", getAllBoards)
router.delete("/delete/:boardId", deleteBoard)

export default router
