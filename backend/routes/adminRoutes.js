import express from "express"
import adminController from "../controllers/adminController.js"
import departmentController from "../controllers/departmentController.js"

const router =  express.Router()

router.post('/reg', adminController.registerAdmin)
router.post('/auth', adminController.authAdmin)
router.post('/department/add', departmentController.addDepartment)


export default router