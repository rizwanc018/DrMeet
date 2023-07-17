import express from "express"
import doctorController from "../controllers/doctorController.js"
import { verifyDoctor } from "../middlewares/authMiddleware.js"

const router = express.Router()

// /api/doc
router.post('/reg', doctorController.registerDoctor)
router.post('/auth', doctorController.authDoctor)
router.get('/logout', doctorController.logout)
router.get('/profile', verifyDoctor, doctorController.getProfile)


export default router