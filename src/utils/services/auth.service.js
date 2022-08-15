import { instance as Axios } from "./axios.service";

const AuthService = {
  login(payload){
    return Axios({
      method: 'POST',
      url: `/auth/signin`,
      data: payload
    });
  }
};

export default AuthService;