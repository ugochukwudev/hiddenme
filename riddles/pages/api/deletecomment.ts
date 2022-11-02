import { log } from "console";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
  email: string;
  password: string;
};

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const client = new MongoClient(process.env.URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const handler = async (req: NextApiRequest, res: NextApiResponse, err: any) => {
  const { message, userid, postid, username } = req.body;
  if (req.method === "POST") {
    if (!userid || !postid || !message || !username) {
      res.status(422).json({ message: "please re login and try again" });
      return;
    }
    console.log(username);
    const data = { username: username, userid: userid, message };
    // if (!client.connected()) await client.connect();
    //if (err) throw err;

    const db = await client.db("hidden");

    const user = await db.collection("posts").findOneAndUpdate(
      { _id: ObjectId(postid) },
      {
        $pull: {
          comment: data,
        },
      }
    );
    const post = await db
      .collection("posts")
      .findOne({ _id: ObjectId(postid) });
    res.status(200).json({
      message: "user deleted a cup of vawolence comment 🦄 🦄 ----",
      comment: post.comment,
    });
    console.log(post.comment);
    console.log(data);
  }

  //db.close();

  res.status(400).json({
    message: " 🦄 🦄 your village people are after our database 😂",
  });
};
export default handler;
