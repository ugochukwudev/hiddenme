import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import Post from "../components/post";

const Notifications: NextPage = (props: any) => {
  const [datas, setDatas] = useState([]);
  const { post } = props;

  const posts = post.user.user;
  console.log(posts);
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
              console.log("p", posts);
              const main = posts.filter(
                (role: { _id: string }) => role._id === notification.postid
              );
              console.log("result", main);
              return (
                <div key={i} className="w-full text-center p-4">
                  <span className="border-2 border-yellow-500 text-white cursor-pointer rounded-full p-2 m-4">
                    {notification.message}
                  </span>
                  <>
                    <Post key={i} {...main} />;
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
  //export function getStaticProps(context) {
  //const { params } = context;
  //const { slug } = params;

  const response = await fetch(`${process.env["HOST"]}/api/posts`, {
    method: "POST",
    body: JSON.stringify({ user: "test" }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  return {
    props: {
      post: data,
    },
  };
}

export default Notifications;
