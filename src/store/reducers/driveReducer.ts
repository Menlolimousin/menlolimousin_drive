import { IDrive, DriveState, DriveAction } from "types/drive";
const defaultState: DriveState = {
  Drive: {} as IDrive,
  Drives: [],
  loading: false,
  error: "",
  success: "",
  status: null,
};

const driveReducer = (state = defaultState, action: DriveAction) => {
  switch (action.type) {
    case "IS_ONLINE_DRIVE_START":
      return {
        ...state,
        loading: true,
        error: "",
        success: "",
        status: null,
      };
    case "IS_ONLINE_DRIVE_SUCCESS":
      return {
        ...state,
        loading: false,
        Drive: action.payload,
        status: action.status,
      };
    case "IS_ONLINE_DRIVE_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
        status: action.status,
      };
    case "IS_ONLINE_DRIVE_RESET":
      return {
        ...state,
        loading: false,
        error: "",
        success: "",
        status: null,
      };

    case "IS_OFFLINE_DRIVE_START":
      return {
        ...state,
        loading: true,
        error: "",
        success: "",
        status: null,
      };
    case "IS_OFFLINE_DRIVE_SUCCESS":
      return {
        ...state,
        loading: false,
        Drive: action.payload,
        status: action.status,
      };
    case "IS_OFFLINE_DRIVE_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
        status: action.status,
      };
    case "IS_OFFLINE_DRIVE_RESET":
      return {
        ...state,
        loading: false,
        error: "",
        success: "",
        status: null,
      };

    case "START_BOOKING":
      return {
        ...state,
        error: "",
        success: "",
        status: null,
      };
    case "START_BOOKING_SUCCESS":
      return {
        ...state,
        loading: false,
        Drive: action.payload,
        success: action.payload,
        status: action.status,
      };
    case "START_BOOKING_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
        status: action.status,
      };
    case "START_BOOKING_RESET":
      return {
        ...state,
        loading: false,
        error: "",
        success: "",
        status: null,
      };

    case "END_BOOKING_START":
      return {
        ...state,

        error: "",
        success: "",
        status: null,
      };
    case "END_BOOKING_SUCCESS":
      return {
        ...state,
        loading: false,
        Drives: action.payload,
        status: action.status,
      };
    case "END_BOOKING_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
        status: action.status,
      };
    case "END_BOOKING_RESET":
      return {
        ...state,
        loading: false,
        error: "",
        success: "",
        status: null,
      };

    case "UPCOMING_START":
      return {
        ...state,
        loading: true,
        error: "",
        success: "",
        status: null,
      };
    case "UPCOMING_SUCCESS":
      return {
        ...state,
        loading: false,
        Drives: action.payload,
        status: action.status,
      };
    case "UPCOMING_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
        status: action.status,
      };
    case "UPCOMING_RESET":
      return {
        ...state,
        loading: false,
        error: "",
        success: "",
        status: null,
      };

    case "PAST_START":
      return {
        ...state,
        loading: true,
        error: "",
        success: "",
        status: null,
      };
    case "PAST_SUCCESS":
      return {
        ...state,
        loading: false,
        Drives: action.payload,
        status: action.status,
      };
    case "PAST_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
        status: action.status,
      };
    case "PAST_RESET":
      return {
        ...state,
        loading: false,
        error: "",
        success: "",
        status: null,
      };

    case "NOTIFIED_RIDER_START":
      return {
        ...state,
        error: "",
        success: "",
        status: null,
      };
    case "NOTIFIED_RIDER_SUCCESS":
      return {
        ...state,
        loading: false,
        success: action.success,
        Drive: action.payload,
        status: action.status,
      };
    case "NOTIFIED_RIDER_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
        status: action.status,
      };
    case "NOTIFIED_RIDER_RESET":
      return {
        ...state,
        loading: false,
        error: "",
        success: "",
        status: null,
      };

    case "CHECK_UPCOMING_START":
      return {
        ...state,
        error: "",
        success: "",
        loading: true,
        status: null,
      };
    case "CHECK_UPCOMING_SUCCESS":
      return {
        ...state,
        loading: false,
        Drive: action.payload,
        status: action.status,
      };
    case "CHECK_UPCOMING_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
        status: action.status,
      };
    case "CHECK_UPCOMING_RESET":
      return {
        ...state,
        loading: false,
        error: "",
        success: "",
        status: null,
      };

    case "CHARGING_FOR_WAIT_START":
      return {
        ...state,
        error: "",
        success: "",
        loading: true,
        status: null,
      };
    case "CHARGING_FOR_WAIT_SUCCESS":
      return {
        ...state,
        loading: false,
        success: action.success,
        Drive: action.payload,
        status: action.status,
      };
    case "CHARGING_FOR_WAIT_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
        status: action.status,
      };
    case "CHARGING_FOR_WAIT_RESET":
      return {
        ...state,
        loading: false,
        error: "",
        success: "",
        status: null,
      };

    case "CONFIRMED_BOOKING_START":
      return {
        ...state,
        error: "",
        success: "",
        loading: true,
        status: null,
      };
    case "CONFIRMED_BOOKING_SUCCESS":
      return {
        ...state,
        loading: false,
        Drives: action.payload,
        success: action.success,
        status: action.status,
      };
    case "CONFIRMED_BOOKING_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
        status: action.status,
      };
    case "CONFIRMED_BOOKING_RESET":
      return {
        ...state,
        loading: false,
        error: "",
        success: "",
        status: null,
      };

    case "START_DRIVE_FOR_CHARGING_START":
      return {
        ...state,
        error: "",
        success: "",
        loading: true,
        status: null,
      };
    case "START_DRIVE_FOR_CHARGING_SUCCESS":
      return {
        ...state,
        loading: false,
        Drive: action.payload,
        success: action.success,
        status: action.status,
      };
    case "START_DRIVE_FOR_CHARGING_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
        status: action.status,
      };
    case "START_DRIVE_FOR_CHARGING_RESET":
      return {
        ...state,
        loading: false,
        error: "",
        success: "",
        status: null,
      };

    case "CONFIRM_STOP_START":
      return {
        ...state,
        error: "",
        success: "",
        loading: true,
        status: null,
      };
    case "CONFIRM_STOP_SUCCESS":
      return {
        ...state,
        loading: false,
        Drive: action.payload,
        status: action.status,
      };
    case "CONFIRM_STOP_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
        status: action.status,
      };
    case "CONFIRM_STOP_RESET":
      return {
        ...state,
        loading: false,
        error: "",
        success: "",
        status: null,
      };

    case "SINGLE_BOOKING_START":
      return {
        ...state,
        loading: true,
        error: "",
        success: "",
        status: null,
      };
    case "SINGLE_BOOKING_SUCCESS":
      return {
        ...state,
        loading: false,
        Drive: action.payload,
        status: action.status,
      };
    case "SINGLE_BOOKING_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
        status: action.status,
      };
    case "SINGLE_BOOKING_RESET":
      return {
        ...state,
        loading: false,
        error: "",
        success: "",
        status: null,
      };

    case "START_STOP_START":
      return {
        ...state,
        error: "",
        success: "",
        loading: true,
        status: null,
      };
    case "START_STOP_SUCCESS":
      return {
        ...state,
        loading: false,
        Drive: action.payload,
        success: action.success,
        status: action.status,
      };
    case "START_STOP_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
        status: action.status,
      };
    case "START_STOP_RESET":
      return {
        ...state,
        loading: false,
        error: "",
        success: "",
        status: null,
      };

    case "CHANGE_DATE_START":
      return {
        ...state,
        error: "",
        success: "",
        loading: true,
        status: null,
      };
    case "CHANGE_DATE_SUCCESS":
      return {
        ...state,
        loading: false,
        Drives: action.payload,
        success: action.success,
        status: action.status,
      };
    case "CHANGE_DATE_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
        status: action.status,
      };
    case "CHANGE_DATE_RESET":
      return {
        ...state,
        loading: false,
        error: "",
        success: "",
        status: null,
      };

    default:
      return state;
  }
};

export default driveReducer;
