import React from "react";

const forgotpassword = () => {
  return (
    <div className="flex flex-col justify-center  h-[80vh] rounded-lg items-center ">
      <div className="bg-white rounded-lg px-4 py-4  flex flex-col gap-4 w-11/12 lg:w-6/12 ">
        <p className="text-[#1D2639] font-medium text-[18px] leading-6">
          Current password
        </p>
        <input
          type="text"
          placeholder="Input current password"
          className="w-11/12  h-8 outline-0"
        />
        <p className="text-[#1D2639] font-medium text-[18px] leading-6">
          new password
        </p>
        <input
          type="text"
          placeholder="Input new password"
          className="w-11/12  h-8 outline-0"
        />
        <button className="bg-[#1D2639] text-white font-bold  rounded-full hover:text-[#1D2639] hover:bg-white hover:border-[1px] hover:border-[#1D2639]">
          Change password
        </button>
      </div>
    </div>
  );
};

export default forgotpassword;
