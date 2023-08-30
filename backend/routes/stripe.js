import express from "express"
import asyncHandler from 'express-async-handler'
import Stripe from 'stripe';
import { config } from "dotenv";
import Doctor from "../models/doctorModel.js";
import moment from "moment";
import { verifyUser } from "../middlewares/authMiddleware.js";
import Appointment from "../models/appointmentModel.js";
import Schedule from '../models/scheduleModel.js'


config()
const router = express.Router()
const stripe = Stripe(process.env.STRIPE_API_KEY)

router.post('/webhook', express.json({ type: 'application/json' }), async (req, res) => {
    let event = req.body
    let payload = req.body
    if (event.type === 'checkout.session.completed') {
        const payment_intent = payload.data.object.payment_intent
        stripe.customers
            .retrieve(payload.data.object.customer)
            .then(async (customer) => {
                try {
                    const { docId, timeId, date, userId } = customer.metadata
                    const patientId = userId.slice(1, -1)
                    const response = await Appointment.create({ docId, timeId, date, patientId, payment_intent })
                    if (response) res.status(200).json({ success: true })
                } catch (error) {
                    console.log(error);
                    res.status(400).json({ err: error.message })
                    return
                }
            }).catch(err => console.log(err))
    }
})

router.post('/create-checkout-session', express.json(), verifyUser, asyncHandler(async (req, res) => {
    const { docId, timeId } = req.body
    let { date } = req.body
    date = moment(date).startOf('day').toISOString()
    const userId = JSON.stringify(req.user._id)
    const customer = await stripe.customers.create({
        metadata: {
            userId,
            docId,
            timeId,
            date
        },
    });

    const { fname, lname, department, fees } = await Doctor.findOne({ _id: docId },
        { fname: 1, lname: 1, department: 1, fees: 1 })
        .populate('department', 'name -_id')

    const { startTime, endTime } = await Schedule.findById(timeId)

    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: `Dr. ${fname} ${lname}`,
                        description: `On ${moment(date).format('DD-MMM-YYYY')} at ${moment(startTime).format('h:mm A')} - ${moment(endTime).format('h:mm A')}`,
                        metadata: {
                            patientId: '>>>>1234567890<<<<<<<',
                        }
                    },
                    unit_amount: `${Number(fees) * 100}`,
                },
                quantity: 1,
            },
        ],
        customer: customer.id,
        mode: 'payment',
        success_url: `${process.env.STRIPE_RESPONSE_URL}/appointment-success`,
        cancel_url: `${process.env.STRIPE_RESPONSE_URL}/doctors`,
    });


    res.send({ url: session.url });
}))

router.post('/refund', express.json(), verifyUser, asyncHandler(async (req, res) => {
    const { appointmentId, payment_intent } = req.body

    const refund = await stripe.refunds.create({
        payment_intent: payment_intent,
    })
    if (refund.status === 'succeeded') {
        const response = await Appointment.findByIdAndDelete(appointmentId)
        res.status(200).json({ success: true, msg: 'Appointment cancelled successfully' })
    } else {
        res.status(200).json({ success: false, msg: 'Error cancelling appointment' })
    }

}))

export default router