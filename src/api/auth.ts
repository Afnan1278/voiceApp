import { APIClient } from "./apiCore";
import * as url from "./urls";

const api = new APIClient();

// postForgetPwd
const postFakeForgetPwd = (data: any) =>
  api.create(url.POST_FAKE_PASSWORD_FORGET, data);

// postForgetPwd
const postJwtForgetPwd = (data: any) =>
  api.create(url.POST_FAKE_JWT_PASSWORD_FORGET, data);

const postFakeLogin = (data: any) => api.create(url.POST_FAKE_LOGIN, data);

const postJwtLogin = (data: any) => api.create(url.POST_FAKE_JWT_LOGIN, data);

// Register Method
const postFakeRegister = (data: any) => {
  const api_res = api.create(url.POST_FAKE_REGISTER, data);
  return api_res
};
const postFakeOtp = (data: any) => {
  const api_res = api.create(url.POST_FAKE_REGISTER_OTP, data);
  return api_res
};

// Register Method
const postJwtRegister = (data: any) => {
  return api.create(url.JWT_REGISTER, data);
};
const changePassword = (data: object) => {
  return api.update(url.USER_CHANGE_PASSWORD, data);
};

// postSocialLogin
const postSocialLogin = (data: any) => api.create(url.SOCIAL_LOGIN, data);

export {
  postFakeForgetPwd,
  postJwtForgetPwd,
  postFakeLogin,
  postJwtLogin,
  postFakeOtp,
  postFakeRegister,
  postJwtRegister,
  changePassword,
  postSocialLogin,
};
