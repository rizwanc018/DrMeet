import bcrypt from 'bcrypt'
import asyncHandler from 'express-async-handler'
import Admin from '../models/adminModel.js'
import { generateAdminJwtToken } from '../utils/generateJWT.js'

const adminController = {
    registerAdmin: asyncHandler(async (req, res) => {
        const { email, password } = req.body

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        const adminData = await Admin.create({ email, password: hash })

        if (adminData) {
            generateAdminJwtToken(res, adminData._id)
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
            generateAdminJwtToken(res, admin._id)
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

}

export default adminController