import React from "react";

const PostData = async () => {
  const response = await fetch(`https://hiddenme.vercel.app/api/posts`, {
    method: "POST",
    body: JSON.stringify({ user: "test" }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  console.log(data);

  //   return {
  //     props: {
  //       post: data,
  //     },
  return "sssis";
};

export default PostData;
