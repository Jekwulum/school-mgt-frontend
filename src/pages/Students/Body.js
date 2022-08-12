import React from 'react';
import { TableResponsive } from '../../components/dataTable/Tables';

const Body = ({ studentsData }) => {
  console.log("students: ", studentsData);
  return (
    <div style={{ height: "100%" }}>
      <div style={{ padding: "20px 5%", height: "calc(100% - 64px)", overflowY: "scroll" }}>
        {/* <div style={{ display: "grid", gridTemplateColumns: "repeat(1, minmax(200px, 700px))" }}> */}
        <TableResponsive data={studentsData}/>
      </div>
    </div>
  )
}

export default Body;