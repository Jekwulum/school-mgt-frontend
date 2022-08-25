import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';

import EncryptHelper from '../../../utils/helpers/encryptHelper';
import TokenHelper from '../../../utils/helpers/tokenHelper';
import { Loading } from '../../../utils/helpers/constants';
import AuthService from '../../../utils/services/auth.service';

const Login = () => {

  
  const history = useHistory();
  const isLoggedIn = TokenHelper.checkIfLoggedIn();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoadingStatus] = useState(false);
  const [message, setMessage] = useState("");
  const [errorStatus, setLoginErrorStatus] = useState(false);

  if (isLoggedIn) return <Redirect to={{ pathname: '/' }} />;

  const handleLogin = async () => {
    setLoginErrorStatus(false);
    setLoadingStatus(true);
    await AuthService.login({ id: userId, password })
      .then((response) => {
        const { data: responseData } = response;
        if (responseData.status !== Loading.SUCCESS) {
          setLoginErrorStatus(true);
          setMessage(responseData.message);
          setLoadingStatus(false);
        } else {
          validateLogin(responseData).catch(err => console.trace(err));
        };
      })
      .catch(err => {
        if (err.response) {
          setLoginErrorStatus(true);
          setMessage(err.response.data.message);
          setLoadingStatus(false);
        }
      });
  };

  const validateLogin = async responseData => {
    const tokenData = EncryptHelper.jwtDecode(responseData.access);
    if (tokenData) {
      await setLoggedInUser(responseData.access, tokenData);
      setLoadingStatus(false);
      history.push('/');
    } else {
      setLoginErrorStatus(false);
      setLoadingStatus(false);
    };
  };

  const setLoggedInUser = async (token, user) => {
    await TokenHelper.saveToken(token);
    await TokenHelper.saveUserId(user.user_id);
  };

  return (
    <div>
      <form>
        <div>
          <label>User ID: </label>
          <input value={userId} placeholder='Enter ID' type="text" onChange={e => setUserId(e.target.value)} />
        </div>
        <div>
          <label>Password: </label>
          <input value={password} placeholder='Enter Password' type="password" onChange={e => setPassword(e.target.value)} />
        </div>
        <button type='button' onClick={handleLogin}>
          Sign In{loading ? <>&nbsp;<i className='fa fa-spin fa-spinner' /> </> : ""}
        </button>
      </form>
    </div>
  )
}

export default Login;