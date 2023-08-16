import asyncHandler from 'express-async-handler'
import moment from 'moment'
import Schedule from '../models/scheduleModel.js'
import Appointment from '../models/appointmentModel.js'

function filterTimeWithoutAppointments(a1, a2) {
    return a1.filter(objA1 => !a2.some(objA2 => objA2.timeId.toString() == objA1._id.toString()));
}

const scheduleController = {
    createScedule: asyncHandler(async (req, res) => {

        const day = req.body.day
        const startTime = req.body.time[0]
        const endTime = req.body.time[1]
        const docId = req.doctor._id

        const data = await Schedule.find({ docId })
        const existingSchedule = data.find(s => (
            s.day == day && moment(s?.startTime).format('hh:mm A') <= moment(startTime).format('hh:mm A') && moment(s?.endTime).format('hh:mm A') > moment(startTime).format('hh:mm A') ||
            s.day == day && moment(endTime).format('hh:mm A') > moment(s?.startTime).format('hh:mm A') && moment(endTime).format('hh:mm A') < moment(s?.endTime).format('hh:mm A')
        ))

        if (existingSchedule) {
            res.status(200).json({ succes: false, msg: "Schedule already exist", schedules: data })
        } else {
            const response = await Schedule.create({ day, docId, startTime, endTime })
            const data = await Schedule.find({ docId, day })
            res.status(200).json({ success: true, msg: 'Schedule created succesdfully', schedules: data })
        }
    }),
    getSchedules: asyncHandler(async (req, res) => {
        const docId = req.doctor._id
        const day = req.params.day        
        const response = await Schedule.find({ docId, day }).sort({ day: 1, startTime: 1 })

        res.status(200).json({ success: true, schedules: response })
    }),
    deleteSchedule: asyncHandler(async (req, res) => {
        const docId = req.doctor._id
        const scheduleId = req.params.id
        const response = await Schedule.deleteOne({ _id: scheduleId })
        const data = await Schedule.find({ docId }).sort({ day: 1, startTime: 1 })
        res.status(200).json({ success: true, msg: 'Schedule removed succesfully', schedules: data })
    }),
    getScheduledDays: asyncHandler(async (req, res) => {
        const docId = req.params.id
        const response = await Schedule.find({ docId }).distinct('day')
        res.status(200).json({ days: response })
    }),
    getScheduleTimes: asyncHandler(async (req, res) => {
        const { docId } = req.body
        let { date } = req.body
        date = moment(date).startOf('day')
        const day = date.day().toString()

        const [schedules, booked] = await Promise.all([
            Schedule.find({ docId, day }),
            Appointment.find({ docId, date: date.toISOString() }),
        ]);

        const filtered = filterTimeWithoutAppointments(schedules, booked)

        const timesArray = filtered.map(item => ({
            _id: item._id,
            startTime: item.startTime,
            endTime: item.endTime,
            // startTime: moment(item.startTime).format('h:mm A'),
            // endTime: moment(item.endTime).format('h:mm A'),
          }));

        res.status(200).json({ success: true, timesArray })
    }),
}

export default scheduleController