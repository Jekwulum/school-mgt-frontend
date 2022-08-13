import React from 'react';
import { useSelector } from 'react-redux';

import { studentsTableConfig } from '../../utils/helpers/dataTableConfig';
import { BasicTable } from '../../components/dataTable/Tables';

const Body = ({ studentsData }) => {
  const { darkMode, lightTheme, darkTheme } = useSelector(state => state.theme);
  const themeMode = darkMode ? darkTheme : lightTheme;

  console.log("students: ", studentsData);
  return (
    <div style={{ height: "100%", backgroundColor: themeMode.bodyColor, color: themeMode.textColor }}>
      <div style={{ padding: "10px 3%", height: "calc(100% - 0px)", overflowY: "scroll", backgroundColor: themeMode.bodyColor }}>
        {/* <div style={{ display: "grid", gridTemplateColumns: "repeat(1, minmax(200px, 700px))" }}> */}
        <h1 className='mb-5 mt-2'>Students</h1>
        <BasicTable columnsHeaders={studentsTableConfig} data={studentsData} />
      </div>
    </div>
  )
}

export default Body;