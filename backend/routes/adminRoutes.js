import express from "express"
import adminController from "../controllers/adminController.js"
import departmentController from "../controllers/departmentController.js"
import { verifyAdmin } from '../middlewares/authMiddleware.js'

const router = express.Router()
router.post('/reg', adminController.registerAdmin)
router.post('/auth', adminController.authAdmin)
router.get('/logout', verifyAdmin, adminController.logout)
router.get('/department', departmentController.getAllDepartments)
router.post('/department/add', verifyAdmin, departmentController.addDepartment)
router.get('/doctors/unapproved', verifyAdmin, adminController.getUnapprovedDoctors)
router.get('/approve/doctor/:id', verifyAdmin, adminController.approveDoctor)

export default router