import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import './Login.css';
import 'animate.css';

import imageLogin from '../../../assets/img/imageLogin.jpg'
import EncryptHelper from '../../../utils/helpers/encryptHelper';
import TokenHelper from '../../../utils/helpers/tokenHelper';
import { Loading } from '../../../utils/helpers/constants';
import AuthService from '../../../utils/services/auth.service';

const Login = () => {


  const history = useHistory();
  const isLoggedIn = TokenHelper.checkIfLoggedIn();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [loading, setLoadingStatus] = useState(false);
  const [message, setMessage] = useState("");
  const [errorStatus, setLoginErrorStatus] = useState(false);

  if (isLoggedIn) return <Redirect to={{ pathname: '/' }} />;

  const togglePasswordField = type => {
    setPasswordType(type);
    document.getElementById('password').type = type;
  }

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
      <section className="login py-5 bg-light">
        <div className="container">
          <div className="row g-0">
            <div className="col-lg-5">
              <img src={imageLogin} className="image-fluid" />
            </div>
            <div className="col-lg-7 text-center py-5">
              <h1 className='animate__animated animate__pulse animate__infinite	infinite'><i>mySchool</i></h1>

              <form>
                <div className="form-row py-3 pt-5">
                  <div className="offset-1 col-lg-10">
                    <input className='inp px-3' type="text" placeholder='Enter ID' />
                  </div>
                </div>

                <div className="form-row py-3">
                  <div className="offset-1 col-lg-10">
                    <input className='inp px-3' type="password" placeholder='Enter password' />
                  </div>
                </div>

                <div className="form-row py-3">
                  <div className="offset-1 col-lg-10">
                    <button className='btn1'>Sign In</button>
                  </div>
                </div>
              </form>
              <p className='forgot-password'>forgot password?</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Login;