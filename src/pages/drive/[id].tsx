import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";
import { useRouter } from "next/router";
import { chargingForWait } from "store/actions/driverAction";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "store";
import Spinners from "@components/Spinners";
import { Error } from "@utils/lib/Messages";
import DriveLayout from "@components/DriveLayout";
import api from "@utils/lib/api";
import UserInfo from "@components/Upcomings/UserInfo";
import withAuth from "@utils/hooks/withAuth";

const Completionist: React.FC<{ completed: boolean }> = ({ completed }) => {
  const router = useRouter();
  const { Drive } = useSelector((state: AppState) => state.drive);
  useEffect(() => {
    const chargingForWaitCompleted = async () => {
      await api()
        .get(`/Drive/chargingForWait/${router?.query?.id}`)
        .then(() => {
          router.push(`/charging/${router?.query?.id}`);
        })
        .catch((err) => {
          Error(err.response.data.message);
        });
    };
    if (completed) {
      if (router?.query?.id) {
        if (Drive?.status === "drive") {
          chargingForWaitCompleted();
        } else {
          router.push(`/charging/${router?.query?.id}`);
        }
      }
    }
  }, [completed, Drive?.status]);
  return (
    <>
      {completed ? (
        <span>The driver is already charging</span>
      ) : (
        <span>Yet drive for charging starting</span>
      )}
    </>
  );
};

// Renderer callback with condition
const renderer: React.FC<{
  minutes: number;
  seconds: number;
  completed: boolean;
}> = ({ minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
    return <Completionist completed={completed} />;
  } else {
    // Render a countdown
    return (
      <span className="flex items-center justify-center text-green-500 rounded-full px-4 border border-black">
        {minutes}:{seconds}
      </span>
    );
  }
};
const rider = () => {
  const [isStart, setIsStart] = useState<boolean>(false);
  const [startRider, setStartRider] = useState(false);

  const router = useRouter();
  const { loading, Drive } = useSelector((state: AppState) => state.drive);
  const dispatch = useDispatch();
  useEffect(() => {
    if (Drive?.startRider) setStartRider(true);
  }, [Drive?.startRider]);

  useEffect(() => {
    if (router?.query) router.prefetch(`/charging/${router?.query?.id}`);
  }, [router]);
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
        <h1 className="text-xl font-semibold">Starting for drive charging</h1>
        <div>
          {startRider && (
            <Countdown date={Drive?.startRider} renderer={renderer} />
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
                router.push(`/charging/${Drive?.uuid}`);
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
                dispatch(chargingForWait(Drive?.uuid, setIsStart, router));
              }
            }}
            disabled={loading}
            className="h-10 bg-green-500 border-green-500 border text-xl w-full rounded text-white"
          >
            {Drive?.status === "charging"
              ? "Go to Charging"
              : Drive?.status === "notified"
              ? "Go to Notified"
              : Drive?.status === "active"
              ? "Go to Active"
              : Drive?.status === "confirmed" || Drive?.status === "changed"
              ? "Go to Upcoming"
              : "Start for rider"}
          </button>
        )}
      </div>
    </DriveLayout>
  );
};

export default withAuth(rider);
