import React from 'react';
import { CDBTable, CDBTableHeader, CDBTableBody } from "cdbreact";

const Body = () => {
  return (
    <div style={{ height: "100%" }}>
      <div style={{ padding: "20px 5%", height: "calc(100% - 64px)", overflowY: "scroll" }}>
        {/* <div style={{ display: "grid", gridTemplateColumns: "repeat(1, minmax(200px, 700px))" }}> */}
        <div className="mt-5">
          <h4 className="font-weight-bold mb-3">Students</h4>
          <CDBTable responsive>
            <CDBTableHeader>
              <tr>
                <th>#</th>
                <th>First</th>
                <th>Second</th>
                <th>Third</th>
                <th>Fourth</th>
                <th>Fifth</th>
                <th>Sixth</th>
                <th>Seventh</th>
                <th>Last</th>
                <th>Handle</th>
              </tr>
            </CDBTableHeader>
            <CDBTableBody>
              <tr>
                <td>1</td>
                <td>Name</td>
                <td>Name</td>
                <td>Name</td>
                <td>Name</td>
                <td>Name</td>
                <td>Name</td>
                <td>Name</td>
                <td>Name</td>
                <td>@email</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Name</td>
                <td>Name</td>
                <td>Name</td>
                <td>Name</td>
                <td>Name</td>
                <td>Name</td>
                <td>Name</td>
                <td>Name</td>
                <td>@email</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Name</td>
                <td>Name</td>
                <td>Name</td>
                <td>Name</td>
                <td>Name</td>
                <td>Name</td>
                <td>Name</td>
                <td>Name</td>
                <td>@email</td>
              </tr>
            </CDBTableBody>
          </CDBTable>
        </div>
        {/* </div> */}
      </div>
    </div>
  )
}

export default Body;