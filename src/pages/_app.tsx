import "@assets/styles/globals.css";
import "@utils/lib/Icons";
import "react-toastify/dist/ReactToastify.css";

// 1. import `NextUIProvider` component
import { NextUIProvider } from "@nextui-org/react";
import Layout from "@layout/Layout";
import type { AppProps } from "next/app";
import { AuthProvider } from "@utils/context/authContext";
import { Provider } from "react-redux";
import store from "../store/store";
import { createWrapper } from "next-redux-wrapper";
import ToasterContainer from "@components/ToasterContainer";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <NextUIProvider>
        <AuthProvider>
          <Layout>
            {typeof window === "undefined" ? null : (
              <Component {...pageProps} />
            )}
          </Layout>
          <ToasterContainer />
        </AuthProvider>
      </NextUIProvider>
    </Provider>
  );
}

const makeStore = () => store;
const wrapper = createWrapper(makeStore);
export default wrapper.withRedux(MyApp);
