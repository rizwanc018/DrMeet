// import jwt from "jsonwebtoken";
// import User from "../models/userModel.js";
// import Admin from "../models/adminModel.js";
// import Doctor from "../models/doctorModel.js";

// const verifyToken = async (req, res, next) => {
//     const token = req.cookies.jwt;
//     if (!token) {
//         return res.status(401).json({ msg: 'Not Authorized, No Token' });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         if (decoded.exp && Date.now() >= decoded.exp * 1000) {
//             return res.status(401).json({ msg: 'Not Authorized, Token expired' });
//         }

//         req.user = await User.findById(decoded.id).select('-password');
//         req.doctor = await Doctor.findById(decoded.id).select('-password');
//         req.admin = await Admin.findById(decoded.id).select('-password');

//         if (!req.user && !req.doctor && !req.admin) {
//             return res.status(401).json({ msg: 'Not Authorized, Invalid Token' });
//         }

//         next();
//     } catch (error) {
//         console.error(error);
//         return res.status(401).json({ error: error.message });
//     }
// };

// const verifyUser = async (req, res, next) => {
//     if (!req.user) {
//         return res.status(401).json({ msg: 'Not Authorized, Invalid Token' });
//     }
//     next();
// };

// const verifyDoctor = async (req, res, next) => {
//     if (!req.doctor || !req.doctor.isDoctor) {
//         return res.status(401).json({ msg: 'Not Authorized, Invalid Token' });
//     }
//     if (req.doctor.blocked) {
//         return res.status(401).json({ msg: 'Not Authorized, You have been blocked by Admin' });
//     }
//     if (!req.doctor.approved) {
//         return res.status(401).json({ msg: 'Not Authorized, Approval pending' });
//     }
//     next();
// };

// const verifyAdmin = async (req, res, next) => {
//     if (!req.admin || !req.admin.isAdmin) {
//         return res.status(401).json({ msg: 'Not Authorized, Invalid Token' });
//     }
//     next();
// };

// export { verifyToken, verifyUser, verifyAdmin, verifyDoctor };

import jwt from "jsonwebtoken"
import User from "../models/userModel.js"
import Admin from "../models/adminModel.js"
import Doctor from "../models/doctorModel.js"

const verifyUser = async (req, res, next) => {
    const token = req.cookies.jwt;
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
        req.user = await User.findById(decoded.id).select('-password');
        
        if (!req.user) {
            res.status(401).json({ msg: 'Not Authorized, Invalid Token ' })
            return
        }
        if (req.user.blocked) {
            return res.status(401).json({ msg: 'Not Authorized, You have been blocked by Admin' });
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
        res.status(401).json({ msg: 'Not Authorized, no token' })
        return
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.exp && Date.now() >= decoded.exp * 1000) {
            res.status(401).json({ msg: 'Not Authorized, Token expired' })
            return
        }
        req.doctor = await Doctor.findById(decoded.id).select('-password');
        if (req.doctor.blocked) {
            return res.status(401).json({ msg: 'Not Authorized, You have been blocked by Admin' });
        }
        if (!req.doctor.isDoctor) {
            res.status(401).json({ msg: 'Not Authorized, Invalid Token' })
            return
        }
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Not Authorized, Invalid Token' })
    }
}
const verifyAdmin = async (req, res, next) => {
    const token = req.cookies.jwt;
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
        req.admin = await Admin.findById(decoded.id).select('-password');
        if (!req.admin.isAdmin) {
            res.status(401).json({ msg: 'Not Authorized,Invalid Token ' })
            return
        }
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Not Authorized,Invalid Token ' })
    }
}
export { verifyUser, verifyAdmin, verifyDoctor }