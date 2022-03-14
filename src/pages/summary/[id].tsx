import Spinners from "@components/Spinners";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "store";
import Link from "next/link";
import { Error } from "@utils/lib/Messages";
import { singleBooking } from "store/actions/driverAction";
import CurrencyFormat from "react-currency-format";
import SingleCard from "@components/Summary/SingleCard";
import moment from "moment";

const SingleMain: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { loading, Drive, status } = useSelector(
    (state: AppState) => state.drive
  );
  useEffect(() => {
    if (router?.isReady)
      if (router?.query?.id) dispatch(singleBooking(router?.query?.id));
  }, [router?.query?.id]);
  useEffect(() => {
    if (status === 404) router.push(router.pathname.replace("/[id]", ""));
    if (status === 400) {
      Error(
        "There was a server-based problem updating the reservation, please try again later"
      );
    }
  }, [router, status]);
  const difference = Math.floor(
    moment
      .duration(
        moment(
          moment(Drive?.endCharging).format("HH:mm:ss"),
          "HH:mm:ss a"
        ).diff(
          moment(moment(Drive?.startCharging).format("HH:mm:ss"), "HH:mm:ss a")
        )
      )
      .asMinutes()
  );
  return (
    <>
      {loading ? (
        <div className="w-full flex items-center justify-center my-24">
          <Spinners type={"TailSpin"} w={80} h={80} />
        </div>
      ) : (
        <div className="px-4">
          <div className="mt-6 flex">
            <Link href={router.pathname.replace("/[id]", "")}>
              <a className="mb-2">
                <FontAwesomeIcon icon="arrow-left" className="text-2xl" />
              </a>
            </Link>
          </div>
          <div className="my-6">
            <div>
              <div className="border-b border-primary-bookingsBorder pb-2 flex items-center justify-between">
                <h1 className="text-2xl font-semibold ">Booking Information</h1>
                <span
                  className={`text-xl  ${
                    Drive?.rides === "Upcoming"
                      ? "text-green-500"
                      : Drive?.rides === "Past"
                      ? "text-black"
                      : "text-red-500"
                  }`}
                >
                  {Drive?.rides}
                </span>
              </div>
              <div className="grid lg:grid-cols-6  grid-rows-6 lg:grid-rows-none lg:gap-4 lg:mb-4 gap-2 mt-4  pb-4">
                <SingleCard
                  icon={"map-marker-alt"}
                  color={"text-green-500"}
                  title={"From"}
                  value={Drive?.pickup}
                />
                <SingleCard
                  icon={"map-marker-alt"}
                  color={"text-red-500"}
                  title={"Drop Off"}
                  value={Drive?.dropOff}
                />
                <SingleCard
                  icon={"clock"}
                  color={"text-blue-500"}
                  title={"Date"}
                  value={`${Drive?.Date} - ${Drive?.Time}`}
                />
                <SingleCard
                  icon={"car"}
                  color={"text-black"}
                  title={"Vehicle Class"}
                  value={Drive?.vehicleClass}
                />
                <SingleCard
                  icon={"road"}
                  color={"text-blue-500"}
                  title={"Duration"}
                  value={Drive?.duration}
                />
                <SingleCard
                  icon={"rocket"}
                  color={"text-blue-500"}
                  title={"Status"}
                  value={Drive?.status}
                />

                {Drive?.totalBookingTime ? (
                  <SingleCard
                    icon={"clock"}
                    color={"text-red-500"}
                    title={"Total Booking Time"}
                    value={
                      Drive?.totalBookingTime <= 60
                        ? Math.abs(
                            Math.floor(Drive?.totalBookingTime / 60) * 60 -
                              Drive?.totalBookingTime
                          ) + " Mins"
                        : Math.floor(Drive?.totalBookingTime / 60) +
                          " Hours " +
                          Math.abs(
                            Math.floor(Drive?.totalBookingTime / 60) * 60 -
                              Drive?.totalBookingTime
                          ) +
                          " Mins"
                    }
                  />
                ) : null}
                {difference ? (
                  <SingleCard
                    icon={"rocket"}
                    color={"text-red-500"}
                    title={"Additional Wait Time"}
                    value={
                      difference <= 60
                        ? Math.abs(
                            Math.floor(difference / 60) * 60 - difference
                          ) + " Mins"
                        : Math.floor(difference / 60) +
                          " Hours " +
                          Math.abs(
                            Math.floor(difference / 60) * 60 - difference
                          ) +
                          " Mins"
                    }
                  />
                ) : null}
                {Drive?.stops?.reduce(
                  (total: number, item: { pay: number }) => {
                    return total + item.pay / 1.1;
                  },
                  0
                ) ? (
                  <SingleCard
                    icon={"clock"}
                    color={"text-red-500"}
                    title={"Stops Wait Time"}
                    value={Drive?.stops?.reduce(
                      (total: number, item: { pay: number }) => {
                        return total + item.pay / 1.1;
                      },
                      0
                    )}
                  />
                ) : null}
              </div>
            </div>
            {Drive?.options?.length > 0 ||
            Drive?.bookingName?.length > 0 ||
            Drive?.stop > 0 ? (
              <div>
                <div className="border-b border-primary-bookingsBorder pb-2">
                  <h1 className="text-2xl font-semibold ">Options</h1>
                </div>
                <div className="w-full flex flex-col lg:flex-row justify-between  tlg:mb-4 gap-2 mt-4 pb-4">
                  {Drive?.options && (
                    <SingleCard
                      icon={"sticky-note"}
                      color={"text-indigo-500"}
                      title={"Note"}
                      value={Drive?.options}
                    />
                  )}
                  {Drive?.bookingName && (
                    <SingleCard
                      icon={"bookmark"}
                      color={"text-indigo-500"}
                      title={"Booking Name"}
                      value={Drive?.bookingName}
                    />
                  )}
                </div>
              </div>
            ) : null}
            {Drive?.stops?.length ? (
              <>
                {Drive?.stops?.map((item: { title: string }, index: number) => {
                  return (
                    <SingleCard
                      key={index}
                      icon={"road"}
                      color={"text-blue-500"}
                      title={`Stop ${index + 1}`}
                      value={item.title}
                    />
                  );
                })}
              </>
            ) : null}
            <div>
              <div className="border-b border-primary-bookingsBorder pb-2">
                <h1 className="text-2xl font-semibold">Totals</h1>
              </div>
              <div className="lg:mb-4  mt-4  pb-4">
                {Drive?.priceList?.map(
                  (items: { pay: number; title: string }, index: number) => {
                    return (
                      <>
                        {items.pay > 0 && (
                          <div
                            className="flex justify-between w-full items-center border-b p-4"
                            key={index}
                          >
                            <div className="flex flex-col">
                              <span>{items.title}</span>
                              {items.title === "Minute" ? (
                                <>
                                  {Drive?.mi <= 20 ? (
                                    <span className="text-gray-400">
                                      {Drive?.matrixMinute} min x $2/min
                                      (rounding applied)
                                    </span>
                                  ) : (
                                    <span className="text-gray-400">
                                      {Drive?.matrixMinute} min x $1.1/min
                                      (rounding applied)
                                    </span>
                                  )}
                                </>
                              ) : items.title === "Mil" ? (
                                <span className="text-gray-400">
                                  {Drive?.mi} mi x $3.2/mi (rounding applied)
                                </span>
                              ) : items.title ===
                                "Additional wait time (after 5 minutes)" ? (
                                <span className="text-gray-400">
                                  {moment
                                    .duration(
                                      moment(
                                        moment(Drive?.endCharging).format(
                                          "HH:mm:ss"
                                        ),
                                        "HH:mm:ss a"
                                      ).diff(
                                        moment(
                                          moment(Drive?.startCharging).format(
                                            "HH:mm:ss"
                                          ),
                                          "HH:mm:ss a"
                                        )
                                      )
                                    )
                                    .asMinutes()
                                    .toFixed(2)}
                                  &nbsp;min x $1.1/min (rounding applied)
                                </span>
                              ) : items.title === "Tools" ? (
                                <span className="text-gray-400">
                                  Airport Surcharge
                                </span>
                              ) : items.title ===
                                "Additional wait time for per minute Stops" ? (
                                <span className="text-gray-400">
                                  {Drive?.stops?.reduce(
                                    (total: number, item: { pay: number }) => {
                                      return total + item.pay / 1.1;
                                    },
                                    0
                                  )}
                                  &nbsp;min x $1.1/min (rounding applied)
                                </span>
                              ) : null}
                            </div>
                            <span className="ml-3">
                              <CurrencyFormat
                                value={items.pay.toFixed(2)}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"$"}
                              />
                            </span>
                          </div>
                        )}
                      </>
                    );
                  }
                )}
                <div className="flex justify-between w-full items-center  p-4">
                  <span className="font-semibold">Total</span>
                  <span className="ml-3 font-semibold">
                    <CurrencyFormat
                      value={Drive?.totalPrice?.toFixed(2)}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleMain;
