import { AuthRegisterActionTypes, AuthRegisterState } from "./types";

export const INIT_STATE: AuthRegisterState = {
  registrationError: null,
  message: "",
  loading: false,
  user: null,
  otp: false
};

const Register = (state = INIT_STATE, action: any) => {
  console.log("afnan", action, state)
  switch (action.type) {
    case AuthRegisterActionTypes.API_RESPONSE_SUCCESS:
      switch (action.payload.actionType) {
        case AuthRegisterActionTypes.REGISTER_USER:
          return {
            ...state,
            loading: false,
            user: action.payload.data,
            registrationError: null,
            isUserRegistered: true,
            otp: false
          };
        case AuthRegisterActionTypes.REGISTER_OTP:
          return {
            ...state,
            loading: false,
            user: action.payload.data,
            registrationError: null,
            isUserRegistered: true,
            otp: true
          };
        default:
          return { ...state };
      }


    case AuthRegisterActionTypes.API_RESPONSE_ERROR:
      switch (action.payload.actionType) {
        case AuthRegisterActionTypes.REGISTER_USER:
          return {
            ...state,
            loading: false,
            registrationError: action.payload.error,
            isUserRegistered: false,
          };
        default:
          return { ...state };
      }

    case AuthRegisterActionTypes.REGISTER_USER: {
      return {
        ...state,
        loading: true,
        isUserRegistered: false,
        otp: false
      };
    }
    case AuthRegisterActionTypes.REGISTER_OTP: {
      return {
        ...state,
        loading: true,
        isUserRegistered: false,
        otp: false
      };
    }
    default:
      return { ...state };
  }
};

export default Register;
