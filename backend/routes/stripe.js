import express from "express"
import asyncHandler from 'express-async-handler'
import Stripe from 'stripe';
import { config } from "dotenv";
import Doctor from "../models/doctorModel.js";
import moment from "moment";
import bodyParser from "body-parser";
import { verifyUser } from "../middlewares/authMiddleware.js";
import Appointment from "../models/appointmentModel.js";
import Schedule from '../models/scheduleModel.js'


config()
const router = express.Router()

const stripe = Stripe(process.env.STRIPE_API_KEY)

//    stripe listen --forward-to localhost:5000/api/stripe/webhook
router.post('/webhook', bodyParser.raw({ type: 'application/json' }), async (req, res) => {
    let signinsecret = 'whsec_ef2dfc5887f870636fe513da6ef308b0c2f9b58764289374fa74f1cb4ea58f80'
    const sig = req.headers['stripe-signature'];
    let event;
    let data;

    try {
        event = await stripe.webhooks.constructEvent(req.body, sig, signinsecret);
        data = event.data.object
    } catch (err) {
        console.log(err)
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    if (event.type === 'checkout.session.completed') {
        stripe.customers
            .retrieve(data.customer)
            .then(async (customer) => {
                try {
                    const { docId, timeId, date, userId } = customer.metadata
                    const patientId = userId.slice(1, -1)
                    const response = await Appointment.create({ docId, timeId, date, patientId })
                    if (response) res.status(200).json({ success: true })
                } catch (error) {
                    console.log(error);
                    res.status(400).json({ err: error.message })
                    return
                }
            }).catch(err => console.log(err))
    }
    // res.json({ success: true })

})

router.post('/create-checkout-session', express.json(), verifyUser, asyncHandler(async (req, res) => {
    const { docId, timeId } = req.body
    let { date } = req.body
    date = moment(date).startOf('day').toISOString()
    const userId = JSON.stringify(req.user._id)
    console.log({docId, timeId, date, userId})
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
        success_url: `${process.env.CLIENT_URL}/appointment-success`,
        cancel_url: `${process.env.CLIENT_URL}/doctors`,
    });


    res.send({ url: session.url });
}))

export default router