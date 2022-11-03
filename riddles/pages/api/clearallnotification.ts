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

    const db = await client.db("hidden");
    const user = await db.collection("users").findOneAndUpdate(
      { _id: ObjectId(id) },
      {
        $unset: {
          notification: [],
        },
      },
      { upsert: true }
    );
    const update = await db
      .collection("users")
      .updateOne({ _id: ObjectId(id) }, { $set: { notify: 0 } });

    res.status(200).json({
      message: "cleared 🦄 🦄",
    });

    //db.close();
  }
};
export default handler;
