import mongoose from "mongoose"
import bcrypt from 'bcrypt'

const doctorSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
    },
    isDoctor: {
        type: Boolean,
        default: true
    },
    approved: {
        type: Boolean,
        default: false
    },
    blocked: {
        type: Boolean,
        default: false
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department"
    },
    degree: {
        type: String,
        required: true
    },
    proof: {
        type: Array,
        required: true
    },
    image: String,
    notification: {
        type: Array
    },
    experience: Number,
    bio: String,
    fees: {
        type: String,
        required: true
    }
});

doctorSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

const Doctor = mongoose.model('Doctor', doctorSchema)
export default Doctor
