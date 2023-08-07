import express from "express"
import userController from "../controllers/userController.js"
import doctorController from "../controllers/doctorController.js"
import appointmentController from "../controllers/appointmetController.js"
import { verifyUser } from "../middlewares/authMiddleware.js"
import scheduleController from "../controllers/scheduleController.js"
import { limiter } from '../middlewares/securityMiddleware.js'

const router = express.Router()

// /api/doc
router.post('/reg', userController.registerUser)
router.post('/auth',limiter, userController.authUser)
router.get('/logout', userController.logout)
router.get('/doctor/:id', verifyUser, doctorController.getDoctorById)
router.get('/doctors', doctorController.getAllDoctors)
router.get('/doctors/search', doctorController.getDoctorsByName)
router.post('/schedule/times', scheduleController.getScheduleTimes)
// router.post('/appointment',  verifyUser, appointmentController.makeAppointment)
// router.post('/appointment/availbility', appointmentController.checkAvailability)
router.post('/appointment/details', verifyUser, appointmentController.getAppontmentDetails)
router.get('/doctor/schedule/days/:id', verifyUser, scheduleController.getScheduledDays)
router.get('/appointments', verifyUser, appointmentController.getUpComingAppointmentsOfPatient)

export default router