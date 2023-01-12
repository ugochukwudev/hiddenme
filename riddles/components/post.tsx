import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { alerttext, setalert, setalertOff } from "../store/alert";
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
    console.log("id", id);

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
    console.log(data.message);
    dispatch(alerttext(data?.message));
    dispatch(setalert());
    setTimeout(() => {
      dispatch(setalertOff());
    }, 3000);
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
      dispatch(alerttext(data?.message));
      dispatch(setalert());
      setTimeout(() => {
        dispatch(setalertOff());
      }, 3000);
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
    console.log(user);

    const response = await fetch("/api/deletecomment", {
      method: "POST",
      body: JSON.stringify({
        userid,
        message,
        postid: props._id,
        username,
      }),
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
    {
      data.comment && setComments(data.comment);
    }
    console.log(data);

    if (!response.ok) {
      console.log(data || "Something went wrong!");
    }
  };
  const All = useSelector((state: any) => state.user);
  let time = props?.data?.createdAt;
  var date = new Date(time);
  var readable_date = date.toString().slice(0, 25);
  //console.log("timej", date.toString().slice(0, 25));

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
  const verify =
    props.data.name == "Emmanuel " ||
    props.data.name == "test" ||
    props.data.name == "Director Tech" ||
    props.data.name == "bulaba" ||
    props.data.name == "Director Tech II"
      ? true
      : false;
  console.log(verify, props.data.name);

  return (
    <>
      {
        <div className="bg-[white] h-fit drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)] text-white lg:w-6/12 ml-auto mr-auto mt-10 mb-10 border-2 diary border-[rgba(0,0,0,0.05)] w-11/12 rounded-xl">
          <div className=" lg:w-full mb-10   rounded-t-xl h-fit w-fullp-4  md:p-6">
            <div className="flex border-2 border-b-blue-800  items-center h-[60%] md:w-10/12 justify-between ml-auto mr-auto lg:px-4">
              <div className="flex gap-4 md:gap-6 items-center ">
                {!verify && (
                  <img
                    className=" mt-5 ml-2 w-[25px] drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)] lg:w-[50px] h-[25px] lg:h-[50px] rounded-full "
                    alt=""
                    src="/wolf.png"
                  />
                )}
                {verify && (
                  <img
                    className=" mt-5 ml-2 w-[25px] drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)] lg:w-[50px] h-[25px]  lg:h-[50px] rounded-full "
                    alt=""
                    src="/verify.png"
                  />
                )}
                <Link href={`/user/${props?.data?._id}`}>
                  <p className=" mt-5  text-blue-600 hover:underline cursor-pointer font-bold">
                    {props?.data?.name}
                  </p>
                </Link>

                <p className=" mt-5 w-[150px] lg:w-fit text-[10px] text-blue-600">
                  {readable_date}
                </p>
              </div>
            </div>

            <p className=" mb-4 mt-10 px-6 text-center text-[20px] leading-[25px] text-[#050505] whitespace-pre-wrap break-words isolate font-semibold ">
              {props?.title}
            </p>
          </div>

          {props?.image && (
            <motion.img
              className="ml-auto mr-auto rounded-[8px] max-h-[50vh] "
              // whileHover={{
              //   scale: 1,
              // }}
              // whileTap={{
              //   width: "80%",
              //   height: "50%",
              // }}
              // drag
              // dragConstraints={{
              //   right: 5,
              //   left: 5,
              //   top: 3,
              //   bottom: 3,
              // }}
              //variants={variants}
              //animate="lion"
              src={props.image !== "" ? props.image : ""}
              alt="icon"
            />
          )}
          <p className="w-11/12 ml-auto text-[#050505] mr-auto whitespace-pre-wrap break-words isolate font-normal">
            {props?.text}
            <span className="cursor-pointer">{"  "}ReadMore...</span>
          </p>
          <p className="ml-2 leading-[1.3333] text-[.9375rem]  italic font-semibold text-[#65676B]">
            {vawo?.length === 1
              ? `${vawo?.length} person loves this post`
              : vawo?.length === 0
              ? `nobody loves this post yet`
              : `${vawo?.length} people loves this post`}
          </p>
          <div className="flex flex-wrap">
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
              className="  p-[3px] m-2 text-[.9375rem] leading-5 cursor-pointer h-[30px] rounded-[14px] mt-4 w-[100px] text-center bg-[#1876f2] font-semibold text-[#fffffe]"
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
              className="  p-[3px] m-2 text-[.9375rem] leading-5 cursor-pointer h-[30px] rounded-[14px] mt-4 w-[100px] text-center bg-[#1876f2] font-semibold text-[#fffffe]"
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
              className="  p-[3px] m-2 text-[.9375rem] leading-5 cursor-pointer h-[30px] rounded-[14px] mt-4 w-[100px] text-center bg-[#1876f2] font-semibold text-[#fffffe] "
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
                className="  p-[3px] m-2 text-[.9375rem] leading-5 cursor-pointer h-[30px] rounded-[14px] mt-4 w-[100px] text-center bg-[#1876f2] font-semibold text-[#fffffe]"
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
                className="  p-[3px] m-2 text-[.9375rem] leading-5 cursor-pointer h-[30px] rounded-[14px] mt-4 w-[100px] text-center bg-[#1876f2] font-semibold text-[#fffffe]"
              >
                delete{" "}
              </motion.i>
            ) : null}
          </div>
          <div className="flex flex-col px-2">
            <textarea
              className="m-2 text-[#94a1b2] h-[40px] text-[12px] resize-none bg-[#F0F2F5]  font-semibold outline-none border-none px-4 p-2 border-[2px] rounded-full "
              placeholder="comment osiso"
              value={com}
              onChange={(e) => {
                setCom(e.target.value);
              }}
            />
            <button
              onClick={submitcom}
              className=" p-[3px] m-2 text-[.9375rem] leading-5 cursor-pointer h-[30px] rounded-[14px] mt-4 w-[100px] text-center bg-[#1876f2] font-semibold text-[#fffffe]"
            >
              {All.loading ? "loading" : "submit"}
            </button>
          </div>
          <div className="mt-2 ">
            {comments?.slice(0, current).map((comment: any, i) => {
              return (
                <div key={i} className="w-fit flex ">
                  <img
                    className=" rounded-full h-[25px] w-[25px]"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS03bhrOEaH7FfjBpoKth3GuRHbgwPaZkl2RTTteMn3g&s"
                    alt="icon"
                  />

                  <div>
                    <Link href={`user/${comment.userid}`}>
                      <p className=" mt-1 ml-4 text-[black] text-[.8125rem] font-semibold cursor-pointer">
                        {comment.username}
                      </p>
                    </Link>
                    <span className=" italic ml-4 text-[#94a1b2] font-normal leading-[1.3333] text-[.9375rem]">
                      {comment.message}{" "}
                      {id === comment.userid && (
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
