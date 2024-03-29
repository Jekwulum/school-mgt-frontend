import axios from 'axios';
import { configs } from '../helpers/constants';
import cookieHelper from '../helpers/cookieHelper';
import TokenHelpers from '../helpers/tokenHelper';

// const BASE_URL = "http://localhost:4000";
const BASE_URL = "https://j-myschool-api.herokuapp.com/"
// const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYWRtaW4wMDEiLCJvYmpfaWQiOiI2MmEyNWJmMjYwMGQ0NWE2ZTRhNjAzMTIiLCJpYXQiOjE2NjA0MTgzNTIsImV4cCI6MTY2MDQyNTU1Mn0.Zwui_6xr6pWoTGJRX9TkfHb0SugmfVo5vuy2vgoPd0I";

export const instance = axios.create({
  baseURL: BASE_URL
});

instance.interceptors.request.use((request) => {
  const token = TokenHelpers.getToken();
  request.headers['x-access-token'] = token;
  return request;
}, error => Promise.reject(error));

// instance.interceptors.response.use((response) => {
//   return response;
// }, error => Promise.reject(error));

instance.interceptors.response.use(response => response, error => {
  if (error.response.status === 401) {
    cookieHelper.remove(configs.KEY);
    window.location.href = '/login';
  } else return error.response;
});

