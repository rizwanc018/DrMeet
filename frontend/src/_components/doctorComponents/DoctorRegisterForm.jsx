import { useFormik } from "formik"
import * as Yup from 'yup'
import { GrAttachment } from "react-icons/gr";
import { storage } from "../../config/firebase";
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import { v4 } from "uuid"
import { useState } from "react";

function DoctorRegister() {

  const [avatar, setAvatar] = useState(null)

  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

  const formik = useFormik({
    initialValues: {
      fname: "fname",
      lname: "lname",
      email: "h@h.c",
      mobile: "9087654321",
      password: "1",
      confirmPassword: "1",
      department: "1",
      degree: "1",
      image: ""
    },
    validationSchema: Yup.object({
      fname: Yup.string().required("Required"),
      lname: Yup.string().required("Required"),
      email: Yup.string().email('Invalid email').required('Required'),
      mobile: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
      password: Yup.string().required('Password is required'),
      confirmPassword: Yup.string().required('Passwords must match').oneOf([Yup.ref('password')], 'Passwords must match'),
      department: Yup.string().required("Choose department"),
      degree: Yup.string().required("Required"),
      image: Yup.string().required("Required"),

    }),
    onSubmit: (values) => {
      console.log(values)
    }
  })

  const uploadAvatar = async () => {
    if(!avatar) return
    const avatarRef = ref(storage, `doctorImages/${avatar.name + v4()}`)
    const response = await uploadBytes(avatarRef, avatar)
    const imgUrl = await getDownloadURL(avatarRef);
    formik.setFieldValue('image', imgUrl)

  }

  const handleFormSubmit = (e) => {
    console.log('>>>>>>>>>>>>>>>>>>>>>>');
    e.preventDefault()
    uploadAvatar()
    console.log('<<<<<<<<<<<<<<<<<<');
    formik.handleSubmit()
  }

  console.log(formik.errors)


  // <div className="grid ustify-center items-center h-screen">
  //   <form
  //     onSubmit={formik.handleSubmit}
  //     className='flex flex-col'>
  //     <input
  //       id='fname'
  //       name='fname'
  //       placeholder='FirstName'
  //       type="text"
  //       value={formik.values.fname}
  //       onChange={formik.handleChange}
  //       onBlur={formik.handleBlur}
  //     />
  //     {formik.touched.fname && formik.errors.fname && <p>{formik.errors.fname}</p>}
  //     <input
  //       id='lname'
  //       name='lname'
  //       placeholder='LastName'
  //       type="text"
  //       value={formik.values.lname}
  //       onChange={formik.handleChange}
  //     />
  //     <button type="submit">Submit</button>
  //   </form>
  // </div>
  return (
    <div className="min-h-screen py-10">
      <div className="container mx-auto">
        <div className="w-8/12 rounded-xl mx-auto shadow-md p-10">
          <h2 className="text-2xl mb-4">Doctor Register Form</h2>
          {/* fname and lname */}
          <form onSubmit={(e) => handleFormSubmit(e)}>
            <div className="grid grid-cols-2 gap-10 mb-5">
              <div>
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
                {formik.touched.fname && formik.errors.fname && <p>{formik.errors.fname}</p>}
              </div>
              <div>
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
                {formik.touched.lname && formik.errors.lname && <p>{formik.errors.lname}</p>}
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
                {formik.touched.email && formik.errors.email && <p>{formik.errors.email}</p>}
              </div>
              <div>
                <label htmlFor="mobile">Mobile</label>
                <input
                  type="tel"
                  name="mobile"
                  id="mobile"
                  placeholder="LastName"
                  value={formik.values.mobile}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.mobile && formik.errors.mobile && <p>{formik.errors.mobile}</p>}
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
                {formik.touched.password && formik.errors.password && <p>{formik.errors.password}</p>}
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
                {formik.touched.confirmPassword && formik.errors.confirmPassword && <p>{formik.errors.confirmPassword}</p>}
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
                  <option value="nephro">nephro</option>
                  <option value="cardio">cardio</option>
                </select>
                {formik.touched.department && formik.errors.department && <p>{formik.errors.department}</p>}

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
                {formik.touched.degree && formik.errors.degree && <p>{formik.errors.degree}</p>}
              </div>
              {/* Proof */}
              <div className="relative">
                <label htmlFor="proof">Certificate</label>
                <GrAttachment className="absolute text-2xl top-14" />
                <input
                  type="file"
                  name="proof"
                  id="proof"
                  value={formik.values.proof}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="ps-8 mt-8"
                />
                {formik.touched.proof && formik.errors.proof && <p>{formik.errors.proof}</p>}
              </div>
              {/* Avatar */}
              <div className="">
                <img alt="Posts" width="100px" height="100px" src={`${avatar ? URL.createObjectURL(avatar) : '/assets/avatar.svg'}`}></img>
                <input
                  type="file"
                  name="image"
                  id="image"
                  onChange={(e) => setAvatar(e.target.files[0])}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.image && formik.errors.image && <p>{formik.errors.image}</p>}
              </div>
            </div>
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default DoctorRegister