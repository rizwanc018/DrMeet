import mongoose from "mongoose"

const departmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    status: {
        type: Boolean,
        default: true
    },
    image: String,
})

const departmentModel = mongoose.model('Department', departmentSchema)
export default departmentModel