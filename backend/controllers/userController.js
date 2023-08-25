import asyncHandler from 'express-async-handler'
import bcrypt from 'bcrypt'
import User from '../models/userModel.js'
import { generateJWT } from '../utils/generateJWT.js'
import jwt from 'jsonwebtoken'


const userController = {
    registerUser: asyncHandler(async (req, res) => {

        const { fname, lname, email, password, mobile } = req.body

        const isExist = await User.exists({ email })
        if (isExist) {
            res.status(409)
            throw new Error(`Email already exist`)
        }

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        const user = await User.create({ fname, lname, email, password: hash, mobile })

        if (user) {
            // generateJWT(res, user._id, 'user', user.blocked, 24 * 60)
            const token = jwt.sign({ id: user._id, role: 'user', blocked: user.blocked }, process.env.JWT_SECRET, {
                expiresIn: 24 * 60 + 'm'
            })
            
            res.status(201).json({
                fname: user.fname,
                lname: user.lname,
                isUser: user.isUser,
                id: user._id,
                token
            })
        } else {
            res.status(400)
            throw new Error('Invalid email or password')
        }
    }),
    authUser: asyncHandler(async (req, res) => {
        const { email, password } = req.body
        const user = await User.findOne({ email })

        if (user && user.blocked) {
            return res.status(400).json({ msg: 'You have been blocked by Admin' })
        }
        else if (await user.matchPassword(password)) {
            // generateJWT(res, user._id, 'user', user.blocked, 24 * 60)
            // res.status(201).json({
            //     fname: user.fname,
            //     lname: user.lname,
            //     isUser: user.isUser,
            //     id: user._id
            // })
            const token = jwt.sign({ id: user._id, role: 'user', blocked: user.blocked }, process.env.JWT_SECRET, {
                expiresIn: 24 * 60 + 'm'
            })
            
            res.status(201).json({
                fname: user.fname,
                lname: user.lname,
                isUser: user.isUser,
                id: user._id,
                token
            })
        } else {
            res.status(400)
            throw new Error('Invalid email or password')
        }
    }),
    logout: asyncHandler(async (req, res) => {
        res.cookie('jwt', '', {
            httpOnly: true,
            expires: new Date(0)
        })
        res.status(200).json({ msg: 'Logged out successfuly', success: true })
    }),
}

export default userController