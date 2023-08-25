import jwt from "jsonwebtoken"
import User from "../models/userModel.js"
import Admin from "../models/adminModel.js"
import Doctor from "../models/doctorModel.js"

const verifyUser = async (req, res, next) => {
    const token = req.headers.jwt;
    try {
        if (!token) {
            res.status(401).json({ msg: 'Not Authorized, no token' })
            return
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.exp && Date.now() >= decoded.exp * 1000) {
            res.status(401).json({ msg: 'Not Authorized, Token expired' })
            return
        }
        if (decoded.role != 'user') {
            return res.status(401).json({ msg: 'Not Authorized, Invalid Token ' })
        }
        if (decoded.blocked) {
            return res.status(401).json({ msg: 'Not Authorized, You have been blocked by Admin' });
        }
        req.user = {}
        req.user._id = decoded.id
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: error.message });
    }
};
const verifyDoctor = async (req, res, next) => {
    const token = req.headers.jwt;
    if (!token) {
        res.status(401).json({ msg: 'Not Authorized, no token' })
        return
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.exp && Date.now() >= decoded.exp * 1000) {
            res.status(401).json({ msg: 'Not Authorized, Token expired' })
            return
        }
        if (decoded.blocked) {
            return res.status(401).json({ msg: 'Not Authorized, You have been blocked by Admin' });
        }
        if (decoded.role != 'doctor') {
            res.status(401).json({ msg: 'Not Authorized, Invalid Token' })
            return
        }
        req.doctor = {}
        req.doctor._id = decoded.id
        
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Not Authorized, Invalid Token' })
    }
}
const verifyAdmin = async (req, res, next) => {
    const token = req.headers.jwt;
    if (!token) {
        res.status(401).json({ msg: 'Not Authorized, No Token' })
        return
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.exp && Date.now() >= decoded.exp * 1000) {
            res.status(401).json({ msg: 'Not Authorized, Token expired' })
            return
        }
        if (decoded.role != 'admin') {
            res.status(401).json({ msg: 'Not Authorized,Invalid Token ' })
            return
        }
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Not Authorized,Invalid Token ' })
    }
}
export { verifyUser, verifyAdmin, verifyDoctor }