import CryptoJS from "crypto-js";
import { configs } from "./constants";

const encryptHelper = {

  encrypt: data => {
    if (!data) return null;
    else return CryptoJS.AES.encrypt(JSON.stringify(data), configs.KEY);
  },

  decrypt: data => {
    if (!data) return null;
    else {
      const bytes = CryptoJS.AES.decrypt(data.toString(), configs.KEY);
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }
  },

  jwtDecode: data => {
    if (!data) return null;
    else {
      const base64Url = data.split('.')[1];
      const base64 = base64Url.replace('-', '+').replace('_', '/');
      return JSON.parse(window.atob(base64));
    }
  }
};

export default encryptHelper;