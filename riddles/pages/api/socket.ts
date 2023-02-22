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
  const { id } = req.body;
  if (req.method === "POST") {
    if (!id) {
      res.status(422).json({ message: "Invalid input, something is missing" });
      return;
    }
    console.log("_id:", `ObjectId("${id}")`);

    // if (!client.connected()) await client.connect();
    //if (err) throw err;
    const db = await client.db("hidden");

    const post = await db.collection("posts").findOne({ _id: ObjectId(id) });

    res.status(200).json({
      message: "user succesfully commented 🦄 🦄",
      comment: post.comment,
    });

    //db.close();
  }
};
export default handler;
