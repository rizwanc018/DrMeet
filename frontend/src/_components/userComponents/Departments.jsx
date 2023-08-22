import { useEffect, useState } from "react"
import DepartmentCard from "./DepartmentCard"
import axios from "axios"
import Spinner from "../Spinner"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";


const Departments = () => {
  const [departments, setDepartments] = useState()

  const getAllDepartments = async () => {
    const response = await axios.get('/api/user/departments')
    setDepartments(response.data.departments)
  }

  useEffect(() => {
    getAllDepartments()
  }, [])


  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
      <Slider {...settings}>
        {
          departments ? (departments.map((department, i) => (
            <div key={i}>
              <DepartmentCard department={department} />
            </div>))) :
            (
              <div className="flex flex-wrap gap-5 justify-center mx-8">
                <Spinner />
              </div>
            )
        }

      </Slider>

  )
}

export default Departments

// import { useEffect, useState } from "react"
// import DepartmentCard from "./DepartmentCard"
// import axios from "axios"
// import Spinner from "../Spinner"
// import Carousel from 'react-grid-carousel'


// const Departments = () => {
//   const [departments, setDepartments] = useState()

//   const getAllDepartments = async () => {
//     const response = await axios.get('/api/user/departments')
//     setDepartments(response.data.departments)
//   }

//   useEffect(() => {
//     getAllDepartments()
//   }, [])

//   return (
//     <>
//       <div className=" md:flex justify-center my-20">
//         <div className="md:w-[90%]">
//           <div className="flex justify-center">
//           <h1 className="text-4xl font-semibold border-b-4 pb-4 my-3 border-primary w-fit ">Our Specialities</h1>
//           </div>
//           <Carousel cols={4} rows={1} gap={10}>
//             {departments ? (departments.map((department, i) => (
//               <Carousel.Item  key={i}>
//                 <DepartmentCard department={department} />
//               </Carousel.Item>))) :
//               (
//                 <div className="flex flex-wrap gap-5 justify-center mx-8">
//                   <Spinner />
//                 </div>
//               )
//             }
//           </Carousel>
//         </div>

//       </div>
//     </>
//   )

// }

// export default Departments
