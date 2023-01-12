import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setalert, setalertOff, alerttext } from "../store/alert";
import Alert from "../components/Alert";
const forgotpassword = () => {
  const dispatch = useDispatch();
  const show = useSelector(
    (state: { user: {}; alert: { text: string; show: boolean } }) =>
      state.alert.show
  );
  const [oldpassword, setOldPassword] = useState<string>();
  const [newPassword, setNewPassword] = useState<string>();
  if (typeof window !== "undefined") {
    console.log("You are on the browser");
    var newObject: any = window.localStorage.getItem("user");
    var user = JSON.parse(newObject);
    console.log("data", user?.user?.user?._id);
    var id = user?.user?.user?._id;
  }
  const submitdata = async () => {
    const response = await fetch("/api/changepassword", {
      method: "POST",
      body: JSON.stringify({
        userid: id,
        password: oldpassword,
        newpassword: newPassword,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    dispatch(alerttext(data?.message));
    dispatch(setalert());
    setTimeout(() => {
      dispatch(setalertOff());
    }, 3000);
    window?.localStorage?.setItem("user", JSON.stringify(""));
    window.location.pathname = "/login";
  };
  return (
    <div className="flex flex-col justify-center  min-h-[calc(100vh-300px)] rounded-lg items-center ">
      <div className="bg-white rounded-lg px-4 py-4  flex flex-col gap-4 w-11/12 lg:w-6/12 ">
        <p className="text-[#1D2639] font-medium text-[18px] leading-6">
          Current password
        </p>
        <input
          onChange={(e) => {
            setOldPassword(e.target.value);
          }}
          type="text"
          placeholder="Input current password"
          className="w-11/12  h-8 outline-0"
        />
        <p className="text-[#1D2639] font-medium text-[18px] leading-6">
          new password
        </p>
        <input
          type="text"
          onChange={(e) => {
            setNewPassword(e.target.value);
          }}
          placeholder="Input new password"
          className="w-11/12  h-8 outline-0"
        />
        <button
          onClick={() => submitdata()}
          className="bg-[#1876f2] text-white font-bold  rounded-full hover:text-[#1876f2] hover:bg-white hover:border-[1px] hover:border-[#1876f2]"
        >
          Change password
        </button>
      </div>
      {show && <Alert />}
    </div>
  );
};

export default forgotpassword;
