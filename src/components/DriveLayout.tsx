import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ReactNode, useEffect, useState } from "react";
import Map from "./Map";
import Spinners from "./Spinners";
import Link from "next/link";
import { checkUpcoming } from "store/actions/driverAction";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { getLocation } from "@utils/lib/api";
import { Error } from "@utils/lib/Messages";

interface IDriveLayout {
  location: string;
  children: ReactNode;
  loading: boolean;
  Drive: {
    status: number;
    error: string;
    success: string;
    pickupPlaceId: string;
    rides: string;
  };
}
const DriveLayout: React.FC<IDriveLayout> = ({
  loading,
  location,
  Drive,
  children,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [height, setHeight] = useState<string>("");
  const [form, setForm] = useState<{
    latlngDropOff: { lat: number; lng: number };
  }>({
    latlngDropOff: { lat: 0, lng: 0 },
  });
  useEffect(() => {
    setHeight(`${(window?.innerHeight / 100) * 85}px`);
  }, []);
  useEffect(() => {
    if (router?.isReady) {
      if (router?.query?.id) {
        dispatch(checkUpcoming(router?.query?.id));
      }
    }
  }, [router]);

  useEffect(() => {
    if (Drive?.status === 500) {
      dispatch(checkUpcoming(router?.query?.id));
    } else if (Drive?.status === 404) {
      router.replace("/upcomings");
      Error(Drive?.error);
    }
  }, [Drive?.error, Drive?.success, Drive?.status, router]);
  useEffect(() => {
    if (Drive?.pickupPlaceId) {
      getLocation(Drive?.pickupPlaceId).then((data) => {
        data?.map((item: { lat: number; lng: number }) => {
          setForm({
            ...form,
            latlngDropOff: { lat: item.lat, lng: item.lng },
          });
        });
      });
    }
  }, [Drive?.pickupPlaceId, router]);
  useEffect(() => {
    router.prefetch("/upcomings");
    if (Drive?.rides === "Past") {
      router.replace("/upcomings");
      Error("This booking is over");
    }
  }, [Drive]);
  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center min-h-screen my-6">
          <Spinners type="TailSpin" w={80} h={80} />
        </div>
      ) : (
        <div className="relative flex flex-col min-h-screen">
          <div
            className="bg-black rounded absolute py-2 px-4 top-2 z-10 w-11/12	left-1/2 flex"
            style={{ transform: "translateX(-50%)" }}
          >
            <span className="flex items-center justify-center py-2 px-4">
              <FontAwesomeIcon
                icon="map-pin"
                className="text-green-500 text-4xl"
              />
            </span>
            <div className="w-full">
              <h1 className="text-green-500 text-xl text-center">Drop Off</h1>
              <span className="flex-1 text-white flex items-center justify-center">
                {location}
              </span>
            </div>
          </div>
          <div className="relative">
            <Map height={height} form={form} />
            <Link
              href={`https://www.google.com/maps/dir/?api=1&destination=${location}&travelmode=driving`}
            >
              <a
                target="_blank"
                className="absolute bottom-10 right-2 w-10 h-10 rounded-full bg-white flex items-center justify-center"
              >
                <FontAwesomeIcon icon="location-arrow" className="text-black" />
              </a>
            </Link>
          </div>
          {children}
        </div>
      )}
    </>
  );
};

export default DriveLayout;
