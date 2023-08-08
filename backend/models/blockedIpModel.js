import mongoose from "mongoose"

const blockedIpsSchema = new mongoose.Schema({
    ip: String,
}, { timestamps: true })

const BlockedIp = mongoose.model('BlockedIp', blockedIpsSchema)
export default BlockedIp