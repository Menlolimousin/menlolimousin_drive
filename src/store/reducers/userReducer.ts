import { Auth } from "types/auth";
import { userAction, userState } from "types/user";
const defaultState: userState = {
  User: {} as Auth,
  loading: false,
  error: "",
  success: "",
  status: null,
};

const userReducer = (state = defaultState, action: userAction) => {
  switch (action.type) {
    case "CHANGE_PASSWORD_START":
      return { ...state, loading: true, error: "" };
    case "CHANGE_PASSWORD_SUCCESS":
      return {
        ...state,
        loading: false,
        error: "",
        success: action.payload,
        status: action.status,
      };
    case "CHANGE_PASSWORD_ERROR":
      return {
        ...state,
        loading: true,
        error: action.payload,
        status: action.status,
      };

    case "UPDATE_PROFILE_START":
      return { ...state, loading: true, error: "", status: null };
    case "UPDATE_PROFILE_START_SUCCESS":
      return {
        ...state,
        loading: true,
        error: "",
        User: action.payload,
        status: action.status,
        success: action.success,
      };
    case "UPDATE_PROFILE_START_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
        status: action.status,
      };

    case "USER_RESET":
      return { ...state, loading: false, error: "", status: null, success: "" };

    default:
      return state;
  }
};

export default userReducer;
