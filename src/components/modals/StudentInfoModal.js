import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';


const StudentInfoModal = ({ onchange, data }) => {
  const [show, setShow] = useState(true);
  const handleClose = () => {
    setShow(false);
    onchange();
  };

  return (
    <div>
      <Modal show={show} backdrop="static" size="lg" keyboard={false} scrollable={true}>
        <div className="modal-header">
          <h4 className='modal-title'>Edit Info</h4>
          <button aria-label="Close" onClick={handleClose} className="btn-close" data-bs-dismiss="modal"/>
        </div>
        <Modal.Body>
          <div className="row justify-content-center">
            <h4>Info goes here!</h4>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
};

export default StudentInfoModal