import React from "react";

const forgotpassword = () => {
  return (
    <div className="flex flex-col justify-center  h-[80vh] rounded-lg items-center ">
      <div className="bg-white rounded-lg px-4 py-4  flex flex-col gap-4 w-11/12 lg:w-6/12 ">
        <p className="text-[#213152] font-black">
          Note: a temporal password will be sent to the submitted email . Please
          after login, go to your profile and change your password manually.
        </p>
        <p className="text-[#1D2639] font-medium text-[18px] leading-6">
          Account email address
        </p>
        <input
          type="email"
          placeholder="Input email related to the account"
          className="w-11/12  h-8 outline-0"
        />

        <button className="bg-[#1D2639] text-white font-bold  rounded-full hover:text-[#1D2639] hover:bg-white hover:border-[1px] hover:border-[#1D2639]">
          send temporal password
        </button>
      </div>
    </div>
  );
};

export default forgotpassword;
