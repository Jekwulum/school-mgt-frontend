import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import toast from 'react-hot-toast';
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
  const ifValidated = !userId || !password;

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
          toast.error(responseData.message);
          setLoadingStatus(false);
        } else {
          validateLogin(responseData).catch(err => console.trace(err));
        };
      })
      .catch(err => {
        if (err.response) {
          setLoginErrorStatus(true);
          setMessage(err.response.data.message);
          toast.error(err.response.data.message);
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
    <div className='body'>
      <section className="login py-5 bg-light">
        <div className="container">
          <div className="row g-0">
            <div className="col-lg-5">
              <img src={imageLogin} className="image-fluid" />
            </div>
            <div className="col-lg-7 text-center py-5">
              <h1 className='animate__animated animate__pulse animate__infinite	infinite'><i>mySchool</i></h1>

              {/* <form> */}
                <div className="form-row py-3 pt-5">
                  <div className="offset-1 col-lg-10">
                    <input
                      value={userId} onChange={e => setUserId(e.target.value)}
                      className='inp px-3' type="text"
                      placeholder='Enter ID' />
                  </div>
                </div>

                <div className="form-row py-3">
                  <div className="offset-1 col-lg-10 passwrd-inp">
                    <input
                      value={password} onChange={e => setPassword(e.target.value)}
                      className='inp px-3' type={passwordType}
                      placeholder='Enter password' />
                    <div className="eye-right">
                      {passwordType === "password" ?
                        <i onClick={() => togglePasswordField('text')} className="zmdi zmdi-eye"></i> :
                        <i onClick={() => togglePasswordField('password')} className="zmdi zmdi-eye-off"></i>
                      }
                    </div>
                  </div>
                </div>

                <div className="form-row py-3">
                  <div className="offset-1 col-lg-10">
                    <button className='btn1' disabled={ifValidated} onClick={handleLogin}>
                      Sign In {loading ? <>&nbsp;<i className="fa fa-spin fa-spinner" /> </> : ""}
                    </button>
                  </div>
                </div>
              {/* </form> */}
              <p className='forgot-password'>forgot password?</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Login;