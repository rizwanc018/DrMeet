import React from 'react'

const DepartmentCard = ({ department }) => {
    //     return (
    //       <div className='w-full rounded border-4 shadow-lg bg-white'>
    //         <div className='flex justify-center'>
    //           <img src={department.image} className='' alt={department.name} />
    //         </div>
    //         <div className='px-6 py-4 text-center'>
    //           <h1 className='font-bold text-xl'>{department.name}</h1>
    //           <p>{department.description}</p>
    //         </div>
    //         {/* <div className="px-6 pt-1 pb-4 text-center">
    //                   {showButton && <Link to={`/appointment/apply/${department._id}`} className='border-2 border-primary p-1 px-4 rounded text-emerald-600
    //   hover:text-white hover:bg-primary active:text-white active:bg-primary'
    //                   >Book Appointment</Link>
    //                   }
    //                   {!showButton &&
    //                       <p className='text-left'>{department.bio}</p>
    //                   }
    //               </div> */}
    //       </div>
    //     );
    return (
        <div className='w-1/4 flex-shrink-0 shadow-lg'>
            <div className='flex justify-center'>
                <img src={department.image} className='' alt={department.name} />
            </div>
            <div className='px-6 py-4 text-center'>
                <h1 className='font-bold text-xl'>{department.name}</h1>
                <p>{department.description}</p>
            </div>
            {/* <div className="px-6 pt-1 pb-4 text-center">
                {showButton && <Link to={`/appointment/apply/${department._id}`} className='border-2 border-primary p-1 px-4 rounded text-emerald-600
hover:text-white hover:bg-primary active:text-white active:bg-primary'
                >Book Appointment</Link>
                }
                {!showButton &&
                    <p className='text-left'>{department.bio}</p>
                }
            </div> */}
        </div>
    );
};


export default DepartmentCard