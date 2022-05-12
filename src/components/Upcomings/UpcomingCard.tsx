import ModalScreen from "@components/ModalScreen";
import Spinners from "@components/Spinners";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";

import { useDispatch } from "react-redux";
import {
  changedDate,
  confirmedBooking,
  notifiedRider,
} from "store/actions/driverAction";
import Select from "react-select";
import {
  defaultHour,
  defaultMinute,
  Hour,
  time,
} from "@utils/lib/listElements";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import "react-nice-dates/build/style.css";
import { enUS } from "date-fns/locale";
import moment from "moment";
import { useOnClickOutside } from "@utils/hooks/useOnClickOutside";
import TimeInput from "./TimeInput";
import { Error } from "@utils/lib/Messages";
import api from "@utils/lib/api";
interface IUpcomingCard {
  pickup: string;
  dropOff: string;
  pickupPlaceId: string;
  dropOffPlaceId: string;
  date: string;
  Time: string;
  fullName: any;
  vehicleClass: string;
  phoneNumber: any;
  duration: string;
  uuid: string;
  status: string;
  atIso: number;
  stops: [{ title: string; placeId: string }];
}

const UpcomingCard: React.FC<IUpcomingCard> = ({
  pickup,
  dropOff,
  pickupPlaceId,
  dropOffPlaceId,
  fullName,
  phoneNumber,
  date,
  Time,
  vehicleClass,
  duration,
  uuid,
  status,
  atIso,
  stops,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isStart, setIsStart] = useState<boolean>(false);
  const [pathname, setPathmane] = useState<string>("");
  const [onFocus, setOnFocus] = useState<boolean>(false);
  const [isModal, setIsModal] = useState(false);
  const [reason, setReason] = useState("");
  const [form, setForm] = useState({
    Date: moment(new Date()).format("ddd, MMM D YYYY"),
    atDate: moment(new Date()).format("L"),
    hour: new Date().getHours(),
    minute: Math.ceil(new Date().getMinutes() / 5) * 5,
    formatDate: new Date(atIso),
  });
  const dateRef = useRef<any>();
  useEffect(() => {
    if (pathname) {
      router.prefetch(pathname);
      router.replace(pathname);
    }
  }, [pathname]);
  useEffect(() => {
    const popover = document.querySelector(".nice-dates-popover");
    const reactDatePicker = document.getElementById("react-date-picker");
    reactDatePicker?.addEventListener("focus", () => {
      setOnFocus(true);
    });
    window.addEventListener("click", (e: any) => {
      if (e.target.id != "react-date-picker") setOnFocus(false);
    });

    if (!onFocus) {
      popover?.classList.add("hidden");
    } else {
      popover?.classList.remove("hidden");
    }
  }, [onFocus]);
  useOnClickOutside(dateRef, () => setOnFocus(false));

  return (
    <div className="border-b py-2 px-4 flex flex-col">
      <div className="mb-2">
        <div className="text-green-400 font-semibold mb-1">Pickup</div>
        <div className=" flex">
          <div className="w-6">
            <FontAwesomeIcon icon="map-marker-alt" className="text-gray-400" />
          </div>
          <span
            onClick={() => {
              window.location.replace(
                `https://www.google.com/maps/dir/?api=1&destination=${pickup}&travelmode=driving`
              );
            }}
          >
            {pickup}
          </span>
        </div>
      </div>
      <div className="mb-2">
        <div className="text-red-400 font-semibold mb-1">Drop Off</div>
        <div className="flex">
          <div className="w-6">
            <FontAwesomeIcon icon="map-marker-alt" className="text-gray-400" />
          </div>
          <span>{dropOff}</span>
        </div>
      </div>
      <div className="mb-2">
        <div className="text-indigo-400 font-semibold mb-1">Booking Date</div>
        <div className="flex">
          <div className="w-6">
            <FontAwesomeIcon icon="clock" className="text-gray-400" />
          </div>
          <span>
            {date} - {Time}
          </span>
        </div>
      </div>
      <div className="mb-2">
        <div className="text-black font-semibold mb-1">Vehicle Class</div>
        <div className="flex">
          <div className="w-6">
            <FontAwesomeIcon icon="car" className="text-gray-400" />
          </div>
          <span>{vehicleClass}</span>
        </div>
      </div>
      <div className="mb-2">
        <div className="text-indigo-400 font-semibold mb-1">Duration</div>
        <div className="flex">
          <div className="w-6">
            <FontAwesomeIcon icon="road" className="text-gray-400" />
          </div>
          <span>{duration}</span>
        </div>
      </div>
      <div className="mb-2">
        <div className="text-indigo-400 font-semibold mb-1">Booking Owner</div>
        <div className="flex">
          <div className="w-6">
            <FontAwesomeIcon icon="user" className="text-gray-400" />
          </div>
          <span>{fullName}</span>
        </div>
      </div>
      <div className="">
        <div className="text-indigo-400 font-semibold mb-1">
          Booking Owner Phone Number
        </div>
        <div className="flex" onClick={() => window.open(`sms:${phoneNumber}`)}>
          <div className="w-6">
            <FontAwesomeIcon icon="user" className="text-gray-400" />
          </div>
          <span>{phoneNumber}</span>
        </div>
      </div>
      {stops?.length ? (
        <>
          {stops?.map((item, index) => {
            return (
              <div key={index}>
                <div className="text-yellow-400 font-semibold mb-1">
                  Stop {index + 1}
                </div>
                <div className="flex">
                  <div className="w-6">
                    <FontAwesomeIcon icon="road" className="text-gray-400" />
                  </div>
                  <span>{item.title}</span>
                </div>
              </div>
            );
          })}
        </>
      ) : null}
      <div className="mt-4">
        {isStart ? (
          <div className="flex items-center justify-center">
            <Spinners type="TailSpin" w={40} h={40} />
          </div>
        ) : (
          <>
            {status === "charging" ? (
              <button
                onClick={() => {
                  setPathmane(`/charging/${uuid}`);
                  setIsStart(true);
                }}
                className="h-10 bg-green-500 border-green-500 border text-xl w-full rounded text-white"
              >
                Go Charging
              </button>
            ) : status === "notified" ? (
              <button
                onClick={() => {
                  setPathmane(`/notified/${uuid}`);
                }}
                className="h-10 bg-blue-500 border-blue-500 border text-xl w-full rounded text-white"
              >
                Go Notified
              </button>
            ) : status === "active" ? (
              <button
                onClick={() => {
                  setPathmane(`/active/${uuid}`);
                  setIsStart(true);
                }}
                className="h-10 bg-green-500 border-green-500 border text-xl w-full rounded text-white"
              >
                Go Active Drive
              </button>
            ) : status === "confirmed" || status === "changed" ? (
              <button
                onClick={() => {
                  setPathmane(`/notified/${uuid}`);
                  setIsStart(true);
                  dispatch(notifiedRider(uuid, setIsStart));
                }}
                className="h-10 bg-blue-500 border-blue-500 border text-xl w-full rounded text-white"
              >
                Notified Rider
              </button>
            ) : status === "drive" ? (
              <button
                onClick={() => {
                  setPathmane(`/drive/${uuid}`);
                  setIsStart(true);
                }}
                className="h-10 bg-green-500 border-green-500 border text-xl w-full rounded text-white"
              >
                Go Drive for charging
              </button>
            ) : (
              <>
                <button
                  onClick={() => {
                    dispatch(confirmedBooking(uuid));
                  }}
                  className="h-10 mb-2 bg-green-500 border-green-500 border text-xl w-full rounded text-white"
                >
                  Confirmed Trip
                </button>
                <button
                  onClick={async () => {
                    await api()
                      .get<any>(`/Booking/canceledBooking/${uuid}`, {
                        params: { pathname: "/bookings/upcoming" },
                      })
                      .then((data) => {
                        window.location.reload();
                      })
                      .catch((err) => {});
                  }}
                  className="h-10 bg-red-500 border-red-500 border text-xl w-full rounded text-white"
                >
                  Cancel Trip
                </button>
              </>
            )}
          </>
        )}
      </div>
      <ModalScreen isOpen={isModal} onRequestClose={() => setIsModal(false)}>
        <div className="flex  justify-between flex-col md:flex-row">
          <div
            className={`relative  rounded bg-primary-dropdownMenuHover mb-4`}
          >
            <label className="mt-8 ml-11 font-semibold text-blue-500">
              Date
            </label>
            <DatePicker
              selected={form?.formatDate}
              onFocus={() => {
                setOnFocus(true);
              }}
              onChange={(date: any) => {
                setForm({
                  ...form,
                  Date: moment(date).format("ddd, MMM D YYYY"),
                  atDate: moment(date).format("L"),
                  formatDate: new Date(date),
                });
              }}
              className="w-full h-full  py-2 px-11 rounded bg-primary-dropdownMenuHover focus:outline-none"
              minDate={new Date()}
              dateFormat="dd MMM yyyy"
            />

            <FontAwesomeIcon
              icon="calendar"
              className="cursor-pointer text-gray-400 absolute text-xl"
              style={{ left: "10px", top: "50%" }}
            />
          </div>

          <div className="relative rounded mb-4 bg-primary-dropdownMenuHover">
            <label className="mt-8 ml-11 font-semibold text-blue-500">
              Time
            </label>
            <div className="w-full  py-2 px-11 rounded bg-primary-dropdownMenuHover focus:outline-none">
              <div className="flex items-center">
                <TimeInput
                  name="hour"
                  options={Hour}
                  defaultValue={defaultHour(new Date().getHours())[0]}
                  setForm={setForm}
                  form={form}
                  menuPlacement={"top"}
                />
                <TimeInput
                  name="minute"
                  options={time}
                  defaultValue={
                    defaultMinute(Math.ceil(new Date().getMinutes() / 5) * 5)[0]
                  }
                  setForm={setForm}
                  form={form}
                  menuPlacement={"top"}
                />
              </div>
            </div>
            <FontAwesomeIcon
              icon="clock"
              className="cursor-pointer text-gray-400 absolute text-xl"
              style={{ left: "10px", top: "50%" }}
            />
          </div>
        </div>

        <div className="mb-2 mx-7 md:mx-12 flex justify-end items-center h-8">
          <button
            onClick={() => {
              setIsModal(false);
            }}
            className=" h-full px-3 rounded-xl border  mr-4"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              dispatch(changedDate(form, uuid, reason));
            }}
            className="bg-green-500 h-full px-3 rounded-xl text-white "
          >
            Changed
          </button>
        </div>
      </ModalScreen>
    </div>
  );
};

export default UpcomingCard;
