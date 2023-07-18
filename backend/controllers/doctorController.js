import asyncHandler from 'express-async-handler'
import bcrypt from 'bcrypt'
import Doctor from '../models/doctorModel.js'
import { generateJWT } from '../utils/generateJWT.js'

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

        if (response) res.status(200).json({ msg: `Registration successfull. Your request will be approved in 2 business days` })
    }),
    authDoctor: asyncHandler(async (req, res) => {
        const { email, password } = req.body
        const doctor = await Doctor.findOne({ email }).populate('department', 'name -_id')

        if (doctor && !doctor.approved) {
            res.status(401)
            throw new Error('Access denied: Approval pending')
        }

        if (doctor && (await doctor.matchPassword(password))) {
            generateJWT(res, doctor._id, 30)
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
    logout: asyncHandler(async (req, res) => {
        res.cookie('jwt', '', {
            httpOnly: true,
            expires: new Date(0)
        })
        res.status(200).json({ msg: 'Logged out successfuly', success: true})
    }),
    getProfile: asyncHandler(async (req, res) => {
        res.status(200).json({ msg: req.doctor })
    })
}

export default doctorController