import CookieHelper from "../../utils/helpers/cookieHelper";
import TokenHelper from "../../utils/helpers/tokenHelper";
import { configs } from "../../utils/helpers/constants";

export const setLoggedInUser = async (token, user) => {
  console.log("userr", user);
  await TokenHelper.saveToken(token);
  // await TokenHelper.saveUserId(user.sub);
};

export const removeLoggedInUser = () => {
  CookieHelper.remove(configs.KEY);
  window.location.href = '/login';
};