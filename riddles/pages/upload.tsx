import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { load, unload } from "../store/user";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Upload: NextPage = () => {
  const dispatch = useDispatch();
  const [datas, setData] = useState();
  const [Image, setImage] = useState({} as any);
  const [create, setCreate] = useState({} as any);
  const [user, setUser] = useState({
    title: "",
    text: "",
    image: "",
  });

  const setUserData = (data: any, dataContent: any) => {
    setUser((user) => {
      return { ...user, [data]: dataContent };
    });
  };
  const handleChange = (e: any) => {
    const img = e.target.name;
    const data = e.target.files[0];
    console.log();
    setCreate(data);
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      setUser((user) => {
        return { ...user, [img]: reader.result };
      });
      setImage(reader.result);
      console.log(reader.result);
    });
    reader.readAsDataURL(data);
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("You are on the browser");
      var newObject: any = window.localStorage.getItem("user");
      var data = JSON.parse(newObject);
      setData(data.user.user);
    }
  }, []);
  const submitData = async () => {
    dispatch(load());
    const response = await fetch("/api/upload", {
      method: "POST",
      body: JSON.stringify({ user: user, data: datas }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    {
      data && dispatch(unload());
    }
    console.log(data);

    {
      (await data) && data.message === "user succesfully registered"
        ? toast.success(data.message)
        : data.message === "user already exist and his password is 123456789"
        ? toast.info(data.message)
        : data.message === "Invalid input."
        ? toast.error(data.message)
        : toast.info(data.message);
    }
    if (!response.ok) {
      console.log(data || "Something went wrong!");
    }
    if (response.ok) {
      window.location.replace("/");
    }
  };
  const All = useSelector((state: any) => state.user);
  return (
    <>
      <h1 className="text-2xl utalic font-bold text-center">Add new diary</h1>
      <p className="text-red-600 text-center w-10/12 ml-auto mr-auto">
        Note: only images can be accepted . videos and audios are not surpotted.
        file above 1mb can't be uploaded. we're managing our database
      </p>

      <img
        className="w-[200px] h-[200px] ml-auto mr-auto rounded-[12px] mt-10"
        src={Image}
        alt="pick an image for preview"
      />
      <textarea
        className="w-6/12 block ml-auto mr-auto resize-none outline-none mt-10 mb-10 border-[.05px] border-[black] rounded-[6px]"
        placeholder="title ..."
        onChange={(e) => {
          setUserData(e.target.name, e.target.value);
        }}
        value={user.title}
        name="title"
      ></textarea>
      <textarea
        className="w-6/12 h-[30vh] block ml-auto mr-auto resize-none outline-none mt-10 mb-10 border-[.05px] border-[black] rounded-[6px]"
        placeholder="write your story ..."
        value={user.text}
        onChange={(e) => {
          setUserData(e.target.name, e.target.value);
        }}
        name="text"
      ></textarea>
      <br />
      <div className="flex flex-col justify-center items-center">
        <input
          multiple={false}
          //value={Image}
          name="image"
          onChange={(e) => {
            handleChange(e);
          }}
          type="file"
          accept="image/png, image/jpeg"
        />

        <button
          onClick={submitData}
          className="mb-10 p-[10px] bg-purple-500 text-white rounded-[12px] w-[50%] -[50px] mt-10"
        >
          {All.loading ? "loading" : "upload your mind ..."}
        </button>
      </div>
      <ToastContainer />
    </>
  );
};
export default Upload;
