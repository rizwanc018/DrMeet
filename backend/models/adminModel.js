import mongoose from "mongoose"
import bcrypt from 'bcrypt'

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: true
    },
    name: {
        type: String,
        default: 'Admin'
    }
})

adminSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

const adminModel = mongoose.model('Admin', adminSchema)
export default adminModel