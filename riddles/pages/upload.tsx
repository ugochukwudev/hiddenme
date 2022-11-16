import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { load, unload } from "../store/user";
import { setalert, setalertOff, alerttext } from "../store/alert";
import Alert from "../components/Alert";
import { useRouter } from "next/router";
const Upload: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const show = useSelector(
    (state: { user: {}; alert: { text: string; show: boolean } }) =>
      state.alert.show
  );
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
      var data = JSON?.parse(newObject);
    }
    {
      !data && router.push("/login");
    }
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("You are on the browser");
      var newObject: any = window.localStorage.getItem("user");
      var data = JSON.parse(newObject);
      setData(data?.user?.user);
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
      dispatch(alerttext(data?.message));
      dispatch(setalert());
      setTimeout(() => {
        dispatch(setalertOff());
      }, 3000);
    }
    console.log(data);

    if (!response.ok) {
      console.log(data || "Something went wrong!");
    }
    if (response.ok) {
      window.location.replace("/");
    }
  };
  const All = useSelector((state: any) => state.user);
  return (
    <div className="bg-[#F0F2F5]">
      <h1 className="text-2xl  font-bold text-[#050505] mt-4 text-center">
        Add new diary
      </h1>
      <p className="text-blue-600 text-center w-10/12 ml-auto mr-auto">
        Note: only images can be accepted . videos and audios are not surpotted.
        file above 1mb can't be uploaded. we're managing our database
      </p>

      <img
        className="w-[200px] h-[200px] ml-auto mr-auto text-black rounded-[12px] mt-10"
        src={Image}
        alt="pick an image for preview"
      />
      <textarea
        className="w-6/12 block p-4 ml-auto mr-auto resize-none outline-none mt-10 mb-1  rounded-[6px]"
        placeholder="title ..."
        onChange={(e) => {
          setUserData(e.target.name, e.target.value);
        }}
        value={user.title}
        name="title"
      ></textarea>
      <textarea
        className="w-6/12 h-[30vh] p-4 block ml-auto mr-auto resize-none outline-none mt-10 mb-10  rounded-[6px]"
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
          className="mb-10 p-[10px] bg-[#1876f2] text-white rounded-[12px] w-[50%] -[50px] mt-10"
        >
          {All.loading ? "loading" : "upload your mind ..."}
        </button>
      </div>
      {show && <Alert />}
    </div>
  );
};
export default Upload;
