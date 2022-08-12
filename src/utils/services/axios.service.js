import axios from 'axios';

const BASE_URL = "http://localhost:4000";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYWRtaW4wMDEiLCJvYmpfaWQiOiI2MmEyNWJmMjYwMGQ0NWE2ZTRhNjAzMTIiLCJpYXQiOjE2NjAzMDc5MzQsImV4cCI6MTY2MDMxNTEzNH0.muHnWf4BwhKN-l9OTVTSGeiunGh9d7a458K3taW7fx8";

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