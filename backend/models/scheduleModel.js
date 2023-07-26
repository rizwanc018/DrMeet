import mongoose from "mongoose"
const scheduleSchema = new mongoose.Schema({
    day: {
        type: String,
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    docId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor"
    }
})

const Schedule = mongoose.model('Schedule', scheduleSchema)
export default Schedule