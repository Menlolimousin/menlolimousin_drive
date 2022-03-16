import api from "@utils/lib/api";
import { defaultHour } from "@utils/lib/listElements";
import { Success } from "@utils/lib/Messages";
import { NextRouter } from "next/router";

import { DriveDispatch } from "types/drive";

export const startBooking =
  (
    bookingId: string,
    setIsStart: React.Dispatch<React.SetStateAction<boolean>>,
    router: NextRouter
  ) =>
  async (dispatch: DriveDispatch) => {
    dispatch({ type: "START_BOOKING" });
    await api()
      .get(`/Drive/startBooking/${bookingId}`)
      .then((data) => {
        setIsStart(false);
        dispatch({
          type: "START_BOOKING_SUCCESS",
          success: data.data.message,
          payload: data.data.data,
          status: data.status,
        });
        dispatch({ type: "START_BOOKING_RESET" });
        Success(
          "The booking has been successfully completed and the fee has been charged to the user"
        );
        router.push(`/active/${bookingId}`);
      })
      .catch((err) => {
        setIsStart(false);
        dispatch({
          type: "START_BOOKING_ERROR",
          payload: err.response.data.message,
          status: err.response.status,
        });
        dispatch({ type: "START_BOOKING_RESET" });
      });
  };

export const endBooking =
  (
    bookingId: string,
    setIsStart: React.Dispatch<React.SetStateAction<boolean>>
  ) =>
  async (dispatch: DriveDispatch) => {
    dispatch({ type: "END_BOOKING_START" });
    await api()
      .get(`/Drive/endBooking/${bookingId}`)
      .then((data) => {
        Success(
          "The booking has been completed successfully and the fee has been charged to the user."
        );
        dispatch({
          type: "END_BOOKING_SUCCESS",
          payload: data.data.data,
          status: data.status,
        });
        dispatch({ type: "END_BOOKING_RESET" });
      })
      .catch((err) => {
        setIsStart(false);
        dispatch({
          type: "END_BOOKING_ERROR",
          payload: err.response.data.message,
          status: err.response.status,
        });
        dispatch({ type: "END_BOOKING_RESET" });
      });
  };

export const Upcomings = (querys: {}) => async (dispatch: DriveDispatch) => {
  dispatch({ type: "UPCOMING_START" });
  await api()
    .get(`/Drive/Upcomings`, { params: querys })
    .then((data) => {
      dispatch({
        type: "UPCOMING_SUCCESS",
        payload: data.data.data,
        status: data.status,
      });
      dispatch({ type: "UPCOMING_RESET" });
    })
    .catch((err) => {
      dispatch({
        type: "UPCOMING_ERROR",
        payload: err.response.data.message,
        status: err.response.status,
      });
      dispatch({ type: "UPCOMING_RESET" });
    });
};

export const Pasts = () => async (dispatch: DriveDispatch) => {
  dispatch({ type: "PAST_START" });
  await api()
    .get(`/Drive/Pasts`)
    .then((data) => {
      dispatch({
        type: "PAST_SUCCESS",
        payload: data.data.data,
        status: data.status,
      });
      dispatch({ type: "PAST_RESET" });
    })
    .catch((err) => {
      dispatch({
        type: "PAST_ERROR",
        payload: err.response.data.message,
        status: err.response.status,
      });
      dispatch({ type: "PAST_RESET" });
    });
};

export const singleBooking =
  (bookingId: string | string[]) => async (dispatch: DriveDispatch) => {
    dispatch({ type: "SINGLE_BOOKING_START" });
    await api()
      .get<{ data: { data: DriveDispatch } }>(
        `/Drive/singleBooking/${bookingId}`
      )
      .then((data) => {
        dispatch({
          type: "SINGLE_BOOKING_SUCCESS",
          payload: data.data.data,
          status: data.status,
        });
        dispatch({ type: "SINGLE_BOOKING_RESET" });
      })
      .catch((err) => {
        dispatch({
          type: "SINGLE_BOOKING_ERROR",
          status: err.response.status,
          payload: "Unable to load bookings.",
        });
        dispatch({ type: "SINGLE_BOOKING_RESET" });
      });
  };

export const notifiedRider =
  (
    bookingId: string,
    setIsStart: React.Dispatch<React.SetStateAction<boolean>>
  ) =>
  async (dispatch: DriveDispatch) => {
    dispatch({ type: "NOTIFIED_RIDER_START" });
    await api()
      .get(`/Drive/notifiedRider/${bookingId}`)
      .then((data) => {
        setIsStart(false);
        dispatch({
          type: "NOTIFIED_RIDER_SUCCESS",
          payload: data.data.data,
          success: data.data.message,
          status: data.status,
        });
        dispatch({ type: "NOTIFIED_RIDER_RESET" });
      })
      .catch((err) => {
        setIsStart(false);
        dispatch({
          type: "NOTIFIED_RIDER_ERROR",
          payload: err.response.data.message,
          status: err.response.status,
        });
        dispatch({ type: "NOTIFIED_RIDER_RESET" });
      });
  };

export const checkUpcoming =
  (bookingId: string | string[] | undefined) =>
  async (dispatch: DriveDispatch) => {
    dispatch({ type: "CHECK_UPCOMING_START" });
    await api()
      .get(`/Drive/checkUpcoming/${bookingId}`)
      .then((data) => {
        console.log(data.data);
        dispatch({
          type: "CHECK_UPCOMING_SUCCESS",
          payload: data.data.data,
          status: data.status,
        });
        dispatch({ type: "CHECK_UPCOMING_RESET" });
      })
      .catch((err) => {
        dispatch({
          type: "CHECK_UPCOMING_ERROR",
          payload: err.response.data.message,
          status: err.response.status,
        });
        dispatch({ type: "CHECK_UPCOMING_RESET" });
      });
  };

export const chargingForWait =
  (
    bookingId: string | string[] | undefined,
    setIsStart: React.Dispatch<React.SetStateAction<boolean>>,
    router: NextRouter
  ) =>
  async (dispatch: DriveDispatch) => {
    dispatch({ type: "CHARGING_FOR_WAIT_START" });
    await api()
      .get(`/Drive/chargingForWait/${bookingId}`)
      .then((data) => {
        setIsStart(false);
        dispatch({
          type: "CHARGING_FOR_WAIT_SUCCESS",
          payload: data.data.data,
          success: data.data.message,
          status: data.status,
        });
        dispatch({ type: "CHARGING_FOR_WAIT_RESET" });
        router.push(`/charging/${bookingId}`);
      })
      .catch((err) => {
        setIsStart(false);
        dispatch({
          type: "CHARGING_FOR_WAIT_ERROR",
          payload: err.response.data.message,
          status: err.response.status,
        });
        dispatch({ type: "CHARGING_FOR_WAIT_RESET" });
      });
  };

export const confirmedBooking =
  (bookingId: string | string[] | undefined) =>
  async (dispatch: DriveDispatch) => {
    dispatch({ type: "CONFIRMED_BOOKING_START" });
    await api()
      .get(`/Drive/confirmedBooking/${bookingId}`)
      .then((data) => {
        dispatch({
          type: "CONFIRMED_BOOKING_SUCCESS",
          success: data.data.message,
          payload: data.data.data,
          status: data.status,
        });
        dispatch({ type: "CONFIRMED_BOOKING_RESET" });
      })
      .catch((err) => {
        dispatch({
          type: "CONFIRMED_BOOKING_ERROR",
          payload: err.response.data.message,
          status: err.response.status,
        });
        dispatch({ type: "CONFIRMED_BOOKING_RESET" });
      });
  };
export const startDriveForCharging =
  (
    bookingId: string | string[] | undefined,
    setIsStart: React.Dispatch<React.SetStateAction<boolean>>,
    router: NextRouter
  ) =>
  async (dispatch: DriveDispatch) => {
    dispatch({ type: "START_DRIVE_FOR_CHARGING_START" });
    await api()
      .get(`/Drive/startDriveForCharging/${bookingId}`)
      .then((data) => {
        setIsStart(false);
        dispatch({
          type: "START_DRIVE_FOR_CHARGING_SUCCESS",
          payload: data.data.data,
          success: data.data.message,
          status: data.status,
        });
        dispatch({ type: "CONFIRMED_BOOKING_RESET" });
        router.push(`/drive/${bookingId}`);
      })
      .catch((err) => {
        setIsStart(false);
        dispatch({
          type: "START_DRIVE_FOR_CHARGING_ERROR",
          payload: err.response.data.message,
          status: err.response.status,
        });
        dispatch({ type: "START_DRIVE_FOR_CHARGING_RESET" });
      });
  };

export const confirmStop =
  (
    bookingId: string | string[] | undefined,
    setIsStart: React.Dispatch<React.SetStateAction<boolean>>,
    stop: string,
    router: NextRouter
  ) =>
  async (dispatch: DriveDispatch) => {
    dispatch({ type: "CONFIRM_STOP_START" });
    await api()
      .get(`/Drive/confirmStop/${bookingId}`, { params: { stop } })
      .then((data) => {
        setIsStart(false);
        dispatch({
          type: "CONFIRM_STOP_SUCCESS",
          payload: data.data.data,
          // success: data.data.message,
          status: data.status,
        });
        dispatch({ type: "CONFIRM_STOP_RESET" });
        router.reload();
      })
      .catch((err) => {
        setIsStart(false);
        dispatch({
          type: "CONFIRM_STOP_ERROR",
          payload: err.response.data.message,
          status: err.response.status,
        });
        dispatch({ type: "CONFIRM_STOP_RESET" });
      });
  };

export const startStop =
  (
    bookingId: string | string[] | undefined,
    setIsStart: React.Dispatch<React.SetStateAction<boolean>>,
    stop: string,
    router: NextRouter
  ) =>
  async (dispatch: DriveDispatch) => {
    dispatch({ type: "START_STOP_START" });
    await api()
      .get(`/Drive/startStop/${bookingId}`, { params: { stop } })
      .then((data) => {
        setIsStart(false);
        dispatch({
          type: "START_STOP_SUCCESS",
          payload: data.data.data,
          success: data.data.message,
          status: data.status,
        });
        dispatch({ type: "START_STOP_RESET" });
        router.reload();
      })
      .catch((err) => {
        setIsStart(false);
        dispatch({
          type: "START_STOP_ERROR",
          payload: err.response.data.message,
          status: err.response.status,
        });
        dispatch({ type: "START_STOP_RESET" });
      });
  };

export const changedDate =
  (form: any, bookingId: string, reason: string) =>
  async (dispatch: DriveDispatch) => {
    dispatch({ type: "CHANGE_DATE_START" });

    const Time = `${defaultHour(Number(form?.hour))[0].hour}:${form?.minute}${
      defaultHour(Number(form?.hour))[0].hourType
    }`;
    const atIso = new Date(
      `${form?.atDate} ${form?.hour}:${form?.minute}:00`
    ).getTime();
    await api()
      .post(`/Drive/changedDate/${bookingId}`, {
        Time,
        atIso,
        Date: form.Date,
        atDate: form.atDate,
        reason,
      })
      .then((data) => {
        dispatch({
          type: "CHANGE_DATE_SUCCESS",
          success: data.data.message,
          payload: data.data.data,
          status: data.status,
        });
        dispatch({ type: "CHANGE_DATE_RESET" });
      })
      .catch((err) => {
        dispatch({
          type: "CHANGE_DATE_ERROR",
          payload: err.response.data.message,
          status: err.response.status,
        });
        dispatch({ type: "CHANGE_DATE_RESET" });
      });
  };
