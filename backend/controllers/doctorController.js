import asyncHandler from 'express-async-handler'
import bcrypt from 'bcrypt'
import Doctor from '../models/doctorModel.js'
import { generateJWT } from '../utils/generateJWT.js'
import moment from 'moment'
import Appointment from '../models/appointmentModel.js'

  function filterTimeWithoutAppointments(a1, a2) {
    return a1.filter(objA1 => !a2.some(objA2 => objA2.timeId.toString() == objA1._id.toString()));
  }
  
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

        if (doctor && (await doctor.matchPassword(password))) {
            generateJWT(res, doctor._id, 24 * 60)
            res.status(201).json({
                _id: doctor._id,
                fname: doctor.fname,
                lname: doctor.lname,
                degree: doctor.degree,
                department: doctor.department.name,
                image: doctor.image,
                isDoctor: doctor.isDoctor,
                experience: doctor.experience,
                bio: doctor.bio
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
        res.status(200).json({ msg: 'Logged out successfuly', success: true })
    }),
    getProfile: asyncHandler(async (req, res) => {
        res.status(200).json({ msg: req.doctor })
    }),
    createScedule: asyncHandler(async (req, res) => {
        const newSchedule = {
            day: req.body.day,
            startTime: req.body.time[0],
            endTime: req.body.time[1],
        }
        const day = req.body.day
        const startTime = moment(req.body.time[0]).format('hh:mm A')
        const endTime = moment(req.body.time[1]).format('hh:mm A')

        const id = req.doctor._id
        const data = await Doctor.findById(id)

        const existingSchedule = data.schedule.find(s => (
            s.day == day && moment(s?.startTime).format('hh:mm A') <= startTime &&  moment(s?.endTime).format('hh:mm A') > startTime ||
            s.day == day && endTime > moment(s?.startTime).format('hh:mm A')  && endTime < moment(s?.endTime).format('hh:mm A')  
        ))

        if (existingSchedule) {
            res.status(200).json({ succes: false, msg: "Schedule already exist", schedules: data.schedule })
        } else {
            const response = await Doctor.findByIdAndUpdate(id, { $push: { schedule: newSchedule } }, { new: true })
            res.status(200).json({ success: true, msg: 'Schedule created succesdfully', schedules: response.schedule })
        }
    }),
    getSchedules: asyncHandler(async (req, res) => {
        const schedules = req.doctor.schedule.sort((a, b) => {
            return a.day - b.day
        })
        res.status(200).json({ success: true, schedules: req.doctor.schedule })
    }),
    deleSchedule: asyncHandler(async (req, res) => {
        const docId = req.doctor._id
        const _id = req.params.id
        const response = await Doctor.findByIdAndUpdate(docId, { $pull: { schedule: { _id } } }, { new: true })
        res.status(200).json({ success: true, msg: 'Schedule removed succesfully', schedules: response.schedule })
    }),
    getAllDoctors: asyncHandler(async (req, res) => {
        const doctors = await Doctor.find({ approved: true }).populate('department', 'name -_id')
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
    getScheduleTimes: asyncHandler(async (req, res) => {
        const { docId, date } = req.body
        const d = new Date(date)
        const day = d.getDay()
        const { schedule } = await Doctor.findById(docId, { schedule: 1 })
        const daysSchedule = schedule.filter(item => item.day == day.toString())  // selected day's schedule
        const booked = await Appointment.find({docId, date} ) // appointments already booked for that day
        const filtered = filterTimeWithoutAppointments(daysSchedule, booked)

        const timesArray = []
        for (const item of filtered) {
            let tmp = {}
            tmp._id = item._id
            tmp.startTime = moment(item.startTime).format('h:mm A')
            tmp.endTime = moment(item.endTime).format('h:mm A')
            timesArray.push(tmp)
        }
        res.status(200).json({ success: true, timesArray })
    })
}

export default doctorController