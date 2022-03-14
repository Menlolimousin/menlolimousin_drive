import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "@utils/context/authContext";
import { headerTitles } from "@utils/lib/listElements";
import { useRouter } from "next/router";
import React from "react";

const Navbar = () => {
  const { setIsSidebar } = useAuth();
  const router = useRouter();

  const navbarTitle = headerTitles.find((item) => {
    return item.pathname === router.pathname;
  });

  return (
    <div className="bg-black h-16 py-2 px-4 flex items-center">
      <button
        onClick={() => {
          setIsSidebar(true);
        }}
        className="bg-white w-10 h-10 flex items-center justify-center rounded-full"
      >
        <FontAwesomeIcon icon="bars" className="text-xl" />
      </button>
      <div className="ml-4 text-white text-2xl">
        <h1>{navbarTitle?.title}</h1>
      </div>
    </div>
  );
};

export default Navbar;
