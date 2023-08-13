import mongoose from "mongoose"

const appointmentSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    docId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
        required: true
    },
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    payment_intent: {
        type: String,
        required: true
    },
    finished: {
        type: Boolean,
        default: false
    },
    timeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Schedule",
        required: true
    }
}, { timestamps: true })

const Appointment = mongoose.model('Appointment', appointmentSchema)
export default Appointment