import React from "react";
import { CDBTable, CDBTableHeader, CDBTableBody } from "cdbreact";

const getKeyByValue = (object, value) => {
  return Object.keys(object).find(key => object[key] === value);
};

// const buildColumnsFromItems = (items) => {
//   let headers = [];
//   items.forEach(item => {
//     if (item.push !== "id" || items)
//     headers.push(item.day);
//   });

//   let columns = [];
//   headers.forEach(header => {
//     columns.push({
//       Header: header,
//       accessor: header
//     })
//   });

//   return columns;
// }

export const TableResponsive = ({ data }) => {
  return (
    <CDBTable responsive>
      <CDBTableHeader>
        <tr>
          {Object.keys(data[0]).map((key) => {
            if (key === "id") { }
            else return (<th>{key}</th>)
          })}
        </tr>
      </CDBTableHeader>
      <CDBTableBody>
        {data.map((item) => (
          <tr key={item.id}>
            {Object.values(item).map((val) => {

              let valKey = getKeyByValue(item, val)
              console.log(valKey, val);
              if (valKey === "photo") { return (<td><img src={val} alt={""} width={"120px"} height={"100px"} /></td>) }
              else if (valKey === "id") { }
              else return (<td>{val}</td>)
            })}
          </tr>
        ))}
      </CDBTableBody>
    </CDBTable>
  )
};