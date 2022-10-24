import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { load, unload, userData } from "../store/user";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Post: NextPage = (props: any) => {
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
  const [tag, setTag] = useState({} as string);
  const [showcomment, setShowcomment] = useState(true);
  const [current, setCurrent] = useState(1);
  const [userdata, SetUserdata] = useState({});
  const taguser = (data: string, id: string) => {
    setCom(data);
    setTag(id);
  };
  // console.log(props.user.user);
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
      // console.log("You are on the browser");
      var newObject: any = window.localStorage.getItem("user");
      var data = JSON.parse(newObject);
    }
    setName(data?.user?.user?.name);
    console.log("name", name);
    console.log("props", props);
    setId(data?.user?.user?._id);
    // let button = document?.querySelectorAll(".bg-yellow-500");
    // button?.forEach((e: any) => {
    //   e.click();
    // });
    setVawo(props.support);
  }, []);
  useEffect(() => {
    setComments(props?.comment);
    setVawo(props?.support);
    setSavo(props?.saved);
  }, []);
  const submitData = async (
    username: any,
    userid: any,
    text: any,
    postid: any
  ) => {
    dispatch(load());

    const response = await fetch("/api/comment", {
      method: "POST",
      body: JSON.stringify({
        username,
        userid,
        text,
        postid,
        tag: tag,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setCom("");
    const data = await response.json();
    {
      data && dispatch(unload());
    }
    console.log(data);
    {
      data.comment && setComments(data.comment);
    }

    if (!response.ok) {
      console.log(data || "Something went wrong!");
    }
  };
  const submitSaved = async (userid: any, postid: any) => {
    dispatch(load());

    const response = await fetch("/api/save", {
      method: "POST",
      body: JSON.stringify({
        userid: props.user.user._id,
        value: saved,
        postid: props._id,
      }),
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
      data?.saved && setSaved((prev) => !prev);
    }
    if (!response.ok) {
      console.log(data || "Something went wrong!");
    }
    if (response.ok) {
      setSavo(data.saved);
    }
  };
  const submitVawo = async (userid: any, postid: any) => {
    dispatch(load());
    const response = await fetch("/api/vawolence", {
      method: "POST",
      body: JSON.stringify({
        userid,
        value: support,
        postid,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    {
      data && dispatch(unload());
    }
    console.log(data);
    if (!response.ok) {
      console.log(data || "Something went wrong!");
    }
    if (response.ok) {
      setVawo(data.vawo);
    }
  };
  const submitcom = async () => {
    console.log("ooo", name);
    let username = await name;
    let userid = await id;
    let text = await com;
    let post = await props.createdAt;
    console.log("data", username, userid, props._id, text);
    submitData(name, id, com, props._id);
    setCom("");
    setTag("");
  };
  const submitVawolence = () => {
    let username = name;
    let userid = id;
    let text = com;
    let post = props.createdAt;
    submitVawo(id, props._id);
    console.log("data", username, userid, props.title, text);
  };
  const submitsavo = async () => {
    let username = await props.user.user.name;
    let userid = await props.user.user.id;
    let text = com;
    let post = props.createdAt;
    {
      username && submitSaved(id, props._id);
    }
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
      body: JSON.stringify({
        userid,
        postid,
      }),
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
    submitDelete(id, props._id);
    console.log("data", username, userid, props.title, text);
  };
  const submitDeleteComment = async (
    message: string,
    username: string,
    userid: string
  ) => {
    dispatch(load());
    setUser({
      userid,
      message,
      postid: props._id,
      username,
    });
    console.log(user);

    const response = await fetch("/api/deletecomment", {
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
    {
      data.comment && setComments(data.comment);
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
  const All = useSelector((state: any) => state.user);

  const changeComment = () => {
    setShowcomment((prev) => !prev);
    if (showcomment) {
      setCurrent(10000000000000);
    } else if (!showcomment) {
      setCurrent(1);
    }
    console.log("show?", current);
  };
  const agree = vawo?.find((role: any) => role.userid === id);
  const ispostSaved = savo?.find((role: any) => role.userid === id);
  console.log(current);
  useEffect(() => {
    agree ? setSupport(false) : setSupport(true);
    ispostSaved ? setSaved(false) : setSaved(true);
  }, [agree]);
  return (
    <>
      {
        <div className="bg-[#7B8CA6] h-fit drop-shadow-[0_3px_3px_#000] text-white lg:w-6/12 ml-auto mr-auto mt-10 mb-10 border-2 diary border-[rgba(0,0,0,0.05)] w-11/12 rounded-xl">
          <div className=" lg:w-full mb-10  bg-[#1D2639] rounded-t-xl h-fit w-full">
            <div className="flex  items-center h-[60%] md:w-10/12 justify-between ml-auto mr-auto">
              <img
                className=" mt-5 ml-2 w-[50px] h-[50px] rounded-full "
                alt=""
                src="/wolf.png"
              />
              <Link href={`/user/${props?.data?._id}`}>
                <p className=" mt-5 ml-2 cursor-pointer">{props?.data?.name}</p>
              </Link>
              <p className=" mt-5 ml-2 text-xs">{props?.data?.createdAt}</p>
            </div>
            <p className="text-center mb-4 mt-10">{props?.title}</p>
          </div>

          {props?.image && (
            <motion.img
              className="ml-auto mr-auto rounded-[8px] w-3/12 md:w-[30%] "
              whileHover={{
                scale: 1,
              }}
              whileTap={{
                width: "80%",
                height: "50%",
              }}
              drag
              dragConstraints={{
                right: 5,
                left: 5,
                top: 3,
                bottom: 3,
              }}
              //variants={variants}
              //animate="lion"
              src={props.image !== "" ? props.image : ""}
              alt="icon"
            />
          )}
          <p className="w-11/12 ml-auto mr-auto">
            {props?.text}
            <span className="cursor-pointer">ReadMore...</span>
          </p>
          <p className="ml-2 italic font-semibold">
            {vawo?.length === 1
              ? `${vawo?.length} person loves this post`
              : vawo?.length === 0
              ? `nobody loves this post yet`
              : `${vawo?.length} people loves this post`}
          </p>
          <div className="flex ">
            <motion.i
              whileHover={{
                scale: 1.1,
              }}
              whileTap={{
                scale: 1.3,
              }}
              onClick={() => {
                submitVawolence();
              }}
              className="  p-[3px] m-2 cursor-pointer h-[30px] rounded-[14px] mt-4 w-[100px] text-center bg-black text-white"
            >
              {!agree ? `love` : `unlove`}
            </motion.i>
            <motion.i
              whileHover={{
                scale: 1.1,
              }}
              whileTap={{
                scale: 1.3,
              }}
              onClick={() => {
                submitSaved("test", "test");
              }}
              className="p-[3px] m-2 cursor-pointer h-[30px] rounded-[14px] mt-4 w-[100px] text-center bg-black text-white"
            >
              {!ispostSaved ? `save` : `unsave`}
            </motion.i>
            <motion.i
              whileHover={{
                scale: 1.1,
              }}
              whileTap={{
                scale: 1.3,
              }}
              onClick={() => changeComment()}
              className="p-[3px] m-2 cursor-pointer h-[30px] rounded-[14px] mt-4 w-[100px] text-center bg-black text-white"
            >
              comments..
            </motion.i>
            {props?.data?._id === id ? (
              <motion.i
                whileHover={{
                  scale: 1.1,
                }}
                whileTap={{
                  scale: 1.3,
                }}
                onClick={() => {
                  submitdelete();
                }}
                className="p-[3px] m-2 cursor-pointer h-[30px] rounded-[14px] mt-4 w-[100px] text-center bg-black text-white"
              >
                delete
              </motion.i>
            ) : name === "admin" ? (
              <motion.i
                whileHover={{
                  scale: 1.1,
                }}
                whileTap={{
                  scale: 1.3,
                }}
                onClick={() => {
                  submitdelete();
                }}
                className="p-[3px] m-2 cursor-pointer h-[30px] rounded-[14px] mt-4 w-[100px] text-center bg-black text-white"
              >
                delete{" "}
              </motion.i>
            ) : null}
          </div>
          <div className="flex ">
            <input
              className="m-2 text-black outline-none border-none p-2 border-[2px] rounded-2xl "
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
          <div className="mt-2 ">
            {comments?.slice(0, current).map((comment: any, i) => {
              return (
                <div key={i} className="w-fit flex ">
                  <img
                    className=" rounded-full h-[50px] w-[50px]"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS03bhrOEaH7FfjBpoKth3GuRHbgwPaZkl2RTTteMn3g&s"
                    alt="icon"
                  />

                  <div>
                    <Link href={`user/${comment.userid}`}>
                      <p className="font-bold mt-1 ml-4 cursor-pointer">
                        {comment.username}
                      </p>
                    </Link>
                    <span className="font-semibold italic ml-4">
                      {comment.message}{" "}
                      {id === comment.userId && (
                        <span
                          onClick={() =>
                            submitDeleteComment(
                              comment.message,
                              comment.username,
                              comment.userid
                            )
                          }
                          className="cursor-pointer ml-2"
                        >
                          {" "}
                          Delete...
                        </span>
                      )}
                      <span
                        onClick={() =>
                          taguser(`@${comment.username}`, comment.username)
                        }
                        className="cursor-pointer ml-2"
                      >
                        {" "}
                        Tag...
                      </span>
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

export default Post;
