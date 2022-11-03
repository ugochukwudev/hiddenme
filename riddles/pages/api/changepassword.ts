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
  const { userid, password, newpassword } = req.body;

  if (req.method === "POST") {
    if (!userid || !password || !newpassword) {
      res.status(400).json({ message: "please re login and try again" });
      return;
    }

    // if (!client.connected()) await client.connect();
    //if (err) throw err;

    const db = await client.db("hidden");
    const user = await db.collection("users").findOne({ password: password });
    if (user.password === newpassword) {
      res.status(200).json({
        message:
          "omo otilo. you can't use you'r old password as your new password 😒😒😒😒",
      });
    } else {
      const user = await db.collection("users").findOneAndUpdate(
        { _id: ObjectId(userid) },
        {
          $set: {
            password: newpassword,
          },
        },
        { upsert: true }
      );

      res.status(200).json({
        message: "password changed successfully",
      });
      console.log(user);
    }
  }

  //db.close();
};
export default handler;
