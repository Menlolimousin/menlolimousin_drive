import { ThunkDispatch } from "redux-thunk";

export interface Auth {
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  phoneNumber: string;
  summary: ISummary[];
  inbox: [];
  totalIncome: number;
  isOnline: boolean;
}
interface ISummary {
  priceList: IPriceList[];
  totalPrice: number;
  date: string;
}
interface IPriceList {
  title: string;
  pay: number;
}
export interface IAuth {
  auth: Auth;
  access_token: string;
  message: string;
}
export interface IChangeNotification {
  auth: Auth;
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
export interface authState {
  Auth: IAuth;
  loading: boolean;
  success: string;
  error: string;
  status: number | null;
}

export interface IPassword {
  newPassword: string;
  confirmPassword: string;
}
interface LOGIN_START {
  type: "LOGIN_START";
}
interface LOGIN_SUCCESS {
  type: "LOGIN_SUCCESS";
  status: number;
}

interface LOGIN_ERROR {
  type: "LOGIN_ERROR";
  payload: string;
  status: number;
}
interface LOGIN_LIMIT {
  type: "LOGIN_LIMIT";
  payload: string;
  status: number;
}

interface SIGN_UP_START {
  type: "SIGN_UP_START";
}
interface SIGN_UP_SUCCESS {
  type: "SIGN_UP_SUCCESS";
  status: number;
}
interface SIGN_UP_ERROR {
  type: "SIGN_UP_ERROR";
  payload: string;
  status: number;
}

interface LOGOUT_START {
  type: "LOGOUT_START";
}

interface LOGOUT_ERROR {
  type: "LOGOUT_ERROR";
  payload: string;
  status: number;
}

interface RESET_PASSWORD_START {
  type: "RESET_PASSWORD_START";
}
interface RESET_PASSWORD_SUCCESS {
  type: "RESET_PASSWORD_SUCCESS";
  payload: string;
  status: number;
}
interface RESET_PASSWORD_ERROR {
  type: "RESET_PASSWORD_ERROR";
  payload: string;
  status: number;
}

interface RESET_PASSWORD_TOKEN_CHECK_START {
  type: "RESET_PASSWORD_TOKEN_CHECK_START";
}
interface RESET_PASSWORD_TOKEN_CHECK_SUCCESS {
  type: "RESET_PASSWORD_TOKEN_CHECK_SUCCESS";
  status: number;
}
interface RESET_PASSWORD_TOKEN_CHECK_ERROR {
  type: "RESET_PASSWORD_TOKEN_CHECK_ERROR";
  payload: string;
  status: number;
}

interface FORGOT_PASSWORD_START {
  type: "FORGOT_PASSWORD_START";
}
interface FORGOT_PASSWORD_SUCCESS {
  type: "FORGOT_PASSWORD_SUCCESS";
  payload: string;
  status: number;
}
interface FORGOT_PASSWORD_ERROR {
  type: "FORGOT_PASSWORD_ERROR";
  payload: string;
  status: number;
}
interface USER_RESET {
  type: "USER_RESET";
}
interface FORGOT_PASSWORD_LIMIT {
  type: "FORGOT_PASSWORD_LIMIT";
  payload: string;
  status: number;
}

export type authAction =
  | LOGIN_START
  | LOGIN_SUCCESS
  | LOGIN_ERROR
  | LOGIN_LIMIT
  | SIGN_UP_START
  | SIGN_UP_SUCCESS
  | SIGN_UP_ERROR
  | LOGOUT_START
  | LOGOUT_ERROR
  | RESET_PASSWORD_START
  | RESET_PASSWORD_SUCCESS
  | RESET_PASSWORD_ERROR
  | FORGOT_PASSWORD_START
  | FORGOT_PASSWORD_SUCCESS
  | FORGOT_PASSWORD_ERROR
  | FORGOT_PASSWORD_LIMIT
  | RESET_PASSWORD_TOKEN_CHECK_START
  | RESET_PASSWORD_TOKEN_CHECK_SUCCESS
  | RESET_PASSWORD_TOKEN_CHECK_ERROR
  | USER_RESET;

export type authDispatch = ThunkDispatch<authState, void, authAction>;
