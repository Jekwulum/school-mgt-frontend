import React, { useEffect } from 'react';
import { batch, useSelector, useDispatch } from 'react-redux';

import Body from './Body';
import Navbar from '../../Navbar';
import SphereLoader from '../../components/loaders/SphereLoaders';
import Sidebar from '../../Sidebar';
import { fetchStudents } from '../../store/slice/studentSlice';
import { Loading } from '../../utils/helpers/constants';

const Students = () => {
  const dispatch = useDispatch();
  const { students, loadingStudents, error } = useSelector(state => state.students);
  const loadState = loadingStudents !== Loading.SUCCESS;

  useEffect(() => {
    batch(() => {
      if (loadingStudents !== Loading.SUCCESS) dispatch(fetchStudents());
    })
  }, [dispatch, loadingStudents]);

  return (
    <div className='d-flex'>
      <div>
        <Sidebar />
      </div>

      <div style={{ flex: "1 1 auto", display: "flex", flexFlow: "column", height: "100vh", overflowY: "hidden" }}>
        <Navbar />
        {loadState ? <SphereLoader /> :
          <Body studentsData={students} />
        }
      </div>
    </div>
  )
}

export default Students;