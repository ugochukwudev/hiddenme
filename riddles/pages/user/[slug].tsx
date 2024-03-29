import React from "react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Post from "../../components/post";
import Link from "next/link";
const { MongoClient, ServerApiVersion } = require("mongodb");
import { useSelector, useDispatch } from "react-redux";
import { setalert, setalertOff, alerttext } from "../../store/alert";
import Alert from "../../components/Alert";
const User = (props: any) => {
  const dispatch = useDispatch();
  const show = useSelector(
    (state: { user: {}; alert: { text: string; show: boolean } }) =>
      state.alert.show
  );
  const { post } = props;
  const all = JSON?.parse(post);
  console.log(all);
  // const datas = post.user.user;
  const posts = all?.user;
  const datas = posts;
  const [user, setUser] = useState([] as any);
  const [message, setMessage] = useState<string>();
  const router = useRouter();
  const slug: any = router.query.slug;
  console.log(slug);
  const submitData = async () => {
    const response = await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify({ id: slug }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response?.json();
    console.log(data);
    setUser(data);
  };

  if (typeof window !== "undefined") {
    console.log("You are on the browser");
    var newObject: any = window.localStorage.getItem("user");
    var data = JSON.parse(newObject);
    console.log("data", data, "");
  }
  useEffect(() => {
    submitData();
  }, []);
  const result = datas.filter(
    (role: { data: { _id: string } }) => role.data._id == user?.user?._id
  );
  console.log(result);
  const submitmessage = async () => {
    const response = await fetch("/api/adminnotification", {
      method: "POST",
      body: JSON.stringify({
        username: user?.user?.name,
        text: `message from admin. dear ${user?.user?.name},  ${message}`,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const requestdata = await response.json();
    dispatch(alerttext(data?.message));
    dispatch(setalert());
    setTimeout(() => {
      dispatch(setalertOff());
    }, 3000);
  };
  const verify =
    user?.user?.name == "Emmanuel " ||
    user?.user?.name == "test" ||
    user?.user?.name == "Director Tech" ||
    user?.user?.name == "bulaba" ||
    user?.user?.name == "Director Tech II"
      ? true
      : false;
  return (
    <div className="bg-[#F0F2F5] min-h-[calc(100vh-300px)]">
      <div className="w-full lg:w-6/12 ml-auto  text-center  mr-auto mt-6 p-4 drop-shadow-[0_35px_35px_#1d2e47] h-fit bg-transparent">
        {!verify && (
          <img
            className="w-3/12 h-[50%] ml-auto mr-auto  rounded-[50%] "
            src="/wolf.png"
            alt="no data"
          />
        )}
        {verify && (
          <img
            className="w-3/12 h-[50%] ml-auto mr-auto  rounded-[50%] "
            src="/verify.png"
            alt="no data"
          />
        )}
        <p className="text-white font-bold text-xl cursor-pointer">
          {user?.user?.name}
        </p>
        {!user.user && (
          <p className="text-blue-600 font-extrabold text-2xl text-center mt-10">
            User account might have been deleted
          </p>
        )}
        {user?.user?.name !== data?.user?.user?.name && (
          <p className="text-blue-600 text-xl px-4 border-2 py-1 border-blue-600  text-center ml-auto mr-auto hover:font-bold mt-10 rounded-full hover:bg-blue-600 hover:text-[white] cursor-pointer">
            Report user
          </p>
        )}

        {data?.user?.user?._id === slug && (
          <Link href="/changepassword">
            <p className="text-blue-600 text-xl px-2 py-1 border-2  border-blue-600 w-fit text-center ml-auto mr-auto hover:font-bold mt-10 rounded-full hover:bg-blue-600 hover:text-[white] cursor-pointer">
              change password
            </p>
          </Link>
        )}
        {data?.user?.user?.name === "admin" && (
          <>
            <input
              onChange={(e) => setMessage(e.target.value)}
              type="text"
              placeholder="send notification"
              className="mt-4 bg-transparent w-6/12 p-4 rounded-full border-[1px] border-white outline-0 text-white font-medium italic leading-[20px] tracking-[-0.5px] "
            />
            <p
              onClick={submitmessage}
              className="text-white text-xl px-4 py-1 border-2 border-white w-6/12 text-center ml-auto mr-auto mt-10 hover:font-bold rounded-full hover:bg-white hover:text-[#1d2e47] cursor-pointer"
            >
              send Notification
            </p>
          </>
        )}
      </div>

      {user?.user?._id !== data._id &&
        result?.map((post: {}, index: number) => {
          return <Post key={index * Math.random()} {...post} />;
        })}
      {result < 1 && (
        <>
          <p className="text-center text-blue-600 font-extrabold italic ">
            please wait while our system finds the user you're looking for ...
          </p>
          <p className="text-center text-blue-600 font-extrabold italic ">
            Loading user data ...
          </p>
        </>
      )}
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
export default User;
