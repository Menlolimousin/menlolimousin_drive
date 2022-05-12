import React, { useState } from "react";
import { startBooking } from "store/actions/driverAction";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "store";
import Spinners from "@components/Spinners";
import DriveLayout from "@components/DriveLayout";
import { useRouter } from "next/router";
import UserInfo from "@components/Upcomings/UserInfo";
import Timer from "@components/Timer";
import moment from "moment";
import withAuth from "@utils/hooks/withAuth";

const charging = () => {
  const [isStart, setIsStart] = useState<boolean>(false);

  const router = useRouter();
  const { loading, Drive } = useSelector((state: AppState) => state.drive);
  const dispatch = useDispatch();
  const filterStops = Drive?.stops?.filter((item: { isConfirm: boolean }) => {
    return !item.isConfirm;
  });
  return (
    <DriveLayout
      location={filterStops?.[0]?.title || Drive?.dropOff}
      Drive={Drive}
      loading={loading}
    >
      <div className="py-2 px-4 bg-white border rounded-t-xl border-t flex-1 h-full flex flex-col items-center">
        <div className="mb-2">
          <h1 className="text-xl font-semibold">
            Charging rider for wait time
          </h1>
          {Drive?.status !== "active" ? (
            <>
              <div className="flex items-center justify-center">
                {Drive?.startCharging && (
                  <Timer
                    asTimer={moment
                      .duration(
                        moment(moment().format("HH:mm:ss"), "HH:mm:ss a").diff(
                          moment(
                            moment(Drive?.startCharging).format("HH:mm:ss"),
                            "HH:mm:ss a"
                          )
                        )
                      )
                      .asSeconds()}
                  />
                )}
              </div>
              <button
                onClick={() => window.location.reload()}
                className="text-cente w-full"
              >
                If the counter is broken click me
              </button>
            </>
          ) : (
            <span>Daha önceden başlamış</span>
          )}
        </div>
        <UserInfo phoneNumber={Drive?.owner?.phoneNumber} />

        {isStart ? (
          <div className="flex items-center justify-center">
            <Spinners type="TailSpin" w={40} h={40} />
          </div>
        ) : (
          <button
            onClick={() => {
              setIsStart(true);
              if (Drive?.status === "charging") {
                dispatch(startBooking(Drive?.uuid, setIsStart, router));
              } else if (Drive?.status === "notified") {
                router.push(`/notified/${Drive?.uuid}`);
              } else if (Drive?.status === "active") {
                router.push(`/active/${Drive?.uuid}`);
              } else if (
                Drive?.status === "confirmed" ||
                Drive?.status === "changed"
              ) {
                router.push("/upcomings");
              } else if (Drive?.status === "drive") {
                router.push(`/drive/${Drive?.uuid}`);
              }
            }}
            disabled={loading}
            className="h-10 bg-green-500 border-green-500 border text-xl w-full rounded text-white"
          >
            {Drive?.status === "charging"
              ? "Start Trip"
              : Drive?.status === "notified"
              ? "Go to Notified"
              : Drive?.status === "active"
              ? "Go to Active"
              : Drive?.status === "confirmed" || Drive?.status === "changed"
              ? "Go to Upcoming"
              : "Go to drive"}
          </button>
        )}
      </div>
    </DriveLayout>
  );
};

export default withAuth(charging);
