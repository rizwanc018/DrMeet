// import { useState } from "react"
// import { Form, Button, Input, Select } from "antd";

// const AddScheduleForm = () => {
//     const [submitting, setSubmitting] = useState(false)

//     const dayOptions = [
//         { value: 0, label: 'Sunday' },
//         { value: 1, label: 'Monday' },
//         { value: 2, label: 'Tuesday' },
//         { value: 3, label: 'Wednesday' },
//         { value: 4, label: 'Thursay' },
//         { value: 5, label: 'Friday' },
//         { value: 6, label: 'Saturday' }
//     ]

//     return (
//         <>
//             <Form>
//                 <Form.Item>
//                     <Select placeholder="Choose day">
//                         {dayOptions.map((day, i) => (
//                             <Select.Option key={i} value={day.value}>{day.label}</Select.Option>
//                         ))}
//                     </Select>
//                 </Form.Item>
//             </Form>

//         </>

//     )
// }

// export default AddScheduleForm
import React from 'react'
import { Form, Button, Input, Select } from "antd";

const AddScheduleForm = () => {
  return (
    <div>AddScheduleForm</div>
  )
}

export default AddScheduleForm