import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import Alert from "../components/Alert";
import Post from "../components/post";
import { setalert, setalertOff, alerttext } from "../store/alert";
import { useSelector, useDispatch } from "react-redux";
const { MongoClient, ServerApiVersion } = require("mongodb");
const Notifications: NextPage = (props: any) => {
  const dispatch = useDispatch();
  const { post } = props;
  const all = JSON.parse(post);
  console.log(all);
  const show = useSelector(
    (state: { user: {}; alert: { text: string; show: boolean } }) =>
      state.alert.show
  );
  // const datas = post.user.user;
  const posts = all?.user;
  const [datas, setDatas] = useState([]);
  const [id, setId] = useState<any>();
  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("You are on the browser");
      var newObject: any = window.localStorage.getItem("user");
      var data = JSON.parse(newObject);
      var id = data?.user?.user?._id;
      var notify = data.user.user.notification;
    }
    {
      data && setDatas(notify), setId(id);
    }
  }, []);
  console.log(datas);
  const clearallNotification = async () => {
    const response = await fetch("/api/clearallnotification", {
      method: "POST",
      body: JSON.stringify({ id: id }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    {
      data && dispatch(alerttext(data?.message));
      dispatch(setalert());
      setTimeout(() => {
        dispatch(setalertOff());
      }, 3000);
    }
    window.location.pathname = "/";
  };
  return (
    <>
      <h1 className="text-yellow-500 text-2xl text-center">Notifications...</h1>
      <p
        onClick={() => clearallNotification()}
        className="text-[#1D2639] font-medium cursor-pointer leading-[20px] tracking-[-0.5px] italic text-center"
      >
        Clear all notification...
      </p>
      <div className="flex w-full flex-col">
        {datas &&
          datas?.map(
            (notification: { message: string; postid: string }, i: number) => {
              if (typeof window !== "undefined") {
                console.log("You are on the browser");
                var newObject: any = window.localStorage.getItem("user");
                var data = JSON.parse(newObject);
                console.log("data", data);
              }
              console.log("p", posts);
              const post = posts.filter(
                (role: { _id: string }) => role._id === notification.postid
              );
              console.log("result", post[0]?._id);
              return (
                <div key={i} className="w-full text-center p-4">
                  <span className="border-2 border-yellow-500 text-white cursor-pointer rounded-full p-2 m-4">
                    {notification.message}
                  </span>
                  {post[0]?._id !== undefined && (
                    <>
                      <Post key={post._id} {...post[0]} {...data} />
                    </>
                  )}
                </div>
              );
            }
          )}
        {show && <Alert />}
      </div>
    </>
  );
};
export async function getServerSideProps() {
  //const [dataset, setDataSet] = useState({} as any);
  const client = new MongoClient(process.env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });
  const handler = async () => {
    // if (!client.connected()) await client.connect();
    //if (err) throw err;
    const db = await client.db("hidden");
    const user = await db
      .collection("posts")
      .find()
      .sort({ title: 1 })
      .toArray();
    return {
      message: "sucess 🦄 🦄",
      user: user,
    };
  };
  const data = await handler();
  let all = JSON.stringify(data);
  console.log(data);

  return {
    props: {
      post: all,
    },
  };
}

export default Notifications;
