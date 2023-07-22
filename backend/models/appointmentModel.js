import mongoose from "mongoose"

const appointmentSchema = new mongoose.Schema({
    date : {
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
    timeId: mongoose.Schema.Types.ObjectId
})

const Appointment = mongoose.model('Appointment', appointmentSchema)
export default Appointment