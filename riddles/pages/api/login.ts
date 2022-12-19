import { log } from "console";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  email: string;
  password: string;
};

const { MongoClient, ServerApiVersion } = require("mongodb");

const client = new MongoClient(process.env.URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const handler = async (req: NextApiRequest, res: NextApiResponse, err: any) => {
  const { email, password } = req.body;
  if (req.method === "POST") {
    if (!email || !email.includes("@") || password.trim() === "") {
      res.status(422).json({ message: "Invalid input." });
      return;
    }
    // if (!client.connected()) await client.connect();
    //if (err) throw err;
    const db = await client.db("hidden");

    const user = await db.collection("users").findOne({ email: email });
    // console.log("user:", user.email);

    //db.close();
    if (user && user.password !== password) {
      res.status(400).json({
        message:
          "invalid password or email dude . Hope you're not a termux hacker ??",
      });
    }
    if (user.password === password) {
      const userData = await db.collection("users").findOne({ email: email });
      //.toArray(function (err: any, result: any) {

      res.status(200).json({
        message:
          "user succesfully logged in to the world of magic and bla bla bla ",
        user: { user: userData },
      });
    } else {
      res.status(400).json({
        message: "wrong credentials",
      });
    }
  }
};
export default handler;
