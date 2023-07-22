import asyncHandler from 'express-async-handler'
import Appointment from '../models/appointmentModel.js'
import Doctor from '../models/doctorModel.js'

const appointmentController = {
    makeAppointment: asyncHandler(async (req, res) => {
        const patientId = req.user._id
        const { docId, timeId, date } = req.body
        const response = await Appointment.create({ docId, timeId, date, patientId })
        res.status(200).json({ success: true })
    }),
    checkAvailability: asyncHandler(async (req, res) => {
        const { docId, timeId, date } = req.body

        //  Finding  slots
        const { schedule } = await Doctor.findOne({ _id: docId }, { schedule: 1 })
        const { slots } = schedule.find((item) => {
            return item._id == timeId
        })
        // Find total appointments
        const appointmentsCount = await Appointment.find({
            date: { $eq: date },
            docId: { $eq: docId },
            timeId: { $eq: timeId }
        }).count()
        console.log({ slots, appointmentsCount });
        const availabile = appointmentsCount < slots
        res.status(200).json({ success: availabile, msg: !availabile ? 'No slots available' : '' })
    })

}

export default appointmentController