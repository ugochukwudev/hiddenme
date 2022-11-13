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
  const [email, setEmail] = useState<string>();
  const submitdata = async () => {
    const response = await fetch("/api/forgotpassword", {
      method: "POST",
      body: JSON.stringify({ email }),
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
    <div className="flex flex-col justify-center  h-[80vh] rounded-lg items-center ">
      <div className="bg-white rounded-lg px-4 py-4  flex flex-col gap-4 w-11/12 lg:w-6/12 ">
        <p className="text-[#213152] font-black">
          Note: a temporal password will be sent to the submitted email from our
          company mail (paulambrose5002@gail.com) . Please after login, go to
          your profile and change your password manually.
        </p>
        <p className="text-[#1D2639] font-medium text-[18px] leading-6">
          Account email address
        </p>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Input email related to the account"
          className="w-11/12  h-8 outline-0"
        />

        <button
          onClick={() => submitdata()}
          className="bg-[#7f5af0] text-white font-bold  rounded-full hover:text-[#1D2639] hover:bg-white hover:border-[1px] hover:border-[#1D2639]"
        >
          send temporal password
        </button>
      </div>
      {show && <Alert />}
    </div>
  );
};

export default forgotpassword;
