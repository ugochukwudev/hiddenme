import type { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { load, unload, userData } from "../store/user";
import { setalert, setalertOff, alerttext } from "../store/alert";
import Alert from "../components/Alert";
const Login: NextPage = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const All = useSelector((state: any) => state.user);
  const show = useSelector(
    (state: { user: {}; alert: { text: string; show: boolean } }) =>
      state.alert.show
  );
  const submitData = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(load());
    const response = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    {
      data && dispatch(unload());
      dispatch(alerttext(data?.message));
      dispatch(setalert());
      setTimeout(() => {
        dispatch(setalertOff());
      }, 3000);
    }
    console.log(data);
    window?.localStorage?.setItem("user", JSON.stringify(data));
    {
      (await data) && dispatch(userData(data));
    }

    if (!response.ok) {
      console.log(data || "Something went wrong!");
    }
    if (response.ok) {
      window.location.replace("/");
    }
  };
  const setUserData = (data: string, dataContent: string) => {
    setUser((user) => {
      return { ...user, [data]: dataContent };
    });
  };
  return (
    <div className="flex flex-wrap min-h-screen w-full content-center justify-center bg-[#0F3661] py-10 px-4">
      <div className="flex shadow-md">
        <div
          className="flex flex-wrap content-center justify-center rounded-l-md bg-white"
          style={{ width: "24rem", height: "32rem" }}
        >
          <div className="w-72">
            <h1 className="text-xl font-semibold">Welcome back</h1>
            <small className="text-gray-400">
              Welcome back! Please enter your details
            </small>

            <form className="mt-4">
              <div className="mb-3">
                <label className="mb-2 block text-xs font-semibold">
                  Email
                </label>
                <input
                  onChange={(e) => {
                    setUserData(e.target.name, e.target.value);
                  }}
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                />
              </div>

              <div className="mb-3">
                <label className="mb-2 block text-xs font-semibold">
                  Password
                </label>
                <input
                  onChange={(e) => {
                    setUserData(e.target.name, e.target.value);
                  }}
                  name="password"
                  type="password"
                  placeholder="*****"
                  className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                />
              </div>

              <div className="mb-3 flex flex-wrap content-center">
                <Link href="/forgotpassword">
                  <p className="text-xs font-semibold cursor-pointer text-purple-700">
                    Forgot password?
                  </p>
                </Link>
              </div>

              <div className="mb-3">
                <button
                  onClick={(e) => submitData(e)}
                  className="mb-1.5 block w-full text-center text-white bg-[#FFCC16] hover:scale-110 px-2 py-1.5 rounded-md cursor-pointer"
                >
                  {All.loading ? "loading" : "login"}
                </button>
              </div>
            </form>

            <div className="text-center">
              <span className="text-xs text-gray-400 font-semibold">
                Don't have account?
              </span>
              <Link
                href="/register"
                className="text-xl font-semibold text-purple-700 "
              >
                <span className="text-xs text-purple-700 font-semibold cursor-pointer">
                  Sign Up
                </span>
              </Link>
            </div>
          </div>
        </div>

        <div
          className=" hidden md:block  flex-wrap content-center justify-center rounded-r-md"
          style={{ width: "24rem", height: "32rem" }}
        >
          <img
            className="w-full h-full bg-center bg-no-repeat bg-cover rounded-r-md"
            src="data:image/jpeg;base64,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"
          />
        </div>
      </div>
      {show && <Alert />}
    </div>
  );
};
export default Login;
