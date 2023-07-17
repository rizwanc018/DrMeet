import bcrypt from 'bcrypt'
import asyncHandler from 'express-async-handler'
import Admin from '../models/adminModel.js'
import { generateJWT } from '../utils/generateJWT.js'

const adminController = {
    registerAdmin: asyncHandler(async (req, res) => {
        const { email, password } = req.body

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        const adminData = await Admin.create({ email, password: hash })

        if (adminData) {
            generateJWT(res, adminData._id, 10)
            res.status(201).json({
                _id: adminData._id,
                name: adminData.name,
                isAdmin: adminData.isAdmin
            })
        } else {
            res.status(400)
            throw new Error('Invalid admin data')
        }

    }),
    authAdmin: asyncHandler(async (req, res) => {
        const { email, password } = req.body
        const admin = await Admin.findOne({ email })

        if (admin && (await admin.matchPassword(password))) {
            generateJWT(res, admin._id, 10)
            res.status(201).json({
                _id: admin._id,
                name: admin.name,
                isAdmin: admin.isAdmin
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
        res.status(200).json({ msg: 'Logged out successfuly' })
    }),

}

export default adminController