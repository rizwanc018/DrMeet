import express from "express"
import asyncHandler from 'express-async-handler'
import Stripe from 'stripe';
import { config } from "dotenv";
import Doctor from "../models/doctorModel.js";
import moment from "moment";
import bodyParser from "body-parser";
import { verifyUser } from "../middlewares/authMiddleware.js";

config()
const router = express.Router()

const stripe = Stripe(process.env.STRIPE_API_KEY)

router.post('/webhook', bodyParser.raw({ type: 'application/json' }), async (req, res) => {
    let signinsecret = 'whsec_ef2dfc5887f870636fe513da6ef308b0c2f9b58764289374fa74f1cb4ea58f80'
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, signinsecret);
    } catch (err) {
        console.log(err)
        res.status(400).send(`Webhook Error: ${err.message}`);
        // res.status(400).json({ success: false })
        return;
    }

    console.log('event.type',event.type)
    console.log('event.data.object',event.data.object)
    res.json({ success: true })

})

router.post('/create-checkout-session', express.json(), verifyUser, asyncHandler(async (req, res) => {
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
        // success_url: `${process.env.CLIENT_URL}/create-appointment?u=${req.user}&d=${req.body}`,
        success_url: `${process.env.CLIENT_URL}/appointment-success`,
        cancel_url: `${process.env.CLIENT_URL}/doctors`,
    });

    // console.log('req.user', req.user)
    // console.log('req.body', req.body);
    // console.log('url', session.url)

    res.send({ url: session.url });
}))



// Webhook

export default router