import React, { useState } from 'react';
import ManagementService from '../../utils/services/management.services';
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select';
import toast from 'react-hot-toast';

const StaffInfoModal = ({ onchange, data, themeMode }) => {
  const [show, setShow] = useState(true);
  const [loading, setLoading] = useState(false);

  const [firstName, setFirstName] = useState(data.first);
  const [lastName, setLastName] = useState(data.last);
  const [otherName, setOtherName] = useState(data.other);
  const [phone, setPhone] = useState(data.phone);
  const [gender, setGender] = useState(data.gender);
  const [adminStatus, setAdminStatus] = useState(data.is_admin);
  const GENDERS = [
    { value: 'male', label: 'male' },
    { value: 'female', label: 'female' }
  ];
  const ADMIN_STATUS = [
    { value: true, label: 'YES' },
    { value: false, label: 'NO' }
  ];

  const handleClose = () => {
    setShow(false);
    onchange();
  };

  const upload = async (e) => {
    e.preventDefault();
    setLoading(true);
  };

  const payload = {
    first: firstName, last: lastName, other: otherName,
    gender, phone, is_admin: adminStatus
  };
  console.log(payload);

  // const { data: responseData } = await ManagementService.updateStaff(data.staff_id, payload);
  // if (responseData.status !== "SUCCESS") toast.error(responseData.message);
  // else {
  //   toast.success(responseData.message);
  //   onchange();
  // };

  return (
    <div style={{ backgroundColor: themeMode.bodyColor }}>
      <Modal show={show} backdrop="static" size="lg" keyboard={false} scrollable={true} dialogClassName="modal-90w">
        <div className="modal-header">
          <h4 className='modal-title'>Edit Info</h4>
          <i
            className="zmdi zmdi-close"
            onClick={handleClose}
            style={{ fontSize: "30px", color: "#FC0303" }}>
          </i>
        </div>
        <Modal.Body>
          <div className="row justify-content-center">
            <form className="mb-4">
              <div className="container">

                <div className="row">
                  <div className="col">
                    <label className="form-label">First Name </label>
                    <input type="text" className='form-control'
                      value={firstName} onChange={e => setFirstName(e.target.value)} />
                  </div>
                  <div className="col">
                    <label className="form-label">Other Name </label>
                    <input type="text" className='form-control'
                      value={otherName} onChange={e => setOtherName(e.target.value)} />
                  </div>
                </div>

                <div className="row mt-2">
                  <div className="col">
                    <label className="form-label">Last Name </label>
                    <input type="text" className='form-control'
                      value={lastName} onChange={e => setLastName(e.target.value)} />
                  </div>
                  <div className="col">
                    <label className="form-label">Gender </label>
                    <Select options={GENDERS}
                      isClearable={false} isSearchable={true}
                      maxMenuHeight={250} menuPlacement="bottom"
                      name={gender} onChange={option => setGender(option.value)}
                      value={gender} />
                  </div>
                </div>

                <div className="row mt-2">
                  <div className="col">
                    <label className="form-label">Admin Status<span className="tx-danger">*</span></label>
                    <Select options={ADMIN_STATUS}
                      isClearable={false} isSearchable={true}
                      maxMenuHeight={250} menuPlacement="bottom"
                      value={adminStatus}
                      name={gender} onChange={option => setAdminStatus(option.value)} />
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
                  className='mt-4 p-2 border-0 rounded'
                  style={{ backgroundColor: themeMode.bgColor, color: "#fff", height: "40px" }}>
                  Update Profile {loading ? <>&nbsp;<i
                    className="fa fa-spin fa-spinner" /></> : ""}
                </button>

              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
};

export default StaffInfoModal;