import UpcomingCard from "@components/Upcomings/UpcomingCard";
import Spinners from "@components/Spinners";
import withAuth from "@utils/hooks/withAuth";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "store";
import { Pasts, Upcomings } from "store/actions/driverAction";
import { IDrives } from "types/drive";
import SummaryCard from "@components/Summary/SummaryCard";

const upcoming = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { Drives, loading } = useSelector((state: AppState) => state.drive);
  useEffect(() => {
    if (router.isReady) dispatch(Pasts());
  }, [router]);

  return (
    <section className="p-4 min-h-screen">
      {loading ? (
        <div className="flex items-center justify-center">
          <Spinners type="TailSpin" w={80} h={80} />
        </div>
      ) : (
        <>
          {Drives?.length > 0 ? (
            <>
              {Drives?.map((item: IDrives, index: number) => {
                return (
                  <div className="mb-4" key={index}>
                    <SummaryCard
                      pickup={item.pickup}
                      dropOff={item.dropOff}
                      date={item.Date}
                      Time={item.Time}
                      vehicleClass={item.vehicleClass}
                      duration={item.duration}
                      uuid={item.uuid}
                      status={item.status}
                      stops={item.stops}
                    />
                  </div>
                );
              })}
            </>
          ) : (
            <div
              id="errorBooking"
              className="text-center text-primary-blackColor"
            >
              <h1 className="text-2xl font-semibold">
                Have no upcoming rides.
              </h1>
              <p className=" text-center mx-auto">
                As soon as a trip is booked, all relevant bookings will be
                displayed there.
              </p>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default withAuth(upcoming);
