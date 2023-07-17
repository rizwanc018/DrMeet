import express from "express"
import doctorController from "../controllers/doctorController.js"

const router =  express.Router()

// /api/doc
router.post('/reg', doctorController.registerDoctor)
router.post('/auth', doctorController.authDoctor)
router.get('/logout',doctorController.logout)


export default router