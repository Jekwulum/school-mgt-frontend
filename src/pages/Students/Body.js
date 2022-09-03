import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import moment from 'moment';
import toast from 'react-hot-toast';

import { studentsTableConfig } from '../../utils/helpers/dataTableConfig';
import { BasicTable } from '../../components/dataTable/Tables';
import ManagementService from '../../utils/services/management.services';
import StudentInfoModal from '../../components/modals/StudentInfoModal';

const Body = ({ studentsData }) => {
  const { darkMode, lightTheme, darkTheme } = useSelector(state => state.theme);
  const themeMode = darkMode ? darkTheme : lightTheme;

  const [addNewStudent, setAddNewStudent] = useState(false);
  const [infoRender, setInfoRender] = useState(false);
  const [loading, setLoading] = useState(false);
  const [studentData, setStudentData] = useState({});

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [otherName, setOtherName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [photo, setPhoto] = useState("");
  const GENDERS = [
    { value: 'male', label: 'male' },
    { value: 'female', label: 'female' }
  ];

  const actionColumn = {
    Header: 'Action', accessor: 'action',
    Cell: row => (
      <div className='d-flex'>
        <span className="text-center pointer m-auto">
          <i style={{ fontSize: "22px" }} className="zmdi zmdi-edit"></i>
        </span>
        <span className="text-center pointer m-auto">
          <i className="zmdi zmdi-delete" style={{ fontSize: "22px", color: "#FC0303" }}></i>
        </span>
      </div>
    )
  };

  const tableObject = [...studentsTableConfig, actionColumn];
  const disableAddButton = !firstName || !lastName || !email || !password || !confirmPassword || !gender || !dob || !photo;
  const addStudent = () => setAddNewStudent(!addNewStudent);
  const changeInfoRenderStatus = () => setInfoRender(false);
  const studentInfoModal = infoRender ? <StudentInfoModal onchange={changeInfoRenderStatus} data={studentData} /> : null;

  const handlePhoto = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPhoto(reader.result);
    };
  };

  const upload = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (password !== confirmPassword) {
      toast.error("passwords do not match");
      return
    };

    const payload = {
      first: firstName, last: lastName, other: otherName,
      email, password, confirmPassword,
      gender, dob, photo, phone,
    };

    const { data: responseData } = await ManagementService.addStudent(payload);
    if (responseData.status !== "SUCCESS") toast.error(responseData.message);
    else toast.success(responseData.message);

    setLoading(false);
  };

  console.log("students: ", studentsData);
  return (
    <div style={{ height: "100%", backgroundColor: themeMode.bodyColor, color: themeMode.textColor }}>
      <div style={{ padding: "10px 3%", height: "calc(100% - 0px)", overflowY: "scroll", backgroundColor: themeMode.bodyColor }}>
        {/* <div style={{ display: "grid", gridTemplateColumns: "repeat(1, minmax(200px, 700px))" }}> */}
        {studentInfoModal}
        <div className='d-flex justify-content-between'>
          <h1 className='mb-5 mt-2'>Students</h1>
          <button onClick={addStudent} type='button' className='mt-4 h-75 p-2 border-0 rounded' style={{ backgroundColor: themeMode.bgColor, color: "#fff" }}>
            <i className='zmdi zmdi-account-add me-2' /> Add Student
          </button>
        </div>
        <div className="">
          {addNewStudent ? <div className='table-responsive mb-4'>
            <form className="mb-4">
              <div className='container'>
                <div className="row">
                  <div className="col">
                    <label className="form-label">First Name <span className="tx-danger">*</span></label>
                    <input type="text" className="form-control" value={firstName}
                      placeholder="Enter first name"
                      onChange={event => setFirstName(event.target.value)}
                    />
                  </div>
                  <div className="col">
                    <label className="form-label">Other Name </label>
                    <input type="text" className="form-control" value={otherName}
                      placeholder="Enter other name"
                      onChange={event => setOtherName(event.target.value)}
                    />
                  </div>
                  <div className="col">
                    <label className="form-label">Last Name <span className="tx-danger">*</span></label>
                    <input type="text" className="form-control" value={lastName}
                      placeholder="Enter last name"
                      onChange={event => setLastName(event.target.value)}
                    />
                  </div>
                </div>


                <div className="row mt-4">
                  <div className="col">
                    <label className="form-label">Email<span className="tx-danger">*</span></label>
                    <input type="email" className="form-control" value={email}
                      placeholder="Enter email"
                      onChange={event => setEmail(event.target.value)}
                    />
                  </div>
                  <div className="col">
                    <label className="form-label">Password <span className="tx-danger">*</span></label>
                    <input type="password" className="form-control" value={password}
                      placeholder="Enter password"
                      onChange={event => setPassword(event.target.value)}
                    />
                  </div>
                  <div className="col">
                    <label className="form-label">Confirm Password <span className="tx-danger">*</span></label>
                    <input type="password" className="form-control" value={confirmPassword}
                      placeholder="Enter password again"
                      onChange={event => setConfirmPassword(event.target.value)}
                    />
                  </div>
                </div>

                <div className="row mt-4">
                  <div className="col">
                    <label className="form-label">Gender<span className="tx-danger">*</span></label>
                    <Select options={GENDERS}
                      isClearable={false} isSearchable={true}
                      maxMenuHeight={250} menuPlacement="bottom"
                      name={gender} onChange={option => setGender(option.value)} />
                  </div>
                  <div className="col">
                    <label className="form-label">Date of Birth<span className="tx-danger">*</span></label>
                    <input type="date"
                      onChange={e => {
                        const newDate = moment(new Date(e.target.value)).format('YYYY-MM-DD');
                        setDob(newDate);
                      }}
                      className='w-75 border-0 rounded h-50'
                    />
                  </div>
                  <div className="col">
                    <label className="form-label">Photo<span className="tx-danger">*</span></label>
                    <input type="file" className="form-control"
                      onChange={handlePhoto} accept="image/*"
                    />
                  </div>
                  <div className="col">
                    <label className="form-label">Phone</label>
                    <input type="text" className="form-control" value={phone}
                      onChange={event => setPhone(event.target.value)}
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>

                <button onClick={upload}
                  className='mt-4 p-2 border-0 rounded' disabled={disableAddButton}
                  style={{ backgroundColor: disableAddButton ? themeMode.bgColor + "b3" : themeMode.bgColor, color: "#fff", height: "40px" }}>
                  Create Profile {loading ? <>&nbsp;<i
                    className="fa fa-spin fa-spinner" /></> : ""}
                </button>
              </div>
            </form>
          </div> : ""}
        </div>
        <BasicTable columnsHeaders={tableObject} data={studentsData} />
      </div>
    </div>
  )
}

export default Body;