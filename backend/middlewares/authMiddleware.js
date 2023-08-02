import jwt from "jsonwebtoken"
import User from "../models/userModel.js"
import Admin from "../models/adminModel.js"
import Doctor from "../models/doctorModel.js"


const verifyUser = async (req, res, next) => {
    const token = req.cookies.jwt;
    try {
        if (!token) {
            throw new Error('Not authorized, no token');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.exp && Date.now() >= decoded.exp * 1000) {
            res.status(401);
            throw new Error('Token has expired');
        }

        req.user = await User.findById(decoded.id).select('-password');
        if (!req.user) {
            throw new Error('Not authorized, Invalid token');
        }
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: error.message });
    }
};


const verifyDoctor = async (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.exp && Date.now() >= decoded.exp * 1000) {
            res.status(401);
            throw new Error('Token has expired');
        }

        req.doctor = await Doctor.findById(decoded.id).select('-password');
        if (!req.doctor.isDoctor) {
            res.status(401);
            throw new Error('Not authorized, Invalid token');
        }
        next();
    } catch (err) {
        res.status(401);
        throw new Error('Not authorized, Invalid token');
    }
}

const verifyAdmin = async (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.exp && Date.now() >= decoded.exp * 1000) {
            res.status(401);
            throw new Error('Token has expired');
        }

        req.admin = await Admin.findById(decoded.id).select('-password');
        if (!req.admin.isAdmin) {
            res.status(401);
            throw new Error('Not authorized, Invalid token');
        }
        next();
    } catch (err) {
        res.status(401);
        throw new Error('Not authorized, Invalid token');
    }
}

export { verifyUser, verifyAdmin, verifyDoctor }