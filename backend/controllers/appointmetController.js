import asyncHandler from 'express-async-handler'
import Appointment from '../models/appointmentModel.js'
import Doctor from '../models/doctorModel.js'
import moment from 'moment'

const appointmentController = {
    getAppointmentsByDate: asyncHandler(async (req, res) => {
        const docId = req.doctor._id
        const { date } = req.body
        const appointments = await Appointment.find({ docId, date, finished: false })
            .populate('patientId', 'fname lname mobile')
            .populate('timeId', 'startTime endTime')
            .sort({ startTime: 1 })
        res.status(200).json({ succes: true, appointments })
    }),
    getAppontmentDetails: asyncHandler(async (req, res) => {
        const { docId, timeId, date } = req.body

        const { fname, lname, department, schedule, fees } = await Doctor.findOne({ _id: docId },
            { fname: 1, lname: 1, department: 1, schedule: 1, fees: 1 })
            .populate('department', 'name -_id')

        const { startTime, endTime } = schedule.find((item) => {
            return item._id == timeId
        })
        const details = {
            fname,
            lname,
            department: department.name,
            fees,
            startTime: moment(startTime).format('h:mm A'),
            endTime: moment(endTime).format('h:mm A'),
            date: moment(date).format('DD-MMM-YYYY')
        }
        res.status(200).json({ success: true, details })
    }),
    getAllAppointmentDatesOfDoctor: asyncHandler(async (req, res) => {
        const docId = req.doctor._id
        const dates = await Appointment.find({ docId }, { date: 1 })
        res.status(200).json({ dates })
    }),
    getUpComingAppointmentsOfPatient: asyncHandler(async (req, res) => {
        const patientId = req.user._id
        const date = moment().startOf('day')
        const appointments = await Appointment.find({
            $and: [{ patientId }, { date: { $gte: date } }]
        })
            .populate('docId', 'fname lname').populate('timeId')
            .sort({ date: 1 })
        res.status(200).json({ appointments })
    }),
    getAllAppointments: asyncHandler(async (req, res) => {
        const patientId = req.user._id
        const appointments = await Appointment.find({ patientId })
            .populate('docId', 'fname lname').populate('timeId')
            .sort({ date: 1 })
        res.status(200).json({ appointments })
    }),
}

export default appointmentController