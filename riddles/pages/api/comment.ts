import { log } from "console";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
  email: string;
  password: string;
};

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri =
  "mongodb+srv://paul:VYzrXn10RggsHNba@hidden.ffwfj4g.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const handler = async (req: NextApiRequest, res: NextApiResponse, err: any) => {
  const { username, userid, text, postid, tag } = req.body;
  if (req.method === "POST") {
    if (!username || !userid || text.trim() === "" || !postid) {
      res.status(422).json({ message: "Invalid input, something is missing" });
      return;
    }
    console.log("_id:", `ObjectId("${postid}")`);
    const data = { username: username, userid: userid, message: text };
    // if (!client.connected()) await client.connect();
    //if (err) throw err;
    const db = await client.db("hidden");
    const user = await db.collection("posts").findOneAndUpdate(
      { _id: ObjectId(postid) },
      {
        $push: {
          comment: data,
        },
      },
      { upsert: true }
    );
    const post = await db
      .collection("posts")
      .findOne({ _id: ObjectId(postid) });
    if (tag) {
      console.log(tag);

      const user = await db.collection("users").findOneAndUpdate(
        { name: tag },
        {
          $push: {
            notification: {
              message: "you've been tagged on this post",
              postid: postid,
            },
          },
        },
        { upsert: true }
      );
      const update = await db
        .collection("users")
        .updateOne({ name: tag }, { $inc: { notify: 1 } });
    }
    res.status(200).json({
      message: "user succesfully commented 🦄 🦄",
      comment: post.comment,
    });

    //db.close();
  }
  res.status(400).json({
    message:
      " 🦄 🦄 you can't comment on this post for now. post under review or deleted",
  });
};
export default handler;
