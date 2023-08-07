import rateLimit from "express-rate-limit"

const blockedIPs = new Set();

const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 10,
    legacyHeaders: false, 
})

export  { limiter }