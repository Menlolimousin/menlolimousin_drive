import Spinners from "@components/Spinners";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "store";
import { startDriveForCharging } from "store/actions/driverAction";

import DriveLayout from "@components/DriveLayout";
import { useRouter } from "next/router";
import UserInfo from "@components/Upcomings/UserInfo";
import withAuth from "@utils/hooks/withAuth";
import { Error } from "@utils/lib/Messages";
import api from "@utils/lib/api";

const notified = () => {
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
      <div className="py-2 px-4 bg-white border rounded-t-xl border-t flex-1 h-full flex flex-col justify-between items-center">
        <h1 className="text-xl font-semibold">Rider Notified</h1>
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
                router.push(`/charging/${Drive?.uuid}`);
              } else if (Drive?.status === "notified") {
                dispatch(
                  startDriveForCharging(Drive?.uuid, setIsStart, router)
                );
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
              ? "Go to Charging"
              : Drive?.status === "notified"
              ? "Start Drive for"
              : Drive?.status === "active"
              ? "Go to Active"
              : Drive?.status === "confirmed" || Drive?.status === "changed"
              ? "Go to Upcoming"
              : "Go to Drive"}
          </button>
        )}
      </div>
    </DriveLayout>
  );
};

export default withAuth(notified);
