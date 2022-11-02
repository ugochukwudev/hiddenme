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
  const { value, userid, postid } = req.body;
  console.log(value, userid, postid);

  if (req.method === "POST") {
    if (!userid || !postid) {
      res.status(422).json({ message: "please re login and try again" });
      return;
    }
    console.log("_id:", `ObjectId("${postid}")`);
    const data = { userid: userid };
    // if (!client.connected()) await client.connect();
    //if (err) throw err;

    const db = await client.db("hidden");
    if (value) {
      const user = await db.collection("posts").findOneAndUpdate(
        { _id: ObjectId(postid) },
        {
          $push: {
            support: data,
          },
        },
        { upsert: true }
      );
      const post = await db
        .collection("posts")
        .findOne({ _id: ObjectId(postid) });
      res.status(200).json({
        message: "user  🦄 🦄 +++++++",
        vawo: post.support,
      });
      console.log(user);
    } else {
      const user = await db.collection("posts").findOneAndUpdate(
        { _id: ObjectId(postid) },
        {
          $pull: {
            support: data,
          },
        }
      );
      const post = await db
        .collection("posts")
        .findOne({ _id: ObjectId(postid) });
      res.status(200).json({
        message: "user  🦄 🦄 ----",
        vawo: post.support,
      });
      console.log(user);
    }

    //db.close();
  }
  res.status(400).json({
    message: " 🦄 🦄 your village people are after our database 😂",
  });
};
export default handler;
