import express from "express"
import { board } from "../controllers/services/board.js"

const router = express.Router()

router.post("/create", board)

export default router
