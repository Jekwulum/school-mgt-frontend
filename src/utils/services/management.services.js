import { instance as Axios } from '../services/axios.service';

const ManagementService = {
  async getStudents () {
    let url = `/api/student/`;
    let response = await Axios.get(url);
    return response;
  },
};

export default ManagementService;