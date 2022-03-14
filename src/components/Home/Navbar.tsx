import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "@utils/context/authContext";
import React from "react";
import Image from "next/image";
import CurrencyFormat from "react-currency-format";

const Navbar = () => {
  const { isSearch, setIsSidebar } = useAuth();
  const { me } = useAuth();

  return (
    <div
      className={`flex items-center justify-between py-2 px-4 bg-transparent ${
        isSearch ? "block" : "absolute"
      } z-10 w-full`}
    >
      <button
        onClick={() => {
          setIsSidebar(true);
        }}
        className="bg-white w-12 h-12 flex items-center justify-center rounded-full"
      >
        <FontAwesomeIcon icon="bars" className="text-2xl" />
      </button>

      <div className="relative z-20 inline object-cover w-12 h-12 border-2 border-white rounded-full">
        {me?.avatar && (
          <Image
            src={me?.avatar}
            width={48}
            height={48}
            layout="responsive"
            className="relative z-20 inline object-cover w-12 h-12 border-2 border-white rounded-full"
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
