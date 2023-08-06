import express from "express"
import adminController from "../controllers/adminController.js"
import departmentController from "../controllers/departmentController.js"
import { verifyToken, verifyAdmin } from '../middlewares/authMiddleware.js'

const router = express.Router()
router.post('/reg', adminController.registerAdmin)
router.post('/auth', adminController.authAdmin)
router.get('/logout', verifyToken, verifyAdmin, adminController.logout)
router.get('/department', departmentController.getAllDepartments)
router.post('/department/add', verifyToken, verifyAdmin, departmentController.addDepartment)
router.get('/doctors/unapproved', verifyToken, verifyAdmin, adminController.getUnapprovedDoctors)
router.get('/doctors/approved', verifyToken, verifyAdmin, adminController.getApprovedDoctors)
router.get('/approve/doctor/:id', verifyToken, verifyAdmin, adminController.approveDoctor)
router.put('/block/doctor/:id', verifyToken, verifyAdmin, adminController.blockDoctor)

export default router