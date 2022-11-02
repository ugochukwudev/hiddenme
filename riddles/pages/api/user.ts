import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
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
  console.log(id);

  if (req.method === "POST") {
    if (!id) {
      res.status(422).json({ message: "user account is deleted " });
      return;
    }
    // if (!client.connected()) await client.connect();
    //if (err) throw err;
    const db = await client.db("hidden");

    const user = await db.collection("users").findOne({ _id: ObjectId(id) });
    // console.log("user:", user.email);

    //db.close();

    res.status(200).json({
      message: "user info",
      user: user,
    });
  }
  res.status(404).json({
    message: "An error occured dude",
  });
};

export default handler;
