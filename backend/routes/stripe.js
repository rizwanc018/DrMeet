import express from "express"
import asyncHandler from 'express-async-handler'
import Stripe from 'stripe';
import { config } from "dotenv";
import Doctor from "../models/doctorModel.js";
import moment from "moment";
import { verifyUser } from "../middlewares/authMiddleware.js";

config()
const router = express.Router()

const stripe = Stripe(process.env.STRIPE_API_KEY)
router.post('/create-checkout-session', verifyUser, asyncHandler(async (req, res) => {
    console.log('>>>>>',req.user)

    const { docId, timeId, date } = req.body

    const { fname, lname, department, schedule, fees } = await Doctor.findOne({ _id: docId },
        { fname: 1, lname: 1, department: 1, schedule: 1, fees: 1 })
        .populate('department', 'name -_id')

    const { startTime, endTime } = schedule.find((item) => {
        return item._id == timeId
    })

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
        mode: 'payment',
        success_url: `${process.env.CLIENT_URL}/appointment-success`,
        cancel_url: `${process.env.CLIENT_URL}/doctors`,
    });

    res.send({ url: session.url });
}))

export default router