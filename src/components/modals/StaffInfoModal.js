import React, { useState } from 'react';
import ManagementService from '../../utils/services/management.services';
import Modal from 'react-bootstrap/Modal';
import moment from 'moment';
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
  const [isAdmin, setIsAdmin] = useState(data.is_admin);
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
  };
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

  return (
    <div>StaffInfoModal</div>
  )
};

export default StaffInfoModal;