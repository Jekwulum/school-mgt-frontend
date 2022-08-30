import React, { useEffect } from 'react';
import { batch, useSelector, useDispatch } from 'react-redux';

import Body from './Body';
import Navbar from '../../Navbar';
import Sidebar from '../../Sidebar';
import { fetchAllStaff } from '../../store/slice/staffSlice';
import { Loading } from '../../utils/helpers/constants';
import { SphereLoader2 } from '../../components/loaders/SphereLoaders';

const Staff = () => {
  const dispatch = useDispatch();
  const { staff, loadingStaff } = useSelector(state => state.staff);
  const loadState = loadingStaff !== Loading.SUCCESS;

  useEffect(() => {
    batch(() => {
      if (loadingStaff !== Loading.SUCCESS) dispatch(fetchAllStaff());
    })
  }, [dispatch, loadingStaff]);

  console.log("staff:: ", staff);

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

export default Staff;