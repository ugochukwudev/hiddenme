import "../styles/globals.css";
import type { AppProps } from "next/app";
import Nav from "../components/Navigation";
import { store } from "../store/store";
import { Provider } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Footer from "../components/footer";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("You are on the browser");
      var newObject: any = window.localStorage.getItem("user");
      var data = JSON?.parse(newObject);
    }
    {
      !data && router.push("/login");
    }
  }, []);
  return (
    <>
      <Provider store={store}>
        <Nav />
        <Component {...pageProps} />
        <Footer />
      </Provider>
    </>
  );
}

export default MyApp;
