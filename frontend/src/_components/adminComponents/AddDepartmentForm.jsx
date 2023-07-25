import { useFormik } from "formik"
import * as Yup from 'yup'
import axios from "axios";
import Spinner from "../Spinner";
import { useEffect, useState } from "react";

function AddDepartmentForm() {

    const [submitting, setSubmitting] = useState(false)
    const [success, setSuccess] = useState()
    const [err, setErr] = useState()


    

    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Required"),
        }),
        onSubmit: async (values) => {
            setSubmitting(true)
            try {
                setErr('')
                setSuccess('')
                const response = await axios.post(`/api/admin/department/add`, { ...values })
                setSuccess(response.data.msg)
            } catch (error) {
                setErr(error.response.data.err)
            }
            setSubmitting(false)
        }
    })
    return (
        <div className="w-[32rem] rounded-xl p-8 mx-14 my-8 shadow-xl border border-primary">
            <form onSubmit={formik.handleSubmit}>
                <div className="grid grid-cols-1 gap-5 mb-5">
                    <div>
                        <label htmlFor="fname">Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Department Name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-full"
                        />
                        {formik.touched.name && formik.errors.name && <p className="error">{formik.errors.name}</p>}
                    </div>
                    <div>
                    <label htmlFor="description">Description</label>
                        <textarea
                            name="description"
                            id="description"
                            placeholder="Description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            rows="4"
                            cols="30"
                        />
                    </div>
                </div>
                {!submitting ?
                    <button className='border-2 rounded px-5 py-2  border-primary text-primary hover:bg-primary hover:text-white active:bg-primary active:text-white' type="submit" >
                        Save
                    </button>
                    : <Spinner className='ps-72' />
                }
                {success && <p className="mx-auto w-full text-center success mt-4 text-xl">{success}</p>}
                {err && <p className="mx-auto w-full text-center error mt-4 text-xl">{err}</p> }
            </form>
        </div>
    )
}

export default AddDepartmentForm