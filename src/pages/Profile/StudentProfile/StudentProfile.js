import React, {useEffect} from 'react';
import { batch, useSelector, useDispatch } from 'react-redux';

import Body from './Body';
import Navbar from '../../../Navbar';
import Sidebar from '../../../Sidebar';
import { fetchStudent } from '../../../store/slice/studentProfileSlice';
import { Loading } from '../../../utils/helpers/constants';
import { SphereLoader2 } from '../../../components/loaders/SphereLoaders';

const StudentProfile = ({ id }) => {
  const dispatch = useDispatch();
  const { student, loadingStudent } = useSelector(state => state.student);
  const loadState = loadingStudent !== Loading.SUCCESS;

  useEffect(() => {
    batch(() => {
      if (loadingStudent !== Loading.SUCCESS) dispatch(fetchStudent(id));
    })
  }, [dispatch, loadingStudent]);

  console.log("student: ", student);

  return (
    <div className='d-flex'>
      <div>
        <Sidebar />
      </div>

      <div style={{ flex: "1 1 auto", display: "flex", flexFlow: "column", height: "100vh", overflowY: "hidden" }}>
        <Navbar />
        {
          loadState ? <SphereLoader2 /> :
            <Body studentData={student} />
        }
      </div>
    </div>
  )
}

export default StudentProfile;