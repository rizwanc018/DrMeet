import jwt from "jsonwebtoken"
import asyncHandler from "express-async-handler"
// import User from "../models/User.js"
import Admin from "../models/adminModel.js"
import Doctor from "../models/doctorModel.js"

const verifyUser = asyncHandler(async (req, res, next) => {
    // const token = req.cookies.jwt
    // if (token) {
    //     try {
    //         const decoded = jwt.verify(token, process.env.JWT_SECRET)
    //         req.user = await User.findById(decoded.userId).select('-password')
    //         next()
    //     } catch (error) {
    //         console.error(error);
    //         res.status(401);
    //         throw new Error('Not authorized, Invalid token');
    //     }
    // } else {
    //     res.status(401)
    //     throw new Error('Not authorized, no token')
    // }
})

const verifyDoctor = asyncHandler(async (req, res, next) => {
    const token = req.cookies.jwt
    if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.doctor = await Doctor.findById(decoded.id).select('-password')
        if (req.doctor.isDoctor) next()
        else {
            res.status(401);
            throw new Error('Not authorized, Invalid token');
        }
    } else {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

const verifyAdmin = asyncHandler(async (req, res, next) => {
    const token = req.cookies.jwt
    if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.admin = await Admin.findById(decoded.id).select('-password')
        if (req.admin.isAdmin) next()
        else {
            res.status(401);
            throw new Error('Not authorized, Invalid token');
        }
    } else {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

export { verifyUser, verifyAdmin, verifyDoctor }