import type { NextPage } from "next";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
const Nav = () => {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("You are on the browser");
      var newObject: any = window.localStorage.getItem("user");
      var data = JSON.parse(newObject);
    }
    {
      newObject && setName(data?.user?.user?.name);
      newObject && setId(data?.user?.user?._id);
    }
  }, []);

  const boxvariants = {
    hidden: {
      x: "-100vw",
    },
    logo: {
      x: 0,
      transition: {
        delay: 0.5,
        when: "beforeChildren",
        staggerChildren: 100,
      },
    },
  };
  const boxtitle = {
    hidden: {
      x: -10,
      opacity: 0,
    },
    text: {
      x: 0,
      opacity: 1,
      staggerChildren: 2,
      transition: {
        delay: 2,
        staggerChildren: 100,
      },
    },
  };
  let logonames = [
    "h",
    "i",
    "d",
    "d",
    "e",
    "n",
    "",
    "",
    "",
    "m",
    "e",
    ".",
    ".",
    ".",
  ];
  return (
    <div className="top-0 z-50 grid md:grid-cols-2 grid-cols-1 bg-[#1D2639] text-white w-full sticky">
      <Link href="/">
        <motion.div
          className=" text-2xl italic ml-10 mt-10 cursor-pointer flex "
          variants={boxvariants}
          animate="logo"
          initial="hidden"
        >
          {logonames.map((data) => {
            return (
              <h1 className="hover:scale-[1.1] " key={Math.random()}>
                {data}
              </h1>
            );
          })}
        </motion.div>
      </Link>
      <ul className="flex p-8 flex-wrap font-semibold text-base leading-[20px]">
        <Link href="/login">
          <li className="m-4 hover:bg-transparent hover:text-white hover:border-white border-2  cursor-pointer p-2 w-[100px] text-center rounded-full bg-white text-black">
            Login
          </li>
        </Link>
        <Link href="/register">
          <li className="m-4 hover:bg-transparent hover:text-white hover:border-white border-2  cursor-pointer p-2 w-[100px] text-center rounded-full bg-white text-black">
            Register
          </li>
        </Link>
        <Link href="/my-diaries">
          <li className="m-4 hover:bg-transparent hover:text-white hover:border-white border-2  cursor-pointer p-2 w-[100px] text-center rounded-full bg-white text-black">
            My Diaries
          </li>
        </Link>
        <Link href={`user/${id}`}>
          <li className="m-4 hover:bg-transparent hover:text-white hover:border-white border-2  cursor-pointer p-2 w-[100px] text-center rounded-full bg-white text-black">
            {name === "" ? "user" : !name ? "user" : name}
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default Nav;
