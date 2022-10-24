import "../styles/globals.css";
import type { AppProps } from "next/app";
import Nav from "../components/Navigation";
import { store } from "../store/store";
import { Provider } from "react-redux";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider store={store}>
        <Nav />
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default MyApp;
