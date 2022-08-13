import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { useTable } from "react-table";
import { CDBTable, CDBTableHeader, CDBTableBody } from "cdbreact";

import './table.css';

export const TableResponsive = ({ data }) => {
  return (
    <CDBTable responsive>
      <CDBTableHeader>
      </CDBTableHeader>

      <CDBTableBody>
      </CDBTableBody>
    </CDBTable>
  )
};

export const BasicTable = ({ columnsHeaders, data }) => {
  const { darkMode, lightTheme, darkTheme } = useSelector(state => state.theme);
  const themeMode = darkMode ? darkTheme : lightTheme;

  const tableObject = [...columnsHeaders];
  const columns = useMemo(() => tableObject, []);
  const tableData = useMemo(() => data, []);

  const tableInstance = useTable({
    columns,
    data: tableData
  });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow } = tableInstance;

  return (
    <div>
      <table {...getTableProps()} className={darkMode ? "dark" : "light"}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} style={{
                  backgroundColor: themeMode.bgColor,
                  color: themeMode.color
                }}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return <td {...cell.getCellProps()}
                    style={{ color: `${themeMode.textColor}` }}>
                    {cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
};