import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@utils/context/authContext";
import { useDispatch } from "react-redux";
import { Logout } from "store/actions/authAction";

const Sidebar = () => {
  const menuItems = [
    // { title: "Home", target: "/" },
    { title: "Summary", target: "/summary" },
    // { title: "Inbox", target: "/inbox" },
    { title: "Upcomings", target: "/upcomings" },
    { title: "Statistics", target: "/statistics" },
    { title: "Change Password", target: "/changePassword" },
    { title: "Account", target: "/account" },
  ];
  const { me } = useAuth();
  const dispatch = useDispatch();
  const { isSidebar, setIsSidebar } = useAuth();
  return (
    <React.Fragment>
      {/* Sidebar Overlay */}
      <aside
        onClick={() => setIsSidebar(false)}
        className={`fixed inset-0 z-20 block transition-opacity bg-black opacity-50 lg:hidden ${
          isSidebar ? "block" : "hidden"
        }`}
      />

      {/* Sidebar */}
      <div
        className={`py-3 pl-3 fixed inset-y-0 left-0 z-30 w-72 overflow-y-auto transition duration-200 ease-out transform translate-x-0 bg-white  lg:translate-x-0 lg:static lg:inset-0  block lg:hidden ${
          isSidebar ? "ease-out translate-x-0" : "ease-in -translate-x-full"
        }`}
      >
        <div className="mt-4 flex flex-col text-black">
          <div className="flex mb-6">
            <div className="relative">
              {/* {me?.avatar && (
                <div className="w-14 h-14 rounded-full ">
                  <Image
                    src={me?.avatar}
                    width={56}
                    height={56}
                    layout="fixed"
                    className="object-cover rounded-full "
                  />
                </div>
              )} */}
            </div>
            <div className="text-3xl ml-2 font-semibold flex flex-col w-72 border-b">
              <div className="truncate w-56">{me?.firstName}</div>
              <div className="truncate w-56">{me?.lastName}</div>
            </div>
          </div>
          <div className="flex flex-col">
            {menuItems?.map((item, index) => {
              return (
                <Link href={item.target} key={index}>
                  <a
                    className="text-3xl mb-6"
                    onClick={() => setIsSidebar(false)}
                  >
                    {item.title}
                  </a>
                </Link>
              );
            })}
          </div>

          <div
            className="text-3xl"
            onClick={() => {
              setIsSidebar(false);

              dispatch(Logout());
            }}
          >
            Logout
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Sidebar;
