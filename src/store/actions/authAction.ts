import api from "@utils/lib/api";
import { IResetPassword, IAuth, SignUp, authDispatch } from "types/auth";
import Cookies from "js-cookie";

export const Login =
  (form: { email: string; password: string }) =>
  async (dispatch: authDispatch) => {
    dispatch({ type: "LOGIN_START" });
    await api()
      .post("/Auth/Drive/Login", form)
      .then((data) => {
        Cookies.set("driveToken", data.data.access_token, { expires: 365 });
        localStorage.setItem("meDrive", JSON.stringify(data.data.user));
        dispatch({ type: "LOGIN_SUCCESS", status: data.status });
        dispatch({
          type: "USER_RESET",
        });
      })
      .catch((err) => {
        dispatch({
          type: "LOGIN_ERROR",
          payload: err.response.data.message,
          status: err.response.status,
        });
        dispatch({
          type: "USER_RESET",
        });
      });
  };

export const signUp = (form: SignUp) => async (dispatch: authDispatch) => {
  dispatch({ type: "SIGN_UP_START" });
  await api()
    .post("/Auth/Drive/signUp", form)
    .then((data) => {
      Cookies.set("token", data.data.access_token, { expires: 365 });
      const me = {
        firstName: data.data.user.firstName,
        lastName: data.data.user.lastName,
        email: data.data.user.email,
        avatar: data.data.user.avatar,
        phoneNumber: data.data.user.phoneNumber,
        summary: data.data.user.summary,
        inbox: data.data.user.inbox,
        totalIncome: data.data.user.totalIncome,
        isOnline: data.data.user.isOnline,
      };
      localStorage.setItem("me", JSON.stringify(me));
      dispatch({ type: "SIGN_UP_SUCCESS", status: data.status });
      dispatch({
        type: "USER_RESET",
      });
    })
    .catch((err) => {
      dispatch({
        type: "SIGN_UP_ERROR",
        payload: err.response.data.message,
        status: err.response.status,
      });
      dispatch({ type: "USER_RESET" });
    });
};

export const Logout = () => async (dispatch: authDispatch) => {
  dispatch({ type: "LOGOUT_START" });
  await api()
    .get("/Auth/Drive/Logout")
    .then(() => {
      Cookies.remove("driveToken");
      localStorage.clear();
      window.location.replace("/");
    })
    .catch((err) => {
      dispatch({
        type: "LOGOUT_ERROR",
        payload: err?.response?.data?.message,
        status: err.response.status,
      });
      dispatch({ type: "USER_RESET" });
    });
};

export const forgotPassword =
  (email: string) => async (dispatch: authDispatch) => {
    dispatch({ type: "FORGOT_PASSWORD_START" });
    await api()
      .post("/Drive/forgotPassword", email)
      .then((data) => {
        dispatch({
          type: "FORGOT_PASSWORD_SUCCESS",
          payload: data.data.message,
          status: data.status,
        });
        dispatch({ type: "USER_RESET" });
      })
      .catch((err) => {
        if (err?.response?.status === 429) {
          dispatch({
            type: "FORGOT_PASSWORD_LIMIT",
            payload: err.response.data,
            status: err.response.status,
          });
          dispatch({ type: "USER_RESET" });
        } else {
          dispatch({
            type: "FORGOT_PASSWORD_ERROR",
            payload: err.response.data.message,
            status: err.response.status,
          });
          dispatch({ type: "USER_RESET" });
        }
      });
  };

export const resetPassword =
  (resetPasswordToken: string, form: IResetPassword) =>
  async (dispatch: authDispatch) => {
    dispatch({ type: "RESET_PASSWORD_START" });
    await api()
      .put(`/Drive/resetPassword/${resetPasswordToken}`, form)
      .then((data) => {
        setTimeout(() => {
          window.location.replace("/");
        }, 1500);
        dispatch({
          type: "RESET_PASSWORD_SUCCESS",
          payload: data.data.message,
          status: data.status,
        });
      })
      .catch((err) => {
        dispatch({
          type: "RESET_PASSWORD_ERROR",
          payload: err.response.data.message,
          status: err.response.status,
        });
        dispatch({ type: "USER_RESET" });
      });
  };
export const resetPasswordTokenCheck =
  (resetPasswordToken: string) => async (dispatch: authDispatch) => {
    dispatch({ type: "RESET_PASSWORD_TOKEN_CHECK_START" });
    await api()
      .get<{ status: number }>(
        `/Drive/resetPasswordTokenCheck/${resetPasswordToken}`
      )
      .then((data) => {
        dispatch({
          type: "RESET_PASSWORD_TOKEN_CHECK_SUCCESS",
          status: data.status,
        });
      })
      .catch((err) => {
        dispatch({
          type: "RESET_PASSWORD_TOKEN_CHECK_ERROR",
          payload: err.response.data.message,
          status: err.response.status,
        });
        dispatch({ type: "USER_RESET" });
      });
  };
