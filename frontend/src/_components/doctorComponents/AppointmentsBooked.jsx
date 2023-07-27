import { useMemo } from "react"
import moment from "moment"
import { useTable } from 'react-table';
import { MdVideoCall } from 'react-icons/md'

const AppointmentsBooked = ({ data }) => {


  const columns = useMemo(
    () => [
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
        // Cell: ({ cell: { row } }) => moment(row.original.startTime) + ' - ' + moment(row.original.endTime)
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
    <div className='w-full  p-10'>
      <table {...getTableProps()} className='text-center w-fit table-auto shadow-lg bg-white'>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} style={{ borderBottom: '1px solid black' }}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} className='bg-primary-500 border text-left px-8 py-4'>
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
                  <td {...cell.getCellProps()} className='border-2 px-8 py-4'>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  )
}

export default AppointmentsBooked