export enum AuthRegisterActionTypes {
  API_RESPONSE_SUCCESS = "@@auth/register/API_RESPONSE_SUCCESS",
  API_RESPONSE_ERROR = "@@auth/register/API_RESPONSE_ERROR",

  REGISTER_USER = "@@auth/register/REGISTER_USER",
  REGISTER_OTP = "@@auth/register/REGISTER_OTP",
}

export interface AuthRegisterState {
  registrationError: any;
  message: string;
  loading: boolean;
  otp: boolean;
  user: object | null;
}
