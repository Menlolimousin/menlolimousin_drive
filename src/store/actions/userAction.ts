import api from "@utils/lib/api";
import { IPassword, IProfileUpdate, IUser, userDispatch } from "types/user";

export const changePassword =
  (form: IPassword) => async (dispatch: userDispatch) => {
    dispatch({ type: "CHANGE_PASSWORD_START" });

    await api()
      .put<IUser>("/User/changePassword", form)
      .then((data) => {
        dispatch({
          type: "CHANGE_PASSWORD_SUCCESS",
          payload: data.data.message,
          status: data.status,
        });
        dispatch({ type: "USER_RESET" });
      })
      .catch((err) => {
        dispatch({
          type: "CHANGE_PASSWORD_ERROR",
          payload: err.response.data.message,
          status: err.response.status,
        });
        dispatch({ type: "USER_RESET" });
      });
  };

export const profileUpdate =
  (form: IProfileUpdate) => async (dispatch: userDispatch) => {
    dispatch({ type: "UPDATE_PROFILE_START" });
    await api()
      .put<IUser>("/User/updateProfile", form)
      .then((data) => {
        localStorage.setItem("me", JSON.stringify(data.data.user));
        dispatch({
          type: "UPDATE_PROFILE_START_SUCCESS",
          payload: data.data.user,
          status: data.status,
          success: data.data.message,
        });
        dispatch({ type: "USER_RESET" });
      })
      .catch((err) => {
        dispatch({
          type: "UPDATE_PROFILE_START_ERROR",
          payload: err.response.data.message,
          status: err.response.status,
        });
        dispatch({ type: "USER_RESET" });
      });
  };
