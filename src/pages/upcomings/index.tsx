import UpcomingCard from "@components/Upcomings/UpcomingCard";
import Spinners from "@components/Spinners";
import withAuth from "@utils/hooks/withAuth";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "store";
import { Upcomings } from "store/actions/driverAction";
import { IDrives } from "types/drive";
import Select, { OnChangeValue } from "react-select";
interface IOption {
  label: string;
  value: string;
}
const upcoming = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { Drives, loading } = useSelector((state: AppState) => state.drive);
  useEffect(() => {
    if (router.isReady) dispatch(Upcomings(router?.query));
  }, [router]);
  const Option: IOption[] = [
    { value: "all", label: "all" },
    { value: "confirmed", label: "Confirmed" },
    { value: "changed", label: "Changed" },
    { value: "ongoing", label: "Ongoing" },
    { value: "active", label: "Active" },
    { value: "notified", label: "Notified" },
    { value: "Charging", label: "Charging" },
    { value: "drive", label: "Drive" },
  ];
  return (
    <section className="p-4 min-h-screen">
      {loading ? (
        <div className="flex items-center justify-center">
          <Spinners type="TailSpin" w={80} h={80} />
        </div>
      ) : (
        <>
          <div className="py-2 px-4">
            <Select
              options={Option}
              isSearchable={false}
              defaultValue={Option.filter(
                (option) => option.value === router.query.status
              )}
              onChange={(e: any) => {
                if (e.value !== router.query.status) {
                  if (e.value === "all") {
                    if (Object.getOwnPropertyNames(router.query).length) {
                      router.push({
                        pathname: router.pathname,
                        query: {},
                      });
                    }
                  } else {
                    router.push({
                      pathname: router.pathname,
                      query: { ...router.query, status: e.value },
                    });
                  }
                }
              }}
            />
          </div>
          {Drives?.length > 0 ? (
            <>
              {Drives?.map((item: any, index: number) => {
                return (
                  <div className="mb-4" key={index}>
                    <UpcomingCard
                      pickup={item.pickup}
                      pickupPlaceId={item.pickupPlaceId}
                      dropOffPlaceId={item.dropOffPlaceId}
                      fullName={
                        item?.owner?.firstName + " " + item?.owner?.lastName
                      }
                      phoneNumber={item?.owner?.phoneNumber}
                      dropOff={item.dropOff}
                      date={item.Date}
                      Time={item.Time}
                      vehicleClass={item.vehicleClass}
                      duration={item.duration}
                      uuid={item.uuid}
                      status={item.status}
                      atIso={item.atIso}
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
