import { useEffect, useState } from "react"
import DepartmentCard from "./DepartmentCard"
import axios from "axios"
import Spinner from "../Spinner"

const Departments = () => {
  const [departments, setDepartments] = useState()
  console.log(departments)

  const getAllDepartments = async () => {
    const response = await axios.get('/api/user/departments')
    setDepartments(response.data.departments)
  }

  useEffect(() => {
    getAllDepartments()
  }, [])

  // return (
  //   <div className="flex flex-nowrap justify-center border-4 w-full">
  //     {
  //       departments ? (
  //         <div className="w-[90%] flex-nowrap flex justify-center gap-5 bg-white overflow-x-auto">
  //           {departments.map((department, i) => (
  //             <DepartmentCard department={department} key={i} />
  //           ))}
  //         </div>
  //       ) : (
  //         <div className="flex flex-wrap gap-5 justify-center mx-8">
  //           <Spinner />
  //         </div>
  //       )
  //     }
  //   </div>
  // );
  return (
    <div className=" flex justify-center  ">
      {
        departments ? (
          <div className="w-[90%] flex flex-nowrap gap-4      ">
            {departments.map((department, i) => (
              <DepartmentCard department={department} key={i} />
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap gap-5 justify-center mx-8">
            <Spinner />
          </div>
        )
      }
    </div>
  );
  
}

export default Departments