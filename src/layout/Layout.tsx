import { useAuth } from "@utils/context/authContext";
import { headerTitles } from "@utils/lib/listElements";
import { Error, Success } from "@utils/lib/Messages";
import Cookies from "js-cookie";

import { useRouter } from "next/router";
import React, { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { AppState } from "store";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout: React.FC<ReactNode> = ({ children }) => {
  const router = useRouter();
  const { isLogin } = useAuth();
  const { user, drive, auth } = useSelector((state: AppState) => state);

  useEffect(() => {
    if (
      auth?.error === "This Driver Not Found" ||
      drive?.error === "This Driver Not Found" ||
      user?.error === "This Driver Not Found"
    ) {
      Error("This Drive Not Found Exiting");
      setTimeout(() => {
        Cookies.remove("driveToken");
        window.location.replace("/");
      }, 1500);
    }
    if (user?.success || drive?.success || auth?.success) {
      Success(user?.success || drive?.success || auth?.success);
    } else if (user?.error || drive?.error || auth?.error) {
      Error(user?.error || drive?.error || auth?.error);
    } else if (user?.status == 429 || user?.status == 404) {
      Error(user?.error);
    }
  }, [
    user?.status,
    user?.success,
    drive?.success,
    auth?.success,
    user?.error,
    drive?.error,
    auth?.error,
  ]);

  const navbar = headerTitles.find((item) => {
    return item.pathname === router?.pathname;
  });

  return (
    <div className="min-h-screen">
      {isLogin && <>{navbar?.navbar && <Navbar />}</>}

      <Sidebar />
      <main
        className={`min-h-screen ${
          !isLogin && "flex items-center justify-center px-2 "
        }`}
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;
