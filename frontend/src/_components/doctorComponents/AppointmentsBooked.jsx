import { useMemo } from "react"
import moment from "moment"
import { useTable } from 'react-table';
import { MdVideoCall } from 'react-icons/md'

const AppointmentsBooked = ({ data }) => {

  const columns = useMemo(
    () => [
      {
        Header: '#',
        accessor: 'rowNumber',
        Cell: ({ row }) => <div>{row.index + 1}</div>,
      },
      {
        Header: 'FirstName',
        accessor: 'patientId.fname', // accessor is the "key" in the data object
      },
      {
        Header: 'LastName',
        accessor: 'patientId.lname',
      },
      {
        Header: 'Mobile',
        accessor: 'patientId.mobile',
      },
      {
        Header: 'Time',
        accessor: 'timeId.startTime',
        Cell: ({ cell: { row } }) => (
          moment(row.original.timeId.startTime).format('hh:mm a') + ' - ' + moment(row.original.timeId.endTime).format('hh:mm a')
        )
      },
      {
        Header: '',
        accessor: '_id',
        Cell: ({ value }) => (
          <button className=' rounded'>
            <MdVideoCall className='text-primary text-3xl font-bold' />
          </button>
        )
      }
    ], []
  )


  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <>
      {data.length === 0 ? (<h1 className="mt-10 font-bold text-3xl">No Appointments</h1>) : (
        <div className='p-10 overflow-x-auto'>
          <table {...getTableProps()} className='text-center w-auto table-auto shadow-lg bg-white'>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()} style={{ borderBottom: '1px solid black' }}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()} className='bg-primary-500 w-fit border text-left px-8 py-2'>
                      {column.render('Header')}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} className='even:bg-primary-100'>
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()} className='capitalize border-2 px-4 py-2'>
                        {cell.render('Cell')}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* <div className='p-10 overflow-x-auto'>
        <table {...getTableProps()} className='text-center w-auto table-auto shadow-lg bg-white'>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} style={{ borderBottom: '1px solid black' }}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()} className='bg-primary-500 w-fit border text-left px-8 py-2'>
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} className='even:bg-primary-100'>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()} className='capitalize border-2 px-4 py-2'>
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div> */}
    </>
  )
}

export default AppointmentsBooked