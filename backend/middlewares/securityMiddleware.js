import rateLimit from "express-rate-limit"
import BlockedIp from "../models/blockedIpModel.js"

const blockedIps = BlockedIp.find({})
const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 10,
    legacyHeaders: false,
})

const verifyIpNotBlocked = async (req, res, next) => {
    try {
        const ip = req.ip;
        const isIpExist = await BlockedIp.exists({ ip });
        if (isIpExist) {
            return res.status(400)
        }
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, msg: "Internal server error" });
    }
    next()
}

export { limiter, verifyIpNotBlocked }