import moment from 'moment';
import { useEffect, useMemo, useState } from 'react';
import { useTable } from 'react-table';


const Appointments = ({ data }) => {
    // const [tableData, setTableData] = useState([])
    // useEffect(() => {
    //     setTableData(data)
    // },[])
    const columns = useMemo(
        () => [
            {
                Header: '#',
                accessor: 'rowNumber',
                Cell: ({ row }) => <div>{row.index + 1}</div>,
            },
            {
                Header: 'Date',
                accessor: 'date',
                Cell: ({ cell: { value } }) => (
                    moment(value).format('YYYY-MM-DD')
                ),
            },
            {
                Header: 'Doctor',
                Cell: ({ cell: { row } }) => (
                    row.original.docId.fname + ' ' + row.original.docId.lname
                )
            },

            {
                Header: 'Time',
                accessor: 'timeId.startTime',
                Cell: ({ cell: { row } }) => (
                    moment(row.original.timeId.startTime).format('hh:mm a') + ' - ' + moment(row.original.timeId.endTime).format('hh:mm a')
                )
            },

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
            {data && data.length === 0 ? (<h1 className="mt-10 p-10 font-bold text-3xl">No Upcomming Appointments</h1>) : (
                <div className=' overflow-x-auto'>
                    <table {...getTableProps()} className='text-center w-auto table-auto shadow bg-white'>
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
                                    <tr {...row.getRowProps()} className='even:bg-primary-100 '>
                                        {row.cells.map((cell) => (
                                            <td {...cell.getCellProps()} className='capitalize border-2 px-8 py-2'>
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

        </>
    )
}

export default Appointments