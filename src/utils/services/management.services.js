import { instance as Axios } from '../services/axios.service';

const ManagementService = {
  async getStudents () {
    const url = `/api/student/`;
    const response = await Axios.get(url);
    return response;
  },

  async addStudent (payload) {
    const url = `api/student`;
    const response = await Axios.post(url, payload);
    return response;
  },

  async getAllStaff () {
    const url = `/api/staff/`;
    const response = await Axios.get(url);
    return response;
  },

  async addStaff (payload) {
    const url = `api/staff`;
    const response = await Axios.post(url, payload);
    return response;
  }
};

export default ManagementService;