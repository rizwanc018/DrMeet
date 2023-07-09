import asyncHandler from 'express-async-handler'
import Department from '../models/departmentModel.js'

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const departmentController = {
    addDepartment: asyncHandler(async (req, res) => {
        const { name, description } = req.body
        // const result = await productModel.find({ productName: { $regex: new RegExp(searchWord, "i") } })
        const isExist = await Department.exists({ name: { $regex: new RegExp(name, "i") } })
        if (isExist) {
            res.status(409)
            throw new Error(`${name} department already exist`)
        }
        const deptData = await Department.create({ name: capitalize(name), description })
        if (deptData) {
            res.status(200).json({ msg: `${deptData.name} created successfully` })
        }
    })
}

export default departmentController