import asyncHandler from 'express-async-handler'
import Department from '../models/departmentModel.js'

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const departmentController = {
    addDepartment: asyncHandler(async (req, res) => {
        let { name, description } = req.body
        name = capitalize(name)
        const isExist = await Department.exists({ name: { $regex: new RegExp(name, "i") } })
        
        if (isExist) {
            res.status(409)
            throw new Error(`${name} department already exist`)
        }
        const deptData = await Department.create({ name, description })
        console.log("🚀 ~ file: departmentController.js:19 ~ addDepartment:asyncHandler ~ deptData:", deptData)
        
        if (deptData) res.status(200).json({ msg: `${deptData.name} created successfully` })
    })
}

export default departmentController