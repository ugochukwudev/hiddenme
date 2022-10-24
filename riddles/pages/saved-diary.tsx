import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Post from "../components/post";
import { useEffect, useState } from "react";

const Saved: NextPage = (props: any) => {
  const { post } = props;
  console.log(post);
  const datas = post.user.user;

  const [datacontent, setData] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("You are on the browser");
      var newObject: any = window.localStorage.getItem("user");
      var data = JSON.parse(newObject);
    }
    {
      data && setData(data.user.user._id);
    }

    {
      !data && window.location.replace("/login");
    }
  }, []);
  const result = datas.filter(
    (role: { saved: any[] }) =>
      role.saved.filter((group) => datacontent.indexOf(group.userid) > -1)
        .length
  );
  console.log(result);

  return (
    <div className="bg-[#7B8CA6] ">
      {result?.map((post: any, index: number) => {
        return <Post key={post._id} {...post} />;
      })}
    </div>
  );
};
export async function getServerSideProps() {
  //export function getStaticProps(context) {
  //const { params } = context;
  //const { slug } = params;

  const response = await fetch("http://localhost:3000/api/posts", {
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
export default Saved;
