import express from "express"
import {
  registerUser,
  loginUser,
  signOut,
} from "../controllers/services/auth.js"

const router = express.Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("/signout", signOut)

export default router
