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
  }
};

export default ManagementService;