import React from "react";
import { useSelector } from "react-redux";

const Alert = () => {
  const show = useSelector(
    (state: { user: {}; alert: { text: string; show: boolean } }) =>
      state.alert.text
  );
  return (
    <div className="fixed top-10 left-[30%] right-10 bg-[#0f0e17] text-white font-bold p-4 rounded-xl  z-[50] flex flex-col gap-4 border-[#ff8906] border-[1px]">
      <p>{show}</p>
    </div>
  );
};

export default Alert;
