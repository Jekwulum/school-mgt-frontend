
const ManagementService = {
  getStudents() {
    return ({
      method: 'GET',
      url: `/api/student/`,
    });
  },
};

export default ManagementService;