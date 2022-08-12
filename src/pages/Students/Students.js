import React, { useEffect } from 'react';
import { batch, useSelector, useDispatch } from 'react-redux';

import { fetchStudents } from '../../store/slice/studentSlice';

import Body from './Body';
import Navbar from '../../Navbar';
import Sidebar from '../../Sidebar';
import { Loading } from '../../utils/helpers/constants';

const Students = () => {
  const dispatch = useDispatch();
  const {students, loadingStudents} = useSelector(state => state.students);

  useEffect(() => {
    batch(() => {
      if (loadingStudents !== Loading.SUCCESS) dispatch(fetchStudents());
    })
  }, [students]);

  console.log('---students---', students);
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

export default Students;