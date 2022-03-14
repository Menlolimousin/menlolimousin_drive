import ModalScreen from "@components/ModalScreen";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { AppState } from "store";
const UserInfo: React.FC<{ phoneNumber: string }> = ({ phoneNumber }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { loading, Drive, error } = useSelector(
    (state: AppState) => state.drive
  );
  console.log(Drive);
  return (
    <>
      <div className="mb-2 flex items-center justify-between w-full text-base">
        <div
          className="rounded-full bg-gray-100 flex items-center justify-center w-8 h-8"
          onClick={() => window.open(`sms:${phoneNumber}`)}
        >
          <FontAwesomeIcon icon="comment" className="text-black" />
        </div>
        <div className="text-xl">
          <h1>Ömer</h1>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="rounded-full bg-gray-100 flex items-center justify-center w-8 h-8"
        >
          <FontAwesomeIcon icon="user" className="text-black" />
        </button>
      </div>
      <ModalScreen isOpen={isOpen} onRequestClose={() => setIsOpen(false)}>
        <div className="relative px-20 py-2">
          <div
            className="absolute top-0 left-5"
            onClick={() => setIsOpen(false)}
          >
            <FontAwesomeIcon icon="times" className="text-xl" />
          </div>
          <div className="flex items-center">
            <h1 className="text-red-500 font-semibold">Full Name:</h1>&nbsp;
            <span className="text-sm">
              {Drive?.owner?.firstName} {Drive?.owner?.lastName}
            </span>
          </div>
          <div className="flex items-center">
            <h1 className="text-red-500 font-semibold">Title:</h1>&nbsp;
            <span className="text-sm">{Drive?.owner?.title}</span>
          </div>
        </div>
      </ModalScreen>
    </>
  );
};

export default UserInfo;
