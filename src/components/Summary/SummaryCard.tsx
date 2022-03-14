import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

interface IUpcomingCard {
  pickup: string;
  dropOff: string;
  date: string;
  Time: string;
  vehicleClass: string;
  duration: string;
  uuid: string;
  status: string;
  stops: [{ title: string; placeId: string }];
}

const SummaryCard: React.FC<IUpcomingCard> = ({
  pickup,
  dropOff,
  date,
  Time,
  vehicleClass,
  duration,
  uuid,
  stops,
}) => {
  return (
    <div className="border-b py-2 px-4 flex flex-col s-center">
      <div className="mb-2">
        <div className="text-green-400 font-semibold mb-1">Pickup</div>
        <div className=" flex">
          <div className="w-6">
            <FontAwesomeIcon icon="map-marker-alt" className="text-gray-400" />
          </div>
          <span>{pickup}</span>
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
      <div className="">
        <div className="text-indigo-400 font-semibold mb-1">Duration</div>
        <div className="flex">
          <div className="w-6">
            <FontAwesomeIcon icon="road" className="text-gray-400" />
          </div>
          <span>{duration}</span>
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
      <Link href={`/summary/${uuid}`}>
        <a className="h-10 flex items-center justify-center bg-blue-500 border-blue-500 border text-xl w-full rounded text-white">
          Summary
        </a>
      </Link>
    </div>
  );
};

export default SummaryCard;
