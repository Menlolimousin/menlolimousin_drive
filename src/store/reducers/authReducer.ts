import { authAction, authState, IAuth } from "types/auth";

const defaultState: authState = {
  Auth: {} as IAuth,
  loading: false,
  error: "",
  success: "",
  status: null,
};

const authReducer = (state = defaultState, action: authAction) => {
  switch (action.type) {
    case "LOGIN_START":
      return { ...state, loading: true, error: "", success: "" };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        loading: false,
        error: "",
        success: "",
        status: action.status,
      };
    case "LOGIN_ERROR":
      return {
        ...state,
        loading: true,
        error: action.payload,
        status: action.status,
      };
    case "LOGIN_LIMIT":
      return {
        ...state,
        loading: true,
        error: action.payload,
        status: action.status,
      };

    case "SIGN_UP_START":
      return { ...state, loading: true, error: "", success: "" };
    case "SIGN_UP_SUCCESS":
      return {
        ...state,
        loading: false,
        error: "",
        success: "",
        status: action.status,
      };
    case "SIGN_UP_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
        status: action.status,
      };

    case "LOGOUT_START":
      return { ...state, loading: false, error: "" };
    case "LOGOUT_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
        status: action.status,
      };
    case "RESET_PASSWORD_START":
      return { ...state, loading: true, error: "", status: null, success: "" };
    case "RESET_PASSWORD_SUCCESS":
      return {
        ...state,
        loading: false,
        success: action.payload,
        status: action.status,
        error: "",
      };
    case "RESET_PASSWORD_ERROR":
      return {
        ...state,
        loading: false,
        success: "",
        status: action.status,
        error: action.payload,
      };

    case "RESET_PASSWORD_TOKEN_CHECK_START":
      return { ...state, loading: true, error: "", status: null, success: "" };
    case "RESET_PASSWORD_TOKEN_CHECK_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "",
        status: action.status,
        error: "",
      };
    case "RESET_PASSWORD_TOKEN_CHECK_ERROR":
      return {
        ...state,
        loading: false,
        success: "",
        status: action.status,
        error: action.payload,
      };

    case "FORGOT_PASSWORD_START":
      return { ...state, loading: true, error: "", status: null, success: "" };
    case "FORGOT_PASSWORD_SUCCESS":
      return {
        ...state,
        loading: false,
        success: action.payload,
        status: action.status,
        error: "",
      };
    case "FORGOT_PASSWORD_ERROR":
      return {
        ...state,
        loading: false,
        success: "",
        status: action.status,
        error: action.payload,
      };
    case "FORGOT_PASSWORD_LIMIT":
      return {
        ...state,
        loading: true,
        error: action.payload,
        status: action.status,
      };

    case "USER_RESET":
      return { ...state, loading: false, error: "", status: null, success: "" };

    default:
      return state;
  }
};

export default authReducer;
