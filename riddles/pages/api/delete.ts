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
  const { userid, postid } = req.body;
  if (req.method === "POST") {
    if (!userid || !postid) {
      res.status(422).json({
        message: "something is wrong . please re login and try again",
      });
      return;
    }
    console.log("_id:", `ObjectId("${postid}")`);
    const data = { userid: userid };
    // if (!client.connected()) await client.connect();
    //if (err) throw err;

    const db = await client.db("hidden");

    const user = await db
      .collection("posts")
      .deleteOne({ _id: ObjectId(postid) });

    res.status(200).json({
      message:
        "deleted a golden vawolence 😭😭😭😭 you won't see this post once you refresh",
      saved: user,
    });
    console.log(user);

    res.status(400).json({
      message:
        "something spiritual 🦄 🦄 your village people are after our database 😂",
    });
  }
};
export default handler;
