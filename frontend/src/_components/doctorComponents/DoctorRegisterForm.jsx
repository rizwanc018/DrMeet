import { useFormik } from "formik"
import * as Yup from 'yup'
import { GrAttachment } from "react-icons/gr";
import { storage } from "../../config/firebase";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { v4 } from "uuid"
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../Spinner";
import { Link, useNavigate } from "react-router-dom";


function DoctorRegister() {

  const [avatar, setAvatar] = useState(null)
  const [certificates, setCertificates] = useState([])
  const [departments, setDepartments] = useState([])
  const [submitting, setSubmitting] = useState(false)
  const [err, setErr] = useState()
  const [loginSuccess, setLoginSuccess] = useState()

  const navigate = useNavigate()

  const getAllDepartments = async () => {
    const response = await axios.get(`/api/admin/department`)
    setDepartments(response.data.departments)
  }

  useEffect(() => {
    getAllDepartments()
  }, [])


  const formik = useFormik({
    initialValues: {
      fname: "",
      lname: "",
      email: "",
      mobile: "",
      password: "",
      confirmPassword: "",
      department: "",
      degree: "",
      image: "",
      proof: [],
      experience: "",
      bio: "",
      fees: ""
    },
    validationSchema: Yup.object({
      fname: Yup.string().required("Required"),
      lname: Yup.string().required("Required"),
      email: Yup.string().email('Invalid email').required('Required'),
      mobile: Yup.string().required('Required'),
      password: Yup.string().required('Password is required'),
      confirmPassword: Yup.string().required('Passwords must match').oneOf([Yup.ref('password')], 'Passwords must match'),
      department: Yup.string().required("Choose department"),
      degree: Yup.string().required("Required"),
      proof: Yup.array().min(1, 'No certificates selected'),
      image: Yup.mixed().required('No image selected'),
      experience: Yup.number().required('Number is required').min(0, 'Negetive numbers not allowed'),
      bio: Yup.string().required('Bio is required'),
      fees: Yup.string().required('Fees is required')
    }),
    onSubmit: async (values) => {
      setSubmitting(false) /////////////////////////
      setErr('')
      setLoginSuccess('')
      await uploadAvatar()
      await uploadProof()
      try {
        const response = await axios.post(`/api/doc/reg`, { ...values })
        setLoginSuccess(response.data.msg)
        setTimeout(() => {
          navigate('/')
        }, 3000);
      } catch (error) {
        setErr(error.response.data.err)
        setSubmitting(false)
      }
    }
  })

  // upload avatar to firebase
  const uploadAvatar = async () => {
    if (!avatar) return
    const avatarRef = ref(storage, `doctorImages/${avatar.name + v4()}`)
    const response = await uploadBytes(avatarRef, avatar)
    const imgUrl = await getDownloadURL(avatarRef);
    formik.values.image = imgUrl
  }

  // set state for proof
  const handleProofOnChange = e => {
    const uploaded = [...certificates]
    for (const file of e.target.files) {
      uploaded.push(file)
      formik.values.proof.push(file)
    }
    setCertificates(uploaded)

  }

  // upload proof to firebase
  const uploadProof = async () => {
    const pdfUrl = []
    if (!certificates) return
    for (const cert of certificates) {
      const certRef = ref(storage, `doctorProof/${cert.name + v4()}`)
      const response = await uploadBytes(certRef, cert)
      pdfUrl.push(await getDownloadURL(certRef))
    }
    formik.values.proof = [...pdfUrl]
  }


  return (
    <div className="min-h-screen py-10">
      <div className="container mx-auto flex justify-center ">
        <div className="w-fit mx-5 md:w-8/12 rounded-xl md:mx-auto p-10 shadow-xl border-solid border border-primary">
          <img src="/assets/logo.png" className="mb-4" alt="" />
          <h2 className="text-xl text-primary-600 mb-6 font-semibold ">Doctor Register Form</h2>
          {/* fname and lname */}
          <form onSubmit={formik.handleSubmit}>
            <div className="md:grid md:grid-cols-2 md:gap-10 ">
              <div className="">
                <label htmlFor="fname">First Name</label>
                <input
                  type="text"
                  name="fname"
                  id="fname"
                  placeholder="FirstName"
                  value={formik.values.fname}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.fname && formik.errors.fname && <p className="error">{formik.errors.fname}</p>}
              </div>
              <div className="">
                <label htmlFor="laname">Last Name</label>
                <input
                  type="text"
                  name="lname"
                  id="lname"
                  placeholder="LastName"
                  value={formik.values.lname}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.lname && formik.errors.lname && <p className="error">{formik.errors.lname}</p>}
              </div>

              {/* Email and mobile */}
              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"

                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email && <p className="error">{formik.errors.email}</p>}
              </div>
              <div>
                <label htmlFor="mobile">Mobile</label>
                <input
                  type="tel"
                  name="mobile"
                  id="mobile"
                  placeholder="Mobile"
                  value={formik.values.mobile}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.mobile && formik.errors.mobile && <p className="error">{formik.errors.mobile}</p>}
              </div>
              {/* password */}
              <div>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Passowrd"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password && <p className="error">{formik.errors.password}</p>}
              </div>
              {/* confirm password */}
              <div>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Passowrd"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.confirmPassword && formik.errors.confirmPassword && <p className="error">{formik.errors.confirmPassword}</p>}
              </div>
              {/* Department selection */}
              <div>
                <label htmlFor="department">Choose Department</label>
                <select
                  name="department"
                  id="department"
                  placeholder="Choose department"
                  value={formik.values.department}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="">Choose Department..</option>
                  {
                    departments.map((dep, i) => (
                      <option key={i} value={dep._id}>{dep.name}</option>
                    ))
                  }
                </select>
                {formik.touched.department && formik.errors.department && <p className="error">{formik.errors.department}</p>}

              </div>
              {/* Degree */}
              <div>
                <label htmlFor="degree">Degree</label>
                <input
                  type="text"
                  name="degree"
                  id="degree"
                  placeholder="MBBS,MD"
                  value={formik.values.degree}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.degree && formik.errors.degree && <p className="error">{formik.errors.degree}</p>}
              </div>
              {/* Experience */}
              <div>
                <label htmlFor="experience">Experience</label>
                <input
                  type="number"
                  name="experience"
                  id="experience"
                  placeholder="Yrs"
                  value={formik.values.experience}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.experience && formik.errors.experience && <p className="error">{formik.errors.experience}</p>}
              </div>
              {/* bio */}
              <div className="col-span-2">
                <label htmlFor="bio">Bio</label>
                <textarea className="w-full border-primary rounded-lg shadow-sm focus:border-primary-600 hover:ring-primary-600"
                  type="text"
                  name="bio"
                  id="bio"
                  placeholder="Bio"
                  value={formik.values.bio}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.bio && formik.errors.bio && <p className="error">{formik.errors.bio}</p>}
              </div>
              {/* Proof */}
              <div className="relative my-5">
                <label htmlFor="proof">Certificate</label>
                <GrAttachment className="absolute text-2xl top-14" />
                <input
                  type="file"
                  name="proof"
                  id="proof"
                  multiple
                  onChange={e => handleProofOnChange(e)}
                  onBlur={formik.handleBlur}
                  className="ps-8 mt-8"
                />
                {formik.touched.proof && formik.errors.proof && <p className="error">{formik.errors.proof}</p>}
              </div>
              {/* Avatar */}
              <div className="my-5">
                <img className='border-2 rounded-2xl  border-primary' alt="Posts" width="100px" height="100px" src={`${avatar ? URL.createObjectURL(avatar) : '/assets/avatar.svg'}`}></img>
                <input
                  type="file"
                  name="image"
                  id="image"
                  onChange={(e) => {
                    setAvatar(e.target.files[0])
                    formik.setFieldValue('image', e.target.files[0])
                  }}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.image && formik.errors.image && <p className="error">{formik.errors.image}</p>}
              </div>
              {/* Feess */}
              <div>
                <label htmlFor="fees">Fees</label>
                <input
                  type="number"
                  name="fees"
                  id="fees"
                  placeholder="Fees"
                  value={formik.values.fees}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.fees && formik.errors.fees && <p className="error">{formik.errors.fees}</p>}
              </div>
            </div>
            {!submitting ?
              <button className='border-2 rounded px-5 py-2 mt-8 border-primary text-primary hover:bg-primary hover:text-white active:bg-primary active:text-white' type="submit"
              >Register</button>
              : <Spinner className='ps-72' />
            }
            {loginSuccess && <p className="mx-auto w-full text-center text-primary-600 mt-4 text-xl">{loginSuccess}</p>}
            {err && <p className="mx-auto w-full text-center error mt-4 text-xl">{err}</p>}
          </form>
          <p className="mt-6">Already Registered? <Link to='/doctor/login' className="text-primary-600">Login</Link> </p>
        </div>
      </div>
    </div>
  )
}

export default DoctorRegister