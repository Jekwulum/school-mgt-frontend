import axios from 'axios';

const BASE_URL = "http://localhost:4000";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYWRtaW4wMDEiLCJvYmpfaWQiOiI2MmEyNWJmMjYwMGQ0NWE2ZTRhNjAzMTIiLCJpYXQiOjE2NjA0MTgzNTIsImV4cCI6MTY2MDQyNTU1Mn0.Zwui_6xr6pWoTGJRX9TkfHb0SugmfVo5vuy2vgoPd0I";

export const instance = axios.create({
  baseURL: BASE_URL
});

instance.interceptors.request.use((request) => {
  request.headers['x-access-token'] = TOKEN;
  return request;
});

instance.interceptors.response.use((response) => {
  return response;
});