import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Post from "../components/post";
import { useEffect, useState } from "react";
import Alert from "../components/Alert";
import { useSelector, useDispatch } from "react-redux";
import { setalert, setalertOff, alerttext } from "../store/alert";
const { MongoClient, ServerApiVersion } = require("mongodb");
const Diaries: NextPage = (props: any) => {
  const dispatch = useDispatch();
  const { post } = props;
  const all = JSON.parse(post);
  console.log(all);
  // const datas = post.user.user;
  const posts = all?.user;
  const datas = posts;
  const show = useSelector(
    (state: { user: {}; alert: { text: string; show: boolean } }) =>
      state.alert.show
  );
  const [datacontent, setData] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("You are on the browser");
      var newObject: any = window.localStorage.getItem("user");
      var data = JSON.parse(newObject);
    }
    {
      data && setData(data.user.user._id);

      dispatch(alerttext(data?.message));
      dispatch(setalert());
      setTimeout(() => {
        dispatch(setalertOff());
      }, 3000);
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
    <div className="bg-[#F0F2F5] min-h-[calc(100vh-300px)]">
      {result.lenght < 1 && (
        <p className="text-green-900 text-center font-black text-[40px]">
          User have no post yet{" "}
        </p>
      )}
      {result?.map((post: {}, index: number) => {
        return <Post key={index * Math.random()} {...post} />;
      })}
      {show && <Alert />}
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
