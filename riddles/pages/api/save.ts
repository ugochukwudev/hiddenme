import { log } from "console";
import { Db } from "mongodb";
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
            saved: data,
          },
        },
        { upsert: true }
      );

      res.status(200).json({
        message: "user saved a cup of vawolence 🦄 🦄 +++++++",
        saved: user.saved,
      });
    } else {
      const user = await db.collection("posts").findOneAndUpdate(
        { _id: ObjectId(postid) },
        {
          $pull: {
            saved: data,
          },
        }
      );
      res.status(200).json({
        message: "user unsaved a cup of vawolence 🦄 🦄 ----",
        saved: user.saved,
      });
    }

    //db.close();
  }
};
export default handler;
