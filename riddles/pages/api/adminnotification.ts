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
  const { username, text } = req.body;
  if (req.method === "POST") {
    if (!username || text.trim() === "") {
      res.status(422).json({ message: "Invalid input, something is missing" });
      return;
    }

    const db = await client.db("hidden");
    const user = await db.collection("users").findOneAndUpdate(
      { name: username },
      {
        $push: {
          notification: {
            message: text,
          },
        },
      },
      { upsert: true }
    );
    const update = await db
      .collection("users")
      .updateOne({ name: username }, { $inc: { notify: 1 } });

    res.status(200).json({
      message: "admin succesfully notified user 🦄 🦄",
    });

    //db.close();
  }
};
export default handler;
