import express from "express"
import doctorController from "../controllers/doctorController.js"

const router =  express.Router()

// /api/doc
router.post('/reg', doctorController.registerDoctor)
router.post('/auth', doctorController.authDoctor)


export default router