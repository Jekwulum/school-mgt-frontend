import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import toast from 'react-hot-toast';

import { staffTableConfig } from '../../utils/helpers/dataTableConfig';
import { BasicTable } from '../../components/dataTable/Tables';
import ManagementService from '../../utils/services/management.services';


const Body = ({ staffData }) => {
  const { darkMode, lightTheme, darkTheme } = useSelector(state => state.theme);
  const themeMode = darkMode ? darkTheme : lightTheme;

  const [addNewStaff, setAddNewStaff] = useState(false);
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [otherName, setOtherName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const [photo, setPhoto] = useState("");
  const [adminStatus, setAdminStatus] = useState(false);
  const GENDERS = [
    { value: 'male', label: 'male' },
    { value: 'female', label: 'female' }
  ];
  const ADMIN_STATUS = [
    { value: true, label: 'YES' },
    { value: false, label: 'NO' }
  ];

  const disableAddButton = !firstName || !lastName || !email || !password || !confirmPassword || !gender || !photo || !phone;
  const addStaff = () => setAddNewStaff(!addNewStaff);

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
      setLoading(false);
      return
    };

    const payload = {
      first: firstName, last: lastName, other: otherName,
      email, password, confirmPassword,
      gender, photo, phone, is_admin: adminStatus
    };

    const { data: responseData } = await ManagementService.addStaff(payload);
    if (responseData.status !== "SUCCESS") toast.error(responseData.message)
    else toast.success(responseData.message);

    setLoading(false);
  };

  console.log("staff: ", staffData);
  return (
    <div style={{ height: "100%", backgroundColor: themeMode.bodyColor, color: themeMode.textColor }}>
      <div style={{ padding: "10px 3%", height: "calc(100% - 0px)", overflowY: "scroll", backgroundColor: themeMode.bodyColor }}>
        <div className='d-flex justify-content-between'>
          <h1 className='mb-5 mt-2'>Staff</h1>
          <button onClick={addStaff} type='button' className='mt-4 h-75 p-2 border-0 rounded' style={{ backgroundColor: themeMode.bgColor, color: "#fff" }}>
            <i className='zmdi zmdi-account-add me-2' /> Add Staff
          </button>
        </div>
        <div className="">
          {addNewStaff ? <div className='table-responsive mb-4'>
            <form className="mb-4">
              <div className="container">
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
                </div>

                <div className="row mt-4">
                  <div className="col">
                    <label className="form-label">Last Name </label>
                    <input type="text" className="form-control" value={lastName}
                      placeholder="Enter other name"
                      onChange={event => setLastName(event.target.value)}
                    />
                  </div>
                  <div className="col">
                    <label className="form-label">Email<span className="tx-danger">*</span></label>
                    <input type="email" className="form-control" value={email}
                      placeholder="Enter email"
                      onChange={event => setEmail(event.target.value)}
                    />
                  </div>
                </div>

                <div className="row mt-4">
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
                    <label className="form-label">Photo<span className="tx-danger">*</span></label>
                    <input type="file" className="form-control"
                      onChange={handlePhoto} accept="image/*"
                    />
                  </div>
                </div>

                <div className="row mt-4">
                  <div className="col">
                    <label className="form-label">Phone</label>
                    <input type="text" className="form-control" value={phone}
                      onChange={event => setPhone(event.target.value)}
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div className="col">
                    <label className="form-label">Admin Status<span className="tx-danger">*</span></label>
                    <Select options={ADMIN_STATUS}
                      isClearable={false} isSearchable={true}
                      maxMenuHeight={250} menuPlacement="bottom"
                      name={gender} onChange={option => setAdminStatus(option.value)} />
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
        <BasicTable columnsHeaders={staffTableConfig} data={staffData} />
      </div>
    </div>
  )
}

export default Body;