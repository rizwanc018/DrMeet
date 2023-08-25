import asyncHandler from 'express-async-handler'
import bcrypt from 'bcrypt'
import Doctor from '../models/doctorModel.js'
import { generateJWT } from '../utils/generateJWT.js'
import moment from 'moment'
import Appointment from '../models/appointmentModel.js'
import mongoose from 'mongoose'
import Schedule from '../models/scheduleModel.js'
import jwt from 'jsonwebtoken'


const doctorController = {
    registerDoctor: asyncHandler(async (req, res) => {

        const { fname, lname, email, password, mobile, department, degree, proof, image, bio, experience, fees } = req.body
        const isExist = await Doctor.exists({ email })
        if (isExist) {
            res.status(409)
            throw new Error(`Email already exist`)
        }
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        const response = await Doctor.create({ fname, lname, email, password: hash, mobile, department, degree, proof, bio, image, experience, fees })

        if (response) res.status(200).json({ msg: `Registration successfull. Your request will be approved in 2 business days` })
    }),
    authDoctor: asyncHandler(async (req, res) => {
        const { email, password } = req.body
        const doctor = await Doctor.findOne({ email }).populate('department', 'name -_id')

        if (doctor && !doctor.approved) {
            res.status(401)
            throw new Error('Access denied: Approval pending')
        }

        if (doctor && doctor.blocked) {
            res.status(401)
            throw new Error('Access denied: Admin has blocked you')
        }

        if (doctor && (await doctor.matchPassword(password))) {
            // generateJWT(res, doctor._id, 'doctor', doctor.blocked, 24 * 60)
            const token = jwt.sign({ id: doctor._id, role: 'doctor', blocked: doctor.blocked }, process.env.JWT_SECRET, {
                expiresIn: 24 * 60 + 'm'
            })
            res.status(201).json({
                _id: doctor._id,
                fname: doctor.fname,
                lname: doctor.lname,
                degree: doctor.degree,
                department: doctor.department.name,
                image: doctor.image,
                isDoctor: doctor.isDoctor,
                experience: doctor.experience,
                bio: doctor.bio,
                token
            })
        } else {
            res.status(400)
            throw new Error('Invalid email or password')
        }
    }),
    logout: asyncHandler(async (req, res) => {
        res.cookie('jwt', '', {
            httpOnly: true,
            expires: new Date(0)
        })
        res.status(200).json({ msg: 'Logged out successfuly', success: true })
    }),
    getProfile: asyncHandler(async (req, res) => {
        res.status(200).json({ msg: req.doctor })
    }),

    getAllDoctors: asyncHandler(async (req, res) => {
        const doctors = await Doctor.find({ approved: true }, { fname: 1, lname: 1, department: 1, degree: 1, image: 1, fees: 1 }).populate('department', 'name -_id')
        res.status(200).json({ success: true, doctors })
    }),
    getDoctorsByDepartmentId: asyncHandler(async (req, res) => {
        const department = req.params.depId
        const doctors = await Doctor.find({ department, approved: true }, { fname: 1, lname: 1, department: 1, degree: 1, image: 1, fees: 1 }).populate('department', 'name -_id')
        res.status(200).json({ success: true, doctors })
    }),
    getDoctorsByName: asyncHandler(async (req, res) => {
        const regx = req.query.q || '.*'
        const doctors = await Doctor.find({
            approved: true,
            $or: [
                { fname: { $regex: new RegExp(regx, "i") } },
                { lname: { $regex: new RegExp(regx, "i") } },

            ]
        })
            .populate('department', 'name -_id');
        res.status(200).json({ success: true, doctors })
    }),
    getDoctorById: asyncHandler(async (req, res) => {
        const id = req.params.id
        const doctor = await Doctor.findById(id).populate('department', 'name -_id')
        res.status(200).json({ success: true, doctor })
    }),
    getAppointmentsCount: asyncHandler(async (req, res) => {
        const docId = req.doctor._id
        const count = await Appointment.countDocuments({ docId })
        res.status(200).json({ success: true, count })
    }),
    getEarning: asyncHandler(async (req, res) => {
        const docId = req.doctor._id
        const result = await Appointment.find({ docId }).populate('docId', 'fees -_id')
        const earnings = Number(result[0].docId.fees) * result.length
        res.status(200).json({ success: true, earnings })
    }),
    getScheduleDays: asyncHandler(async (req, res) => {
        const docId = req.doctor._id
        const data = await Schedule.aggregate([
            {
                $match: { docId: new mongoose.Types.ObjectId(docId) }
            },
            {
                $group: {
                    _id: '$day',
                    count: { $sum: 1 },
                },
            },
        ])
        res.status(200).json({ success: true, data: data.length })
    }),
    getSlotsCount: asyncHandler(async (req, res) => {
        const docId = req.doctor._id
        const count = await Schedule.countDocuments({ docId })
        res.status(200).json({ success: true, count })
    }),
    getAppointmentsData: asyncHandler(async (req, res) => {
        const docId = req.doctor._id
        const data = await Appointment.aggregate([
            {
                $match: { docId: new mongoose.Types.ObjectId(docId) }
            },
            {
                $group: {
                    _id: { $dateToString: { format: '%d-%m-%Y', date: '$createdAt' } },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { _id: -1 } // Sort by createdAt date in ascending order
            }
        ])
        res.status(200).json({ success: true, data })
    }),
}

export default doctorController