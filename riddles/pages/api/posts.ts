import type { NextApiRequest, NextApiResponse } from "next";

const { MongoClient, ServerApiVersion } = require("mongodb");

// const uri =
//   "mongodb+srv://paul:VYzrXn10RggsHNba@hidden.ffwfj4g.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(process.env.URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const handler = async (req: NextApiRequest, res: NextApiResponse, err: any) => {
  const { email, password, name } = req.body;
  if (req.method === "POST") {
    // if (!client.connected()) await client.connect();
    //if (err) throw err;
    const db = await client.db("hidden");

    const user = await db
      .collection("posts")
      .find()
      .sort({ title: 1 })
      .toArray();
    // console.log("user:", user.email);

    //db.close();
    //.toArray(function (err: any, result: any) {

    res.status(200).json({
      message: "sucess 🦄 🦄",
      user: { user: user },
    });
  }
};
export default handler;
