import { log } from "console";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
  email: string;
  password: string;
};

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://paul:VYzrXn10RggsHNba@hidden.ffwfj4g.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const handler = async (req: NextApiRequest, res: NextApiResponse, err: any) => {
  const { data } = req.body;
  const { title, text, image } = req.body.user;
  //console.log(image, title, text, data);

  if (req.method === "POST") {
    if (!title || text.includes("@") || !data || text.trim() === "") {
      res.status(422).json({
        message:
          "🦄🦄 Invalid input dude. please make sure you have no email on your diary",
      });
      return;
    }
    // if (!client.connected()) await client.connect();
    //if (err) throw err;
    const db = await client.db("hidden");
    // console.log("user:", user.email);

    //db.close();

    const result = await db.collection("posts").insert({
      title: title,
      text: text,
      image: image,
      data: data,
      comment: [],
      saved: [],
      support: [],
      createdAt: new Date(),
      rec: `${
        Math.random() + 1000 * 10 + 0.2896 + Math.random() + 10 * Math.random()
      }`,
    });
    console.log("fisrt", result);

    //.toArray(function (err: any, result: any) {

    res.status(200).json({
      message: "user succesfully uploaded a new gist 🦄🦄🦄",
    });
  }
};
export default handler;
