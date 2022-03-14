import { ThunkDispatch } from "redux-thunk";

export interface DriveState {
  Drive: any; // Değişcek
  Drives: any;
  loading: boolean;
  error: string;
  success: string;
  status: null | number;
}
export interface IDrives {
  _id: string;
  pickup: string;
  pickupPlaceId: string;
  fullName: any;
  dropOffPlaceId: string;
  dropOff: string;
  Date: string;
  atDate: string;
  atIso: number;
  Time: string;
  vehicleClass: string;
  options: string;
  bookingName: string;
  stop: number;
  rides: "Upcoming" | "Past" | "Cancelled";
  status:
    | "confirmed"
    | "changed"
    | "ongoing"
    | "canceled"
    | "rejected"
    | "completed"
    | "active"
    | "notified"
    | "charging"
    | "drive";
  pickupAirportCheck: boolean;
  dropOffAirportCheck: boolean;
  avgPay: number;
  duration: string;
  mi: number;
  matrixMinute: number;
  priceList: IPricesList[];
  totalPrice: number;
  createdAt: string;
  uuid: string;
  driver: string;
  startRider: number;
  stops: [{ title: string; placeId: string }];
}
interface IPricesList {
  title: string;
  pay: number;
}
export interface IDrive {
  _id: string;
  startOnlineTime: number;
  endOnlineTime: number;
  totalDriverTime: number;
  isOnline: boolean;
  rides: string;
  status: string;
  pickupPlaceId: string;
  pickup: string;
  startRider: number;
  uuid: string;
  dropOffPlaceId: string;
  dropOff: string;
  duration: string;
  owner: { firstName: string };
}
interface IS_ONLINE_DRIVE_START {
  type: "IS_ONLINE_DRIVE_START";
}
interface IS_ONLINE_DRIVE_SUCCESS {
  type: "IS_ONLINE_DRIVE_SUCCESS";
  payload: {
    _id: string;
    startOnlineTime: number;
    endOnlineTime: number;
    totalDriverTime: number;
    isOnline: boolean;
  };
  status: number;
}

interface IS_ONLINE_DRIVE_ERROR {
  type: "IS_ONLINE_DRIVE_ERROR";
  payload: string;
  status: number;
}
interface IS_ONLINE_DRIVE_RESET {
  type: "IS_ONLINE_DRIVE_RESET";
}

interface IS_OFFLINE_DRIVE_START {
  type: "IS_OFFLINE_DRIVE_START";
}
interface IS_OFFLINE_DRIVE_SUCCESS {
  type: "IS_OFFLINE_DRIVE_SUCCESS";
  payload: {
    _id: string;
    startOnlineTime: number;
    endOnlineTime: number;
    totalDriverTime: number;
    isOnline: boolean;
  };
  status: number;
}
interface IS_OFFLINE_DRIVE_ERROR {
  type: "IS_OFFLINE_DRIVE_ERROR";
  payload: string;
  status: number;
}
interface IS_OFFLINE_DRIVE_RESET {
  type: "IS_OFFLINE_DRIVE_RESET";
}

interface START_BOOKING {
  type: "START_BOOKING";
}
interface START_BOOKING_SUCCESS {
  type: "START_BOOKING_SUCCESS";
  payload: string;
  status: number;
}
interface START_BOOKING_ERROR {
  type: "START_BOOKING_ERROR";
  payload: string;
  status: number;
}
interface START_BOOKING_RESET {
  type: "START_BOOKING_RESET";
}

interface END_BOOKING_START {
  type: "END_BOOKING_START";
}
interface END_BOOKING_SUCCESS {
  type: "END_BOOKING_SUCCESS";
  payload: IDrives[];
  status: number;
}
interface END_BOOKING_ERROR {
  type: "END_BOOKING_ERROR";
  payload: string;
  status: number;
}
interface END_BOOKING_RESET {
  type: "END_BOOKING_RESET";
}

interface UPCOMING_START {
  type: "UPCOMING_START";
}
interface UPCOMING_SUCCESS {
  type: "UPCOMING_SUCCESS";
  payload: IDrives[];
  status: number;
}
interface UPCOMING_ERROR {
  type: "UPCOMING_ERROR";
  payload: string;
  status: number;
}
interface UPCOMING_RESET {
  type: "UPCOMING_RESET";
}

interface PAST_START {
  type: "PAST_START";
}
interface PAST_SUCCESS {
  type: "PAST_SUCCESS";
  payload: IDrives[];
  status: number;
}
interface PAST_ERROR {
  type: "PAST_ERROR";
  payload: string;
  status: number;
}
interface PAST_RESET {
  type: "PAST_RESET";
}

interface NOTIFIED_RIDER_START {
  type: "NOTIFIED_RIDER_START";
}
interface NOTIFIED_RIDER_SUCCESS {
  type: "NOTIFIED_RIDER_SUCCESS";
  payload: string;
  success: string;
  status: number;
}
interface NOTIFIED_RIDER_ERROR {
  type: "NOTIFIED_RIDER_ERROR";
  payload: string;
  status: number;
}
interface NOTIFIED_RIDER_RESET {
  type: "NOTIFIED_RIDER_RESET";
}

interface CHECK_UPCOMING_START {
  type: "CHECK_UPCOMING_START";
}
interface CHECK_UPCOMING_SUCCESS {
  type: "CHECK_UPCOMING_SUCCESS";
  payload: IDrives;
  status: number;
}
interface CHECK_UPCOMING_ERROR {
  type: "CHECK_UPCOMING_ERROR";
  payload: string;
  status: number;
}
interface CHECK_UPCOMING_RESET {
  type: "CHECK_UPCOMING_RESET";
}

interface CHARGING_FOR_WAIT_START {
  type: "CHARGING_FOR_WAIT_START";
}
interface CHARGING_FOR_WAIT_SUCCESS {
  type: "CHARGING_FOR_WAIT_SUCCESS";
  success: string;
  payload: string;
  status: number;
}
interface CHARGING_FOR_WAIT_ERROR {
  type: "CHARGING_FOR_WAIT_ERROR";
  payload: string;
  status: number;
}
interface CHARGING_FOR_WAIT_RESET {
  type: "CHARGING_FOR_WAIT_RESET";
}

interface CONFIRMED_BOOKING_START {
  type: "CONFIRMED_BOOKING_START";
}
interface CONFIRMED_BOOKING_SUCCESS {
  type: "CONFIRMED_BOOKING_SUCCESS";
  success: string;
  payload: string;
  status: number;
}
interface CONFIRMED_BOOKING_ERROR {
  type: "CONFIRMED_BOOKING_ERROR";
  payload: string;
  status: number;
}
interface CONFIRMED_BOOKING_RESET {
  type: "CONFIRMED_BOOKING_RESET";
}

interface START_DRIVE_FOR_CHARGING_START {
  type: "START_DRIVE_FOR_CHARGING_START";
}
interface START_DRIVE_FOR_CHARGING_SUCCESS {
  type: "START_DRIVE_FOR_CHARGING_SUCCESS";
  payload: string;
  success: string;
  status: number;
}
interface START_DRIVE_FOR_CHARGING_ERROR {
  type: "START_DRIVE_FOR_CHARGING_ERROR";
  payload: string;
  status: number;
}
interface START_DRIVE_FOR_CHARGING_RESET {
  type: "START_DRIVE_FOR_CHARGING_RESET";
}

interface CONFIRM_STOP_START {
  type: "CONFIRM_STOP_START";
}
interface CONFIRM_STOP_SUCCESS {
  type: "CONFIRM_STOP_SUCCESS";
  payload: any; // Değişcek
  status: number;
}
interface CONFIRM_STOP_ERROR {
  type: "CONFIRM_STOP_ERROR";
  payload: string;
  status: number;
}
interface CONFIRM_STOP_RESET {
  type: "CONFIRM_STOP_RESET";
}

interface SINGLE_BOOKING_START {
  type: "SINGLE_BOOKING_START";
}
interface SINGLE_BOOKING_SUCCESS {
  type: "SINGLE_BOOKING_SUCCESS";
  payload: any;
  status: number;
}
interface SINGLE_BOOKING_ERROR {
  type: "SINGLE_BOOKING_ERROR";
  payload: string;
  status: number;
}
interface SINGLE_BOOKING_RESET {
  type: "SINGLE_BOOKING_RESET";
}

interface START_STOP_START {
  type: "START_STOP_START";
}
interface START_STOP_SUCCESS {
  type: "START_STOP_SUCCESS";
  payload: any; // Değişcek
  success: string;
  status: number;
}
interface START_STOP_ERROR {
  type: "START_STOP_ERROR";
  payload: string;
  status: number;
}
interface START_STOP_RESET {
  type: "START_STOP_RESET";
}

interface CHANGE_DATE_START {
  type: "CHANGE_DATE_START";
}
interface CHANGE_DATE_SUCCESS {
  type: "CHANGE_DATE_SUCCESS";
  payload: any;
  status: number;
  success: string;
}
interface CHANGE_DATE_ERROR {
  type: "CHANGE_DATE_ERROR";
  payload: string;
  status: number;
}
interface CHANGE_DATE_RESET {
  type: "CHANGE_DATE_RESET";
}

export type DriveAction =
  | IS_ONLINE_DRIVE_START
  | IS_ONLINE_DRIVE_SUCCESS
  | IS_ONLINE_DRIVE_ERROR
  | IS_ONLINE_DRIVE_RESET
  | IS_OFFLINE_DRIVE_START
  | IS_OFFLINE_DRIVE_SUCCESS
  | IS_OFFLINE_DRIVE_ERROR
  | IS_OFFLINE_DRIVE_RESET
  | START_BOOKING
  | START_BOOKING_SUCCESS
  | START_BOOKING_ERROR
  | START_BOOKING_RESET
  | END_BOOKING_START
  | END_BOOKING_SUCCESS
  | END_BOOKING_ERROR
  | END_BOOKING_RESET
  | UPCOMING_START
  | UPCOMING_SUCCESS
  | UPCOMING_ERROR
  | UPCOMING_RESET
  | NOTIFIED_RIDER_START
  | NOTIFIED_RIDER_SUCCESS
  | NOTIFIED_RIDER_ERROR
  | NOTIFIED_RIDER_RESET
  | CHECK_UPCOMING_START
  | CHECK_UPCOMING_SUCCESS
  | CHECK_UPCOMING_ERROR
  | CHECK_UPCOMING_RESET
  | CHARGING_FOR_WAIT_START
  | CHARGING_FOR_WAIT_SUCCESS
  | CHARGING_FOR_WAIT_ERROR
  | CHARGING_FOR_WAIT_RESET
  | CONFIRMED_BOOKING_START
  | CONFIRMED_BOOKING_SUCCESS
  | CONFIRMED_BOOKING_ERROR
  | CONFIRMED_BOOKING_RESET
  | START_DRIVE_FOR_CHARGING_START
  | START_DRIVE_FOR_CHARGING_SUCCESS
  | START_DRIVE_FOR_CHARGING_ERROR
  | START_DRIVE_FOR_CHARGING_RESET
  | CONFIRM_STOP_START
  | CONFIRM_STOP_SUCCESS
  | CONFIRM_STOP_ERROR
  | CONFIRM_STOP_RESET
  | PAST_START
  | PAST_SUCCESS
  | PAST_ERROR
  | PAST_RESET
  | SINGLE_BOOKING_START
  | SINGLE_BOOKING_SUCCESS
  | SINGLE_BOOKING_ERROR
  | SINGLE_BOOKING_RESET
  | START_STOP_START
  | START_STOP_SUCCESS
  | START_STOP_ERROR
  | START_STOP_RESET
  | CHANGE_DATE_START
  | CHANGE_DATE_SUCCESS
  | CHANGE_DATE_ERROR
  | CHANGE_DATE_RESET;

export type DriveDispatch = ThunkDispatch<DriveState, void, DriveAction>;
