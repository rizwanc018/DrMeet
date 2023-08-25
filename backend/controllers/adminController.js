import bcrypt from 'bcrypt'
import asyncHandler from 'express-async-handler'
import Admin from '../models/adminModel.js'
import { generateJWT } from '../utils/generateJWT.js'
import Doctor from '../models/doctorModel.js'
import User from '../models/userModel.js'
import FailedLogin from '../models/failedLogins.js'
import BlockedIp from '../models/blockedIpModel.js'
import Appointment from '../models/appointmentModel.js'
import jwt from 'jsonwebtoken'

const adminController = {
    registerAdmin: asyncHandler(async (req, res) => {
        const { email, password } = req.body

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        const adminData = await Admin.create({ email, password: hash })

        if (adminData) {
            // generateJWT(res, adminData._id, 'admin', false, 24 * 60)
            const token = jwt.sign({ id: adminData._id, role: 'admin', blocked: adminData.blocked }, process.env.JWT_SECRET, {
                expiresIn: 24 * 60 + 'm'
            })
            res.status(201).json({
                _id: adminData._id,
                name: adminData.name,
                isAdmin: adminData.isAdmin,
                token
            })
        } else {
            res.status(400)
            throw new Error('Invalid admin data')
        }
    }),
    authAdmin: asyncHandler(async (req, res) => {
        const maxLoginAttempts = 5
        const { email, password } = req.body
        const ip = req.ip

        const admin = await Admin.findOne({ email })

        if (admin && (await admin.matchPassword(password))) {
            // generateJWT(res, admin._id, 'admin', false, 24 * 60)
            const token = jwt.sign({ id: admin._id, role: 'admin', blocked: admin.blocked }, process.env.JWT_SECRET, {
                expiresIn: 24 * 60 + 'm'
            })
            res.status(201).json({
                _id: admin._id,
                name: admin.name,
                isAdmin: admin.isAdmin,
                token
            })
        } else {
            const failedLogins = await FailedLogin.findOneAndUpdate({ ip },
                { $inc: { attempts: 1 } },
                { upsert: true, new: true })

            if (failedLogins.attempts >= maxLoginAttempts) {
                await BlockedIp.findOneAndUpdate({ ip },
                    { $inc: { attempts: 1 } },
                    { upsert: true, new: true })
            }

            res.status(400)
            throw new Error('Invalid email or password')
        }
    }),
    logout: asyncHandler(async (req, res) => {
        res.cookie('jwt', '', {
            httpOnly: true,
            expires: new Date(0)
        })
        res.status(200).json({ msg: 'Admin logged out successfuly', success: true })
    }),
    getApprovedDoctors: asyncHandler(async (req, res) => {
        const appovedDoctors = await Doctor.find({ approved: true }).populate('department', 'name -_id')
        res.status(200).json({ appovedDoctors })
    }),
    getUnapprovedDoctors: asyncHandler(async (req, res) => {
        const unapprovedDoctors = await Doctor.find({ approved: false, blocked: false }).populate('department', 'name -_id')
        res.status(200).json({ unapprovedDoctors })

    }),
    approveDoctor: asyncHandler(async (req, res) => {
        const id = req.params.id
        try {
            const response = await Doctor.findByIdAndUpdate(id, { approved: true }, { new: true })
            res.status(200).json({ msg: "Approved succesfully" })
        } catch (error) {
            throw new Error("Couldn't approve. Something wrong")
        }
    }),
    blockDoctor: asyncHandler(async (req, res) => {
        const id = req.params.id
        const doctor = await Doctor.findById(id)
        doctor.blocked = !doctor.blocked
        await doctor.save();
        res.status(200).json({ msg: "Block status changed succesfully" })
    }),
    getAllPatients: asyncHandler(async (req, res) => {
        const patients = await User.find({})
        res.status(200).json({ patients })
    }),
    blockPatient: asyncHandler(async (req, res) => {
        const id = req.params.id
        const patient = await User.findById(id);
        patient.blocked = !patient.blocked;
        await patient.save();
        res.status(200).json({ msg: "Block status changed succesfully" })
    }),
    getAllDoctorsCount: asyncHandler(async (req, res) => {
        const count = await Doctor.countDocuments({ approved: true })
        res.status(200).json({ success: true, count })
    }),
    getAllPatientCount: asyncHandler(async (req, res) => {
        const count = await User.countDocuments({})
        res.status(200).json({ success: true, count })
    }),
    getAllAppointmentsCount: asyncHandler(async (req, res) => {
        const count = await Appointment.countDocuments({})
        res.status(200).json({ success: true, count })
    }),
    getTotalEarinings: asyncHandler(async (req, res) => {
        let earning = 0
        const feeArray = await Appointment.find({}, { docId: 1, _id: 0 }).populate('docId', 'fees -_id')
        for (const item of feeArray) {
            const fee = parseInt(item.docId.fees);
            earning += fee;
        }
        res.status(200).json({ success: true, earning })
    }),
    getAppointmentsData: asyncHandler(async (req, res) => {
        const data = await Appointment.aggregate([
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
    getAppointmentsPerWeekDay: asyncHandler(async (req, res) => {
        const data = await Appointment.aggregate([
            {
                $group: {
                    _id: { $dayOfWeek: '$date' },
                    count: { $sum: 1 },
                },
            },
            {
                $project: {
                    dayOfWeek: {
                        $switch: {
                            branches: [
                                { case: { $eq: ['$_id', 1] }, then: 'Sunday' },
                                { case: { $eq: ['$_id', 2] }, then: 'Monday' },
                                { case: { $eq: ['$_id', 3] }, then: 'Tuesday' },
                                { case: { $eq: ['$_id', 4] }, then: 'Wednesday' },
                                { case: { $eq: ['$_id', 5] }, then: 'Thursday' },
                                { case: { $eq: ['$_id', 6] }, then: 'Friday' },
                                { case: { $eq: ['$_id', 7] }, then: 'Saturday' },
                            ],
                            default: 'Unknown',
                        },
                    },
                    count: 1,
                    _id: 0,
                },
            },
        ]).sort({ dayOfWeek: 1 })
        res.status(200).json({ success: true, data })
    }),


}

export default adminController