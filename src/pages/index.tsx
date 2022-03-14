import React, { useEffect, useState } from "react";
import Navbar from "@components/Home/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import withAuth from "@utils/hooks/withAuth";
import Map from "@components/Map";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
const index = () => {
  const [height, setHeight] = useState("");
  useEffect(() => {
    setHeight(`${(window?.innerHeight / 100) * 75}px`);
  }, []);
  const router = useRouter();
  const [form, setForm] = useState<{
    latlngDropOff: { lat: number; lng: number };
  }>({
    latlngDropOff: { lat: 0, lng: 0 },
  });
  if (Cookies.get("driveToken")) {
    router.replace("/upcomings");
  }
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main className="flex flex-col min-h-screen">
        <div className="h-1/2 ">
          <Map height={height} form={form} />
        </div>
        <div className="py-2 px-4  flex flex-col justify-between items-center w-full flex-1 bg-gray-100 h-full border-t border-b">
          <Link href="/summary" passHref>
            <div className="flex items-center py-2 px-4 bg-gray-200 h-14 mb-6 w-full">
              <div className="flex items-center justify-center">
                <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center">
                  <FontAwesomeIcon icon="receipt" className="text-2xl" />
                </div>
                <div className="text-md ml-2 text-gray-700">
                  <h1>Summary</h1>
                </div>
              </div>
            </div>
          </Link>
          <Link href="/upcomings" passHref>
            <div className="flex items-center py-2 px-4 bg-gray-200 h-14 w-full">
              <div className="flex items-center justify-center">
                <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center">
                  <FontAwesomeIcon icon="calendar-check" className="text-2xl" />
                </div>
                <div className="text-md ml-2 text-gray-700">
                  <h1>Upcomings</h1>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default withAuth(index);
