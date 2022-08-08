import React from 'react';

import Body from './Body';
import Navbar from '../../Navbar';
import Sidebar from '../../Sidebar';

const Staff = () => {
  return (
    <div className='d-flex'>
      <div>
        <Sidebar />
      </div>
      <div style={{ flex: "1 1 auto", display: "flex", flexFlow: "column", height: "100vh", overflowY: "hidden" }}>
        <Navbar />
        <Body />
      </div>
    </div>
  )
}

export default Staff;