import asyncHandler from 'express-async-handler'
import bcrypt from 'bcrypt'
import Doctor from '../models/doctorModel.js'
import { generateDoctorJWT } from '../utils/generateJWT.js'

const doctorController = {
    registerDoctor: asyncHandler(async (req, res) => {
        const { fname, lname, email, password, mobile, department, degree, proof, image } = req.body

        const isExist = await Doctor.exists({ email })
        if (isExist) {
            res.status(409)
            throw new Error(`Email already exist`)
        }

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        const response = await Doctor.create({ fname, lname, email, password: hash, mobile, department, degree, proof, image })

        if (response) res.status(200).json({ msg: `Registration successfull, kindly wait for admin approval` })
    }),
    authDoctor: asyncHandler(async (req, res) => {
        const { email, password } = req.body
        const doctor = await Doctor.findOne({ email }).populate('department', 'name -_id')

        if (doctor && !doctor.approved) {
            res.status(401)
            throw new Error('Access denied: Approval pending')
        }

        if (doctor && (await doctor.matchPassword(password))) {
            generateDoctorJWT(res, doctor._id)
            res.status(201).json({
                _id: doctor._id,
                fname: doctor.fname,
                lname: doctor.lname,
                degree: doctor.degree,
                department: doctor.department.name,
                image: doctor.image,
                isDoctor: doctor.isDoctor
            })
        } else {
            res.status(400)
            throw new Error('Invalid username or password')
        }
    }),
    getUnapprovedDoctors: asyncHandler(async (req, res) => {
        const unapprovedDoctors = await Doctor.find({ approved: false }).populate('department', 'name -_id')
        res.status(200).json({ unapprovedDoctors })

    })
}

export default doctorController