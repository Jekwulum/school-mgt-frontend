import React, { useState } from 'react';
import ManagementService from '../../utils/services/management.services';
import Modal from 'react-bootstrap/Modal';
import moment from 'moment';
import Select from 'react-select';
import toast from 'react-hot-toast';


const StudentInfoModal = ({ onchange, data, themeMode }) => {
  const [show, setShow] = useState(true);
  const [loading, setLoading] = useState(false);

  const [firstName, setFirstName] = useState(data.first);
  const [lastName, setLastName] = useState(data.last);
  const [otherName, setOtherName] = useState(data.other);
  // const [email, setEmail] = useState(data.email);
  const [phone, setPhone] = useState(data.phone);
  const [gender, setGender] = useState(data.gender);
  const [dob, setDob] = useState(data.dob);
  // const [photo, setPhoto] = useState(data.photo);
  const GENDERS = [
    { value: 'male', label: 'male' },
    { value: 'female', label: 'female' }
  ];

  const handleClose = () => {
    setShow(false);
    onchange();
  };

  const upload = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      first: firstName, last: lastName, other: otherName,
      gender, dob, phone,
    };
    console.log(payload);

    const { data: responseData } = await ManagementService.updateStudent(data.student_id, payload);
    if (responseData.status !== "SUCCESS") toast.error(responseData.message);
    else {
      toast.success(responseData.message);
      // setShow(false);
      onchange();
    };

    setLoading(false);
  };

  return (
    <div style={{backgroundColor: themeMode.bodyColor}}>
      <Modal show={show} backdrop="static" size="lg" keyboard={false} scrollable={true} dialogClassName="modal-90w">
        <div className="modal-header">
          <h4 className='modal-title'>Edit Info</h4>
          <i
            className="zmdi zmdi-close"
            onClick={handleClose}
            style={{ fontSize: "22px", color: "#FC0303" }}>
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

                <div className="row">
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

                <div className="row">
                  <div className="col">
                    <label className="form-label">Date of Birth<span className="tx-danger">*</span></label>
                    <input type="date"
                      value={moment(dob).format('YYYY-MM-DD')}
                      onChange={e => {
                        const newDate = moment(new Date(e.target.value)).format('YYYY-MM-DD');
                        setDob(newDate);
                      }}
                      className='w-75 border-0 rounded h-50'
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

export default StudentInfoModal