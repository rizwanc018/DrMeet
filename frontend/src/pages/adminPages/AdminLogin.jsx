import axios from 'axios'
import { useState } from 'react'

function AdminLogin() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submitHandler = async (e) => {
    e.preventDefault()
    const body = { email, password }
    let result = await axios.post('/api/admin/auth', body)
    console.log("🚀 ~ file: AdminLogin.jsx:13 ~ submitHandler ~ result:", result)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 ">
      <div className="w-1/4 mx-auto p-4 bg-white rounded shadow-xl border-solid border-2 border-primary">
        <img src="/assets/logo.png" alt="Logo" className="w-16 mx-auto mb-4" />
        <h1 className='mb-5 font-bold text-red-800'>Admin Login</h1>
        <form onSubmit={(e) => submitHandler(e)}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 text-sm font-medium text-white bg-primary rounded hover:bg-primary-600"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}

export default AdminLogin