import express from "express"
import doctorController from "../controllers/doctorController.js"
import { verifyDoctor } from "../middlewares/authMiddleware.js"
import appointmentController from "../controllers/appointmetController.js"
import scheduleController from "../controllers/scheduleController.js"

const router = express.Router()

// /api/doc
router.post('/reg', doctorController.registerDoctor)
router.post('/auth', doctorController.authDoctor)
router.get('/logout', doctorController.logout)
router.get('/profile', verifyDoctor, doctorController.getProfile)
router.get('/schedule', verifyDoctor, scheduleController.getSchedules)
router.post('/schedule', verifyDoctor, scheduleController.createScedule)
router.delete('/schedule/:id', verifyDoctor, scheduleController.deleteSchedule)
router.post('/appointments', verifyDoctor, appointmentController.getAppointmentsByDate)


export default router