import express from "express"
import userController from "../controllers/userController.js"
import doctorController from "../controllers/doctorController.js"
// import { verifyDoctor } from "../middlewares/authMiddleware.js"

const router = express.Router()

// /api/doc
router.post('/reg', userController.registerUser)
router.post('/auth', userController.authUser)
router.get('/logout', userController.logout)
router.get('/doctors', doctorController.getAllDoctors)
router.get('/doctors/search', doctorController.getDoctorsByName)



export default router