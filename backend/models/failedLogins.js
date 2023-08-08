import mongoose from "mongoose"

const failedLoginSchema = new mongoose.Schema({
    ip: String,
    attempts: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

const FailedLogin = mongoose.model('FailedLogin', failedLoginSchema)
export default FailedLogin