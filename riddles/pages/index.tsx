import type { NextPage } from "next";
import Head from "next/head";
import Post from "../components/post";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState, useLayoutEffect } from "react";

const { MongoClient, ServerApiVersion } = require("mongodb");

const Home: NextPage = (props: any) => {
  const { post } = props;
  const all = JSON.parse(post);
  console.log(all);
  // const datas = post.user.user;
  const posts = all?.user;
  const [data, setData] = useState("");
  const [notification, setNotification] = useState({} as number);
  const [id, setId] = useState({} as string);

  const [user, setUser] = useState({});
  const relogin = async (email: string, password: string) => {
    const response = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ email: email, password: password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response?.json();
    {
      data && window?.localStorage?.setItem("user", JSON?.stringify(data));
    }
    console.log(data);
    setUser(data);
    if (!response.ok) {
      console.log(data || "Something went wrong!");
    }
  };
  console.log(post?.user?.user);
  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("You are on the browser");
      var newObject: any = window.localStorage.getItem("user");
      var data = JSON?.parse(newObject);
    }
    {
      !data && window?.location?.replace("/login");
    }
    {
      setData(data?.user?.user?.name);

      newObject && setId(data?.user?.user?._id);
      relogin(data?.user?.user?.email, data?.user?.user?.password);
    }
  }, []);
  const submitnotification = async () => {
    const response = await fetch("/api/clearnotification", {
      method: "POST",
      body: JSON.stringify({ userid: id }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    {
      data && setNotification(data.notify);
    }
    console.log(data);

    if (!response.ok) {
      console.log(data || "Something went wrong!");
    }
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      var newObject: any = window.localStorage.getItem("user");
      var data = JSON.parse(newObject);
    }
    setNotification(data?.user?.user?.notify);
  }, []);
  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      console.log("You are on the browser");
      var newObject: any = window.localStorage.getItem("user");
      var data = JSON.parse(newObject);
      setUser(data);
      console.log("wee", user);
    }
  }, []);
  return (
    <>
      {user && (
        <div className="bg-[#7B8CA6]">
          <div className="bg-[#465975] h-fit p-2 z-10 flex-wrap sticky top-[135px]">
            <Link href="/upload">
              <motion.button className="bg-white hover:text-white hover:bg-transparent  text-black mt-4 ml-10 p-2 rounded-full font-bold">
                Add to diary
              </motion.button>
            </Link>
            <Link href="/saved-diary">
              <button className="bg-white hover:text-white hover:bg-transparent text-black mt-4 ml-10 p-2 rounded-full font-bold">
                Saved diary
              </button>
            </Link>
            <Link href="/notifications">
              <button
                onClick={() => submitnotification()}
                className="bg-white hover:text-white hover:bg-transparent  text-black mt-4 ml-10 p-2 rounded-full font-bold"
              >
                {`notification(${notification})`}
              </button>
            </Link>
            <Link href="/login">
              <button
                onClick={() => {
                  window?.localStorage?.setItem("user", JSON.stringify(""));
                }}
                className="bg-white hover:text-white hover:bg-transparent w-[100px] text-black mt-4 ml-6 p-2 rounded-full font-bold"
              >
                Logout
              </button>
            </Link>
          </div>
          {posts?.map((post: any, i: number) => {
            if (typeof window !== "undefined") {
              console.log("You are on the browser");
              var newObject: any = window.localStorage.getItem("user");
              var data = JSON.parse(newObject);
              console.log("data", data);
            }

            return <Post key={post._id} {...post} {...data} />;
          })}
        </div>
      )}
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
export default Home;
