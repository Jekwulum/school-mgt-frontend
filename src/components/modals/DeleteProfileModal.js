import React, { useState } from 'react';
import Button from "react-bootstrap/Button";
import ManagementService from '../../utils/services/management.services';
import Modal from 'react-bootstrap/Modal';
import toast from 'react-hot-toast';

const DeleteModal = ({ onchange, id, themeMode }) => {
  // const id = data.student_id ? data.student_id : data.staff_id;
  const [show, setShow] = useState(true);
  const [loading, setLoading] = useState(false);
  const [validateInput, setValidateInput] = useState("");
  const disabledState = validateInput !== id;

  console.log("idddddd: ", id);

  const handleClose = () => {
    setShow(false);
    onchange();
  };

  const deleteProfile = async () => {
    setLoading(true);
    let deleteService;
    if (id.slice(0, 3).toLowerCase() === "stu") {
      deleteService = ManagementService.deleteStudent
    }
    else {
      deleteService = ManagementService.deleteStaff
    }
    const { data: responseData } = await deleteService(id);
    console.log("dfrew", deleteService);
    if (responseData.status !== "SUCCESS") toast.error(responseData.message);
    else {
      toast.success(responseData.message);
      onchange();
    };
    setLoading(false);
  };

  return (
    <div>
      <Modal show={show} backdrop="static" keyboard={false}>
        <div className="modal-header">
          <h4 className="modal-title">Delete Profile - {id}</h4>
          <i
            className="zmdi zmdi-close"
            onClick={handleClose}
            style={{ fontSize: "30px", color: "#FC0303" }}>
          </i>
        </div>

        <Modal.Body>
          <div className="mb-4">
            Do you want to delete this profile with ID <strong>{id}</strong>
          </div>
          <div className="mb-2">
            You can send in a support request about this information, and may
            choose not to continue with this action.
          </div>
          <div className="mb-5 text-danger">
            <input type="text" className="form-control"
              placeholder="Type in the reference number again to confirm delete"
              value={validateInput} onChange={event => setValidateInput(event.target.value)} />
          </div>
          <div className="float-end">
            <Button className="ms-lg-4" variant="secondary" onClick={handleClose}>Close</Button>&nbsp;
            <Button disabled={disabledState} variant="danger" onClick={deleteProfile}> Delete Profile
              {loading ? <>&nbsp;<i className="fa fa-spin fa-spinner" /></> : ""}
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DeleteModal;