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
  return (
    <div>StaffInfoModal</div>
  )
};

export default StaffInfoModal;