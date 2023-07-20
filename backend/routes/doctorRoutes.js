import express from "express"
import doctorController from "../controllers/doctorController.js"
import { verifyDoctor } from "../middlewares/authMiddleware.js"

const router = express.Router()

// /api/doc
router.post('/reg', doctorController.registerDoctor)
router.post('/auth', doctorController.authDoctor)
router.get('/logout', doctorController.logout)
router.get('/profile', verifyDoctor, doctorController.getProfile)
router.get('/schedule', verifyDoctor, doctorController.getSchedules)
router.post('/schedule', verifyDoctor, doctorController.createScedule)
router.delete('/schedule/:id', verifyDoctor, doctorController.deleSchedule)

export default router