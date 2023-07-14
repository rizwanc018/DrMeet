import React from 'react';
import { useTable } from 'react-table';
import { FaEdit } from 'react-icons/fa';

const RegisteredDoctorsTable = ({ data }) => {
console.log("🚀 ~ file: RegisteredDoctorsTable.jsx:6 ~ RegisteredDoctorsTable ~ data:", data)

  // const data = [
  //   { name: 'John Doe', age: 25 },
  //   { name: 'Jane Smith', age: 30 },
  //   { name: 'Bob Johnson', age: 40 },
  // ];

  const columns = React.useMemo(
    () => [
      {
        Header: 'Image',
        accessor: 'image', 
        Cell: ({ cell: { value } }) => <img src={value} alt="User" />,
      },
      {
        Header: 'FirstName',
        accessor: 'fname', // accessor is the "key" in the data object
      },
      {
        Header: 'LastName',
        accessor: 'lname',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Mobile',
        accessor: 'mobile',
      },
      {
        Header: 'Department',
        accessor: 'department.name'
      },
      {
        Header: 'Action',
        Cell: () => <FaEdit />,
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <table {...getTableProps()} style={{ border: '1px solid black' }}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()} style={{ borderBottom: '1px solid black' }}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()} style={{ padding: '8px', textAlign: 'left' }}>
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
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()} style={{ padding: '8px', border: '1px solid black' }}>
                  {cell.render('Cell')}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
    // <h1>hiiiiiiiiiiiiiiiiiii</h1>
  );
};

export default RegisteredDoctorsTable;
