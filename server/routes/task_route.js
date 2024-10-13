import express from "express"
import { task } from "../controllers/services/task.js"

const router = express.Router()

router.post("/create", task)

export default router
