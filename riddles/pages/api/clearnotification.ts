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
  const { userid } = req.body;
  if (req.method === "POST") {
    if (!userid) {
      res.status(422).json({ message: "Invalid input, something is missing" });
      return;
    }
    console.log("_id:", `ObjectId("${userid}")`);

    // if (!client.connected()) await client.connect();
    //if (err) throw err;
    const db = await client.db("hidden");
    const update = await db
      .collection("users")
      .updateOne({ _id: ObjectId(userid) }, { $set: { notify: 0 } });
    const notify = await db
      .collection("users")
      .findOne({ _id: ObjectId(userid) });
    res.status(200).json({
      message: "user succesfully reset notification tab🦄 🦄",
      notify: notify.notify,
    });
  }
};

export default handler;
