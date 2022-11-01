import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import Post from "../components/post";
const { MongoClient, ServerApiVersion } = require("mongodb");
const Notifications: NextPage = (props: any) => {
  const { post } = props;
  const all = JSON.parse(post);
  console.log(all);
  // const datas = post.user.user;
  const posts = all?.user;
  const [datas, setDatas] = useState([]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("You are on the browser");
      var newObject: any = window.localStorage.getItem("user");
      var data = JSON.parse(newObject);
      var notify = data.user.user.notification;
    }
    {
      data && setDatas(notify);
    }
  }, []);
  console.log(datas);

  return (
    <>
      <h1 className="text-yellow-500 text-2xl text-center">Notifications...</h1>
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
                  <>
                    <Post key={post._id} {...post[0]} {...data} />
                  </>
                </div>
              );
            }
          )}
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
