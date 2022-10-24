import React from "react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Post from "../../components/post";
const User = (props: any) => {
  const { post } = props;
  console.log(post);
  const datas = post.user.user;
  const [user, setUser] = useState([] as any);

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

    const data = await response.json();
    console.log(data);
    setUser(data);
  };
  if (typeof window !== "undefined") {
    console.log("You are on the browser");
    var newObject: any = window.localStorage.getItem("user");
    var data = JSON.parse(newObject);
    console.log("data", data);
  }
  useEffect(() => {
    submitData();
  }, []);
  const result = datas.filter(
    (role: { data: { _id: string } }) => role.data._id == user?.user?._id
  );
  console.log(result);
  return (
    <div>
      <div className=" w-6/12 ml-auto text-center  mr-auto mt-6 p-4 drop-shadow-[0_35px_35px_#1d2e47] h-fit bg-transparent">
        <img
          className="w-3/12 h-[50%] ml-auto mr-auto  rounded-[50%] "
          src="/wolf.png"
          alt="no data"
        />
        <p className="text-white font-bold text-xl cursor-pointer">
          {user?.user?.name}
        </p>
        {!user.user && (
          <p className="text-white font-extrabold text-2xl text-center mt-10">
            User account have been deleted
          </p>
        )}
        {user?.user && (
          <p className="text-white text-xl p-4 border-2 border-white w-3/12 text-center ml-auto mr-auto hover:font-bold mt-10 rounded-full hover:bg-white hover:text-[#1d2e47] cursor-pointer">
            Report user
          </p>
        )}
        {user?.user?.name === "admin" && (
          <p className="text-white text-xl p-4 border-2 border-white w-6/12 text-center ml-auto mr-auto mt-10 hover:font-bold rounded-full hover:bg-white hover:text-[#1d2e47] cursor-pointer">
            send Notification
          </p>
        )}
      </div>

      {result?.map((post: {}, index: number) => {
        return <Post key={index * Math.random()} {...post} />;
      })}
      {result < 1 && (
        <p className="text-center text-white font-extrabold italic ">
          user get no data{" "}
        </p>
      )}
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
export default User;
