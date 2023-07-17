import express from "express"
import adminController from "../controllers/adminController.js"
import departmentController from "../controllers/departmentController.js"
import doctorController from "../controllers/doctorController.js"

import asyncHandler from 'express-async-handler'


const router = express.Router()


router.post('/reg', adminController.registerAdmin)
router.post('/auth', adminController.authAdmin)
router.get('/logout',adminController.logout)
router.get('/department', departmentController.getAllDepartments)
router.post('/department/add', departmentController.addDepartment)
router.get('/doctors/unapproved', doctorController.getUnapprovedDoctors)
router.get('/approve/doctor/:id', doctorController.approveDoctor)



export default router