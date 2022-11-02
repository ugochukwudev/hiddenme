import { log } from "console";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
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
  const { email, password, name } = req.body;
  if (req.method === "POST") {
    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      name === "admin"
    ) {
      res.status(422).json({ message: "Invalid input." });
      return;
    }
    // if (!client.connected()) await client.connect();
    //if (err) throw err;
    const db = await client.db("hidden");

    const user = await db.collection("users").findOne({ email: email });
    // console.log("user:", user.email);
    const namee = await db.collection("users").findOne({ name: name });
    //db.close();
    if (user) {
      res.status(400).json({
        message:
          "🦄 🦄 🦄user with email already exist and his password is olololo buga oooh",
      });
    } else if (namee) {
      res.status(400).json({
        message:
          "🦄 🦄 🦄user with name already exist and his password is ewo ewo kilode ooh",
      });
    } else {
      const result = await db.collection("users").insert({
        email: email,
        password: password,
        name: name,
        createdAt: new Date(),
        notify: 0,
        notification: [],
      });
      console.log("fisrt", result);

      const userData = await db.collection("users").findOne({ email: email });
      //.toArray(function (err: any, result: any) {

      res.status(200).json({
        message: "user succesfully registered 🦄 🦄",
        user: { user: userData },
      });
    }
  }
};
export default handler;
