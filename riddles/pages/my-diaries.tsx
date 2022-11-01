import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Post from "../components/post";
import { useEffect, useState } from "react";
const { MongoClient, ServerApiVersion } = require("mongodb");
const Diaries: NextPage = (props: any) => {
  const { post } = props;
  const all = JSON.parse(post);
  console.log(all);
  // const datas = post.user.user;
  const posts = all?.user;
  const datas = posts;

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
    (role: { data: { _id: string } }) => role.data._id == datacontent
  );
  console.log(result);
  return (
    <div className="bg-[#7B8CA6] ">
      {!result.lenght && <p className="text-green-900">nooooooooooooooo</p>}
      {result?.map((post: {}, index: number) => {
        return <Post key={index * Math.random()} {...post} />;
      })}
    </div>
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

export default Diaries;
