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

  async updateStudent (student_id, payload) {
    const url = `api/student/${student_id}`;
    const response = await Axios.put(url, payload);
    return response;
  },

  async deleteStudent (student_id) {
    const url = `api/student/${student_id}`;
    const response = await Axios.delete(url);
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
  },

  async updateStaff (staff_id, payload) {
    const url = `api/staff/${staff_id}`;
    const response = await Axios.put(url, payload);
    return response;
  },

  async deleteStaff (staff_id) {
    const url = `api/staff/${staff_id}`;
    const response = await Axios.delete(url);
    return response;
  },
};

export default ManagementService;