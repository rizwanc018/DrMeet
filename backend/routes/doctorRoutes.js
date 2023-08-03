import express from "express"
import doctorController from "../controllers/doctorController.js"
import {verifyToken, verifyDoctor } from "../middlewares/authMiddleware.js"
import appointmentController from "../controllers/appointmetController.js"
import scheduleController from "../controllers/scheduleController.js"

const router = express.Router()

// /api/doc
router.post('/reg', doctorController.registerDoctor)
router.post('/auth', doctorController.authDoctor)
router.get('/logout', doctorController.logout)
router.get('/profile', verifyToken, verifyDoctor, doctorController.getProfile)
router.get('/schedule/:day', verifyToken, verifyDoctor, scheduleController.getSchedules)
router.post('/schedule', verifyToken, verifyDoctor, scheduleController.createScedule)
router.delete('/schedule/:id', verifyToken, verifyDoctor, scheduleController.deleteSchedule)
router.post('/appointments', verifyToken, verifyDoctor, appointmentController.getAppointmentsByDate)
router.get('/appointment/dates', verifyToken, verifyDoctor, appointmentController.getAllAppointmentDatesOfDoctor)

export default router