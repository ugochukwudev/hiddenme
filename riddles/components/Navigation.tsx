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
    <div className="top-[-1px] z-50 h-[200px] lg:h-[80px] grid md:grid-cols-2 grid-cols-1 bg-[#242629] text-[#fffffe] w-full sticky">
      <Link href="/">
        <motion.div
          className=" text-2xl italic ml-4 lg:ml-10 mt-5 cursor-pointer flex "
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
      <ul className="flex  flex-wrap font-semibold pt-5 gap-4">
        <Link href="/upload">
          <li className=" hover:underline  cursor-pointer p-2 text-center text-[#fffffe]  text-[18px] italic ">
            Create post
          </li>
        </Link>
        <Link href="/saved-diary">
          <li className=" hover:underline  cursor-pointer p-2 text-center text-[#fffffe]  text-[18px] italic ">
            saved
          </li>
        </Link>
        <Link href="/my-diaries">
          <li className=" hover:underline  cursor-pointer p-2 text-center text-[#fffffe] text-[18px] italic ">
            My Diaries
          </li>
        </Link>
        <Link href={`user/${id}`}>
          <li className=" hover:underline  cursor-pointer p-2 text-center text-[#fffffe] text-[18px] italic ">
            {name === "" ? "user" : !name ? "user" : name}
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default Nav;
