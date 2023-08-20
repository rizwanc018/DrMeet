import express from "express"
import adminController from "../controllers/adminController.js"
import departmentController from "../controllers/departmentController.js"
import { verifyAdmin } from '../middlewares/authMiddleware.js'
import { limiter, verifyIpNotBlocked } from '../middlewares/securityMiddleware.js'


const router = express.Router()
router.post('/reg', adminController.registerAdmin)
router.post('/auth', adminController.authAdmin)
router.get('/logout', verifyAdmin, adminController.logout)
router.get('/department', departmentController.getAllDepartments)
router.post('/department/add', verifyAdmin, departmentController.addDepartment)
router.get('/doctors/unapproved', verifyAdmin, adminController.getUnapprovedDoctors)
router.get('/doctors/approved', verifyAdmin, adminController.getApprovedDoctors)
router.get('/approve/doctor/:id', verifyAdmin, adminController.approveDoctor)
router.put('/block/doctor/:id', verifyAdmin, adminController.blockDoctor)
router.get('/patients', verifyAdmin, adminController.getAllPatients)
router.put('/block/patient/:id', verifyAdmin, adminController.blockPatient)
router.get('/doctor/count', verifyAdmin, adminController.getAllDoctorsCount)
router.get('/patient/count', verifyAdmin, adminController.getAllPatientCount)
router.get('/appointment/count', verifyAdmin, adminController.getAllAppointmentsCount)
router.get('/earning', verifyAdmin, adminController.getTotalEarinings)
router.get('/appointments/data', verifyAdmin, adminController.getAppointmentsData)
router.get('/appointments/weekday/data', verifyAdmin, adminController.getAppointmentsPerWeekDay)








export default router