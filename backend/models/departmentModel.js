import mongoose from "mongoose"

const departmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    desciption: {
        type: String,
    },
    status: {
        type: Boolean,
        default: true
    }
})

const departmentModel = mongoose.model('Department', departmentSchema)
export default departmentModel