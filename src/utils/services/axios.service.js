import axios from 'axios';

const BASE_URL = "http://localhost:4000";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYWRtaW4wMDEiLCJvYmpfaWQiOiI2MmEyNWJmMjYwMGQ0NWE2ZTRhNjAzMTIiLCJpYXQiOjE2NjAzMTYzNzMsImV4cCI6MTY2MDMyMzU3M30.fcb3mK8uHpUk7uWBTVC1m6Wrhc6rr1vufGuy-Flswac";

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