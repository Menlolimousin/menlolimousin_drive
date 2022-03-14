import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "store";
import api from "@utils/lib/api";
import Spinners from "@components/Spinners";
import DriveLayout from "@components/DriveLayout";
import { confirmStop, endBooking, startStop } from "store/actions/driverAction";
import { useRouter } from "next/router";
import { Error } from "@utils/lib/Messages";
import UserInfo from "@components/Upcomings/UserInfo";

import withAuth from "@utils/hooks/withAuth";
import Timer from "@components/Timer";
import moment from "moment";

const activedrive = () => {
  const [isStart, setIsStart] = useState<boolean>(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const [duration, setDuration] = useState("");
  const [asTimer, setAsTimer] = useState(0);

  const { loading, Drive, error } = useSelector(
    (state: AppState) => state.drive
  );
  const filterStops = Drive?.stops?.filter((item: { isConfirm: boolean }) => {
    return !item.isConfirm;
  });
  useEffect(() => {
    router.prefetch("/upcomings");
  }, []);

  const filterStopsTrue = Drive?.stops?.filter(
    (item: { isConfirm: boolean }) => {
      return item.isConfirm;
    }
  );
  const filterSort = filterStopsTrue?.sort(
    (a: { isConfirmTime: number }, b: { isConfirmTime: number }) => {
      return b.isConfirmTime - a.isConfirmTime;
    }
  );
  useEffect(() => {
    if (filterStops?.[0]?.isStartConfirmTime) {
      setAsTimer(
        moment
          .duration(
            moment(moment().format("HH:mm:ss"), "HH:mm:ss a").diff(
              moment(
                moment(filterStops?.[0].isStartConfirmTime).format("HH:mm:ss"),
                "HH:mm:ss a"
              )
            )
          )
          .asSeconds()
      );
    } else if (!filterStops?.length) {
      setAsTimer(
        moment
          .duration(
            moment(moment().format("HH:mm:ss"), "HH:mm:ss a").diff(
              moment(
                moment(Drive?.startBookingTime).format("HH:mm:ss"),
                "HH:mm:ss a"
              )
            )
          )
          .asSeconds()
      );
    }
  }, [filterStops?.[0]?.isStartConfirmTime, Drive]);
  useEffect(() => {
    const distanceMatrix = async (pickUpId: string, dropOffId: string) => {
      return await api()
        .get("/Location/geocode", {
          params: {
            pickUpId,
            dropOffId,
          },
        })
        .then((data) => {
          console.log(data.data);
          return data.data.results;
        })
        .catch((err) => {
          Error(err.response.data.message);
        });
    };

    if (
      (filterSort?.[0]?.placeId || Drive?.pickupPlaceId) &&
      (filterStops?.[0]?.placeId || Drive?.dropOffPlaceId)
    ) {
      distanceMatrix(
        filterSort?.[0]?.placeId || Drive?.pickupPlaceId,
        filterStops?.[0]?.placeId || Drive?.dropOffPlaceId
      ).then((data) => setDuration(data?.distanceMatrix?.duration));
    }
  }, [Drive?.pickupPlaceId, filterStops?.[0]?.placeId]);
  useEffect(() => {
    if (error)
      if (error === "You cannot re-finish a past booking.")
        router.push("/upcomings");
  }, [error]);

  return (
    <DriveLayout
      location={filterStops?.[0]?.title || Drive?.dropOff}
      Drive={Drive}
      loading={loading}
    >
      <div className="py-2 px-4 bg-white border rounded-t-xl border-t flex-1 h-full flex flex-col justify-between items-center">
        {duration || Drive?.duration ? (
          <div className="mb-2">
            <h1 className="text-xl">{duration || Drive?.duration}</h1>
          </div>
        ) : null}
        {asTimer > 0 && (
          <>
            <Timer asTimer={asTimer} />
            <button onClick={() => window.location.reload()}>
              If the counter is broken click me
            </button>
          </>
        )}

        <UserInfo phoneNumber={Drive?.owner?.phoneNumber} />
        {isStart ? (
          <div className="flex items-center justify-center">
            <Spinners type="TailSpin" w={40} h={40} />
          </div>
        ) : (
          <>
            {filterStops?.length > 0 ? (
              <button
                onClick={async () => {
                  setIsStart(true);
                  if (filterStops?.[0]?.isStartConfirmTime) {
                    dispatch(
                      confirmStop(
                        Drive?.uuid,
                        setIsStart,
                        filterStops?.[0]?.title,
                        router
                      )
                    );
                  } else {
                    dispatch(
                      startStop(
                        Drive?.uuid,
                        setIsStart,
                        filterStops?.[0]?.title,
                        router
                      )
                    );
                  }
                }}
                disabled={loading}
                type="submit"
                className={`h-10 ${
                  filterStops?.[0]?.isStartConfirmTime
                    ? "bg-blue-500 border-blue-500"
                    : "bg-green-500 border-green-500"
                } border text-xl w-full rounded text-white`}
              >
                {filterStops?.[0]?.isStartConfirmTime
                  ? "Confirm Stop"
                  : "Start Stop"}
              </button>
            ) : (
              <button
                onClick={async () => {
                  setIsStart(true);
                  dispatch(endBooking(Drive?.uuid, setIsStart));

                  router.push("/upcomings");
                }}
                disabled={loading}
                className={`h-10 bg-red-500 border-red-500 border text-xl w-full rounded text-white`}
              >
                Complete Booking
              </button>
            )}
          </>
        )}
      </div>
    </DriveLayout>
  );
};

export default withAuth(activedrive);
