import { ThunkDispatch } from "redux-thunk";
import { Auth } from "./auth";

export interface IUser {
  user: Auth;
  access_token: string;
  message: string;
}

export interface SignUp {
  title: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password: string;
  cookiePolicy: boolean;
  email: string;
}
export interface IProfileUpdate {
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}
export interface IResetPassword {
  password: string;
  correctPassword: string;
}
export interface IForm {
  email: string;
  password: string;
}
export interface userState {
  User: Auth;
  loading: boolean;
  success: string;
  error: string;
  status: number | null;
}

export interface IPassword {
  newPassword: string;
  confirmPassword: string;
}

interface CHANGE_PASSWORD_START {
  type: "CHANGE_PASSWORD_START";
}

interface CHANGE_PASSWORD_SUCCESS {
  type: "CHANGE_PASSWORD_SUCCESS";
  payload: string;
  status: number;
}
export interface IChangePassword {}
interface CHANGE_PASSWORD_ERROR {
  type: "CHANGE_PASSWORD_ERROR";
  payload: string;
  status: number;
}

interface UPDATE_PROFILE_START {
  type: "UPDATE_PROFILE_START";
}

interface UPDATE_PROFILE_START_SUCCESS {
  type: "UPDATE_PROFILE_START_SUCCESS";
  payload: Auth;
  status: number;
  success: string;
}
interface UPDATE_PROFILE_START_ERROR {
  type: "UPDATE_PROFILE_START_ERROR";
  payload: string;
  status: number;
}

interface USER_RESET {
  type: "USER_RESET";
}

export type userAction =
  | CHANGE_PASSWORD_START
  | CHANGE_PASSWORD_SUCCESS
  | CHANGE_PASSWORD_ERROR
  | UPDATE_PROFILE_START
  | UPDATE_PROFILE_START_SUCCESS
  | UPDATE_PROFILE_START_ERROR
  | USER_RESET;

export type userDispatch = ThunkDispatch<userState, void, userAction>;
