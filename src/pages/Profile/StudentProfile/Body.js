import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import ManagementService from '../../../utils/services/management.services';

import './StudentProfile.css';

const Body = ({ studentData }) => {
  const { darkMode, lightTheme, darkTheme } = useSelector(state => state.theme);
  const themeMode = darkMode ? darkTheme : lightTheme;

  const [photo, setPhoto] = useState("");
  const [changePasswordLoading, setChangePasswordLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePhoto = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => setPhoto(reader.result);
  };

  const upload = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (photo === "") {
      toast.error("Select a photo");
      setLoading(false);
      return;
    }
    const payload = { photo };
    const { data: responseData } = await ManagementService.updateStudentPhoto(studentData.student_id, payload);
    if (responseData.status !== "SUCCESS") toast.error(responseData.message);
    else toast.success(responseData.message);

    setLoading(false);
  };

  return (
    <div className='studentProfile' style={{ height: "100%", backgroundColor: themeMode.bodyColor, color: themeMode.textColor }}>
      <div className='student-body' style={{ padding: "10px 3%", height: "calc(100% - 0px)", overflowY: "scroll", backgroundColor: themeMode.bodyColor }}>

        <div className='d-flex justify-content-between main'>
          <div className="profile-info">
            <div className="img-container">
              <img className='studentPhoto rounded-bottom' src={studentData['photo']} alt="" srcset="" />
              <div className="flex" style={{ backgroundColor: themeMode.bodyColor, color: themeMode.textColor }}>

                <label className='photo-label' htmlFor="inputPhoto" style={{ cursor: "pointer", backgroundColor: themeMode.bodyColor, color: "fff" }}>
                  <i class="zmdi zmdi-camera-add"></i>
                </label>
                <input type='file' className='input-photo' accept="image/png, image/jpg, image/gif, image/jpeg"
                  onChange={handlePhoto} style={{ display: "None" }} id="inputPhoto" />

                <button className='mt-4 h-10 p-2 border-0 changePhoto-btn'
                  style={{ backgroundColor: themeMode.bgColor, color: "#fff" }} onClick={upload}>
                  upload {loading ? <>&nbsp;<i
                    className="fa fa-spin fa-spinner" /></> : ""}
                </button>
              </div>
            </div>
            <div className="info">
              <h1 className='mb-5 mt-2'>{studentData['first']} {studentData['other']} {studentData['last']}</h1>
              <h4>Student ID: <strong>{studentData['student_id']}</strong></h4>
            </div>
          </div>
          <div className="change-password">
            {/* <button type='button' className='mt-4 h-10 p-2 border-0 rounded'
              style={{ backgroundColor: themeMode.bgColor, color: "#fff" }} >
              Change Password {changePasswordLoading ? <>&nbsp;<i
                className="fa fa-spin fa-spinner" /></> : ""}
            </button> */}
          </div>
        </div>

        <div className="student-details mt-5 p-3">
          <div className="details">
            <div className="table-responsive mb-4">
              <div className="container">

                <h3>Student's details</h3>
                <div className="row mt-3">
                  <div className="col">Student Id: </div>
                  <div className="col">{studentData['student_id']}</div>
                </div>

                <div className="row mt-2">
                  <div className="col">Name: </div>
                  <div className="col">{studentData['first']} {studentData['other']} {studentData['last']}</div>
                </div>

                <div className="row mt-2">
                  <div className="col">Gender: </div>
                  <div className="col">{studentData['gender']}</div>
                </div>

                <div className="row mt-2">
                  <div className="col">Email: </div>
                  <div className="col">{studentData['email']}</div>
                </div>

                <div className="row mt-2">
                  <div className="col">Phone: </div>
                  <div className="col">{studentData['phone']}</div>
                </div>

                <div className="row mt-2">
                  <div className="col">Date of birth: </div>
                  <div className="col">{studentData['dob']}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Body;