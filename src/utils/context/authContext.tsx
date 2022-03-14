import Cookies from "js-cookie";
import { useRouter } from "next/router";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useSelector } from "react-redux";
import { AppState } from "store";

interface IAuthContextType {}
const authContextDefaultValues: IAuthContextType = {};

const AuthContext = createContext<any>(authContextDefaultValues);
interface IProps {
  children: ReactNode;
}
export function AuthProvider({ children }: IProps) {
  //   const isLoggedIn = Cookies.get("token");
  //   const [isMessage, setIsMessage] = useState<string>("");
  const [isSidebar, setIsSidebar] = useState<boolean>(false);
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [isOnline, setIsOnline] = useState<boolean>(false);
  const { status } = useSelector((state: AppState) => state.drive);
  const router = useRouter();
  //   const [isShow, setIsShow] = useState<boolean>(false);
  const [me, setMe] = useState(null);
  // const router = useRouter();
  useEffect(() => {
    if (Cookies.get("driveToken")) {
      if (router.isReady) {
        setMe(JSON.parse(localStorage.getItem("meDrive") || "{}"));
      }
    }
  }, [router?.pathname, router?.isReady, status]);
  useEffect(() => {
    if (Cookies.get("driveToken") !== undefined) setIsLogin(true);
  }, [Cookies, router]);
  useEffect(() => {
    const me = JSON.parse(localStorage.getItem("meDrive") || "{}");
    setIsOnline(me?.isOnline);
  }, [status, router]);

  return (
    <>
      <AuthContext.Provider
        // value={{ isLoggedIn, isMessage, setIsMessage, isShow, setIsShow, me }}
        value={{
          me,
          isOnline,
          isSidebar,
          isLogin,
          setIsSidebar,
          isSearch,
          setIsSearch,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
}
export function useAuth() {
  return useContext(AuthContext);
}
