export const studentsTableConfig = [
  { Header: 'Reg NO', accessor: 'student_id' },
  { Header: 'First Name', accessor: 'first' },
  { Header: 'Other Name', accessor: 'other' },
  { Header: 'Last Name', accessor: 'last' },
  { Header: 'Gender', accessor: 'gender' },
  { Header: 'Email', accessor: 'email' },
  { Header: 'Phone', accessor: 'phone' },
  {
    Header: 'Photo', accessor: 'photo',
    Cell: tableProps => (
      <img
        src={tableProps.row.original.photo}
        width={60}
        height={60}
        alt='student photo'
      />
    )
  }
];
