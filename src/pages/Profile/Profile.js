import React from 'react';
import TokenHelper from '../../utils/helpers/tokenHelper';
import StaffProfile from './StaffProfile/StaffProfile';
import StudentProfile from './StudentProfile/StudentProfile';

const Profile = () => {
  const user_id = TokenHelper.getUserId();
  return (
    <div>
      {user_id.slice(0, 3) === "stu" ? <StudentProfile id={user_id} /> : <StaffProfile id={user_id} />}
    </div>
  )
}

export default Profile;