import React, { useEffect } from 'react';
import { batch, useSelector, useDispatch } from 'react-redux';

import Body from './Body';
import Navbar from '../../../Navbar';
import Sidebar from '../../../Sidebar';
import { fetchStaff } from '../../../store/slice/staffProfileSlice';
import { Loading } from '../../../utils/helpers/constants';
import { SphereLoader2 } from '../../../components/loaders/SphereLoaders';

const StaffProfile = ({ id }) => {
  const dispatch = useDispatch();
  const { staff, loadingStaff } = useSelector(state => state.staffProfile);
  const loadState = loadingStaff !== Loading.SUCCESS;

  useEffect(() => {
    batch(() => {
      if (loadingStaff !== Loading.SUCCESS) dispatch(fetchStaff(id));
    })
  }, [dispatch, loadingStaff]);

  console.log("staff: ", staff);

  return (
    <div className='d-flex'>
      <div>
        <Sidebar />
      </div>

      <div style={{ flex: "1 1 auto", display: "flex", flexFlow: "column", height: "100vh", overflowY: "hidden" }}>
        <Navbar />
        {
          loadState ? <SphereLoader2 /> :
            <Body staffData={staff} />
        }
      </div>
    </div>
  )
}

export default StaffProfile;