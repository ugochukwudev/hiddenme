import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { load, unload, userData } from "../store/user";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Option: NextPage = (props: any) => {
  const dispatch = useDispatch();
  const [com, setCom] = useState("");
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [comments, setComments] = useState([]);
  const [vawo, setVawo] = useState([]);
  const [support, setSupport] = useState(false);
  const [saved, setSaved] = useState(false);
  const [savo, setSavo] = useState([]);
  const [user, setUser] = useState({} as any);
  //console.log(props.rec);
  const variants = {
    lion: {
      x: 100,
      transition: {
        duration: 2,
        delay: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
    fish: {
      y: 100,
    },
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("You are on the browser");
      var newObject: any = window.localStorage.getItem("user");
      var data = JSON.parse(newObject);
    }
    {
      newObject && setName(data.user.user.name);
    }
    {
      newObject && setId(data.user.user._id);
    }
  }, []);
  useEffect(() => {
    setComments(props.comment);
    setVawo(props.support);
  }, []);
  const submitData = async (
    username: any,
    userid: any,
    text: any,
    postid: any
  ) => {
    dispatch(load());
    setUser({
      username,
      userid,
      text,
      postid,
    });
    const response = await fetch("/api/comment", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    {
      data && dispatch(unload());
    }
    console.log(data);
    setComments(data.comment);
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
  };
  const submitSaved = async (userid: any, postid: any) => {
    dispatch(load());
    setUser({
      userid,
      value: saved,
      postid,
    });
    const response = await fetch("/api/save", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    {
      data && dispatch(unload());
      setSavo(data.vawo);
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
  };
  const submitVawo = async (userid: any, postid: any) => {
    dispatch(load());
    setUser({
      userid,
      value: support,
      postid,
    });
    const response = await fetch("/api/vawolence", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    {
      data && dispatch(unload());
      setVawo(data.vawo);
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
  };
  const submitcom = () => {
    let username = name;
    let userid = id;
    let text = com;
    let post = props.createdAt;
    submitData(name, id, com, props.rec);
    console.log("data", username, userid, props.title, text);
  };
  const submitVawolence = () => {
    let username = name;
    let userid = id;
    let text = com;
    let post = props.createdAt;
    submitVawo(id, props.rec);
    console.log("data", username, userid, props.title, text);
  };
  const submitsavo = () => {
    let username = name;
    let userid = id;
    let text = com;
    let post = props.createdAt;
    submitSaved(id, props.rec);
    console.log("data", username, userid, props.title, text);
  };
  const submitDelete = async (userid: any, postid: any) => {
    dispatch(load());
    setUser({
      userid,
      postid,
    });
    const response = await fetch("/api/delete", {
      method: "POST",
      body: JSON.stringify(user),
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
  };
  const submitdelete = () => {
    let username = name;
    let userid = id;
    let text = com;
    let post = props.createdAt;
    submitDelete(id, props.rec);
    console.log("data", username, userid, props.title, text);
  };
  const All = useSelector((state: any) => state.user);
  return (
    <>
      {
        <div className="bg-white text-black lg:w-6/12 ml-auto mr-auto mt-10 mb-10 border-2 diary border-[rgba(0,0,0,0.05)] p-4 rounded-xl">
          <p>{props.title}</p>
          <motion.img
            className="ml-auto mr-auto rounded-2xl"
            whileHover={{
              scale: 1.1,
            }}
            // whileTap={{
            //   width: "50vw",
            //   height: "50vh",
            // }}
            // drag
            // dragConstraints={{
            //   right: 10,
            // }}
            //variants={variants}
            //animate="lion"
            src={props.image !== "" ? props.image : "./favicon.ico"}
            alt="icon"
          />
          <p className="w-11/12 ml-auto mr-auto">
            {props.text}
            <span className="cursor-pointer">ReadMore...</span>
          </p>
          <div className="flex ">
            <i
              onClick={() => {
                setSupport((prev) => !prev);
                submitVawolence();
              }}
              className="p-[3px] m-2 cursor-pointer h-[30px] rounded-[14px] mt-4 w-[100px] text-center bg-black text-white"
            >
              unsurport(0)
            </i>
            <i
              onClick={() => {
                setSaved((prev) => !prev);
                submitsavo();
              }}
              className="p-[3px] m-2 cursor-pointer h-[30px] rounded-[14px] mt-4 w-[100px] text-center bg-black text-white"
            >
              Save
            </i>
            <i className="p-[3px] m-2 cursor-pointer h-[30px] rounded-[14px] mt-4 w-[100px] text-center bg-black text-white">
              comments
            </i>
            <i
              onClick={() => {
                submitdelete();
              }}
              className="p-[3px] m-2 cursor-pointer h-[30px] rounded-[14px] mt-4 w-[100px] text-center bg-black text-white"
            >
              delete{" "}
            </i>
          </div>
          <div className="flex ">
            <input
              className="m-2 outline-none border-black border-[2px] rounded-2xl p-1"
              placeholder="comment osiso"
              value={com}
              onChange={(e) => {
                setCom(e.target.value);
              }}
            />
            <button
              onClick={submitcom}
              className="bg-yellow-500 mr-4 text-white p-2 h-[40px] bold w-[100px]  mt-2 rounded-full"
            >
              {All.loading ? "loading" : "submit"}
            </button>
          </div>
          <div className="mt-2 flex flex-wrap">
            {comments?.map((comment: any, i) => {
              return (
                <div key={i} className="w-fit flex ">
                  <img
                    className=" rounded-full h-[50px] w-[50px]"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS03bhrOEaH7FfjBpoKth3GuRHbgwPaZkl2RTTteMn3g&s"
                    alt="icon"
                  />

                  <div>
                    <p className="font-bold mt-1 ml-4">{comment.username}</p>
                    <span className="font-semibold italic ml-4">
                      {comment.message}{" "}
                      <span className="cursor-pointer ml-2"> ReadMore...</span>
                      <span className="cursor-pointer ml-2"> Delete...</span>
                      <span className="cursor-pointer ml-2"> Tag...</span>
                    </span>
                    <ToastContainer />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      }
    </>
  );
};

export default Option;
