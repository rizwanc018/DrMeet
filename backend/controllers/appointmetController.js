import asyncHandler from 'express-async-handler'
import Appointment from '../models/appointmentModel.js'
import Doctor from '../models/doctorModel.js'
import moment from 'moment'

const appointmentController = {
    // makeAppointment: asyncHandler(async (req, res) => {
    //     const patientId = req.user._id
    //     const { docId, timeId, date } = req.body
    //     const response = await Appointment.create({ docId, timeId, date, patientId })
    //     res.status(200).json({ success: true })
    //     // res.status(400).json({ err: 'not working' })
    // }),
    // checkAvailability: asyncHandler(async (req, res) => {
    //     const { docId, timeId, date } = req.body

    //     //  Finding  slots
    //     const { schedule } = await Doctor.findOne({ _id: docId }, { schedule: 1 })
    //     const { slots } = schedule.find((item) => {
    //         return item._id == timeId
    //     })
    //     // Find total appointments
    //     const appointmentsCount = await Appointment.find({
    //         date: { $eq: date },
    //         docId: { $eq: docId },
    //         timeId: { $eq: timeId }
    //     }).count()
    //     // const availabile = appointmentsCount < slots
    //     const availabile = true
    //     res.status(200).json({ success: availabile, msg: !availabile ? 'No slots available' : '' })
    // }),
    getAppointmentsByDate: asyncHandler(async (req, res) => {
        const docId  = req.doctor._id
        let { date } = req.body
        // date = moment(date).startOf('day').toISOString()
        let sDate = moment(date).startOf('day').toDate()
        let eDate = moment(date).endOf('day').toDate()

        console.log("🚀", sDate)
        // const response = await Appointment.find({ date })
        const response = await Appointment.aggregate([
            {
                $match: {
                    docId: docId,
                    date: {
                        $gte: sDate,
                        $lte: eDate
                    }
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "patientId",
                    foreignField: "_id",
                    as: "patient"
                }
            },
            {
                $unwind: "$patient"
            },
            {
                $lookup: {
                    from: "doctors",
                    localField: "docId",
                    foreignField: "_id",
                    as: "doctor"
                }
            },
            {
                $unwind: "$doctor"
            },
            {
                $lookup: {
                    from: "doctor",
                    localField: "timeId",
                    foreignField: "schedule._id",
                    as: "timeSlot"
                }
            },
            // {
            //     $unwind: "$timeSlot"
            // },
            {
                $project: {
                    _id: 1,
                    date: 1,
                    patient: "$patient",
                    doctor: "$doctor",
                    finished: 1,
                    // timeSlot: "$timeSlot.schedule"
                }
            }
        ])
        console.log("🚀 ~ file: appointmetController.js:38 ~ getAppointmentsByDate:asyncHandler ~ response:", response)
        res.status(200).json({ succes: true, response })
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
    })

}

export default appointmentController