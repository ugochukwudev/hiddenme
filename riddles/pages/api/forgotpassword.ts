import type { NextApiRequest, NextApiResponse } from "next";
var nodemailer = require("nodemailer");
type Data = {
  name: string;
  email: string;
  password: string;
};

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
var transporter = nodemailer.createTransport({
  service: "gmail", //name of email provider
  auth: {
    user: "paulambrose5002@gmail.com", // sender's gmail id
    pass: process.env.PASS, // sender password
  },
});

const client = new MongoClient(process.env.URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const handler = async (req: NextApiRequest, res: NextApiResponse, err: any) => {
  const { email } = req.body;

  if (req.method === "POST") {
    if (!email) {
      res.status(422).json({ message: "please  try again" });
      return;
    }

    // if (!client.connected()) await client.connect();
    //if (err) throw err;

    const db = await client.db("hidden");
    const user = await db.collection("users").findOne({ email: email });
    if (user?.email !== email) {
      res.status(200).json({
        message: "omo otilo. you're doing something wrong 😒😒😒😒",
      });
    }
    if (user.email === email) {
      let key = Math.random() + 10 * 5;
      const user = await db.collection("users").findOneAndUpdate(
        { email: email },
        {
          $set: {
            password: key,
          },
        },
        { upsert: true }
      );
      var mailOptions = {
        from: "paulambrose5002@gmail.com", // sender's gmail
        to: email, // receiver's gmail
        subject: "your temporal password", //subject
        text: `your temporal password is ${key}`, //message Description
      };
      transporter.sendMail(
        mailOptions,
        function (error: any, info: { response: string }) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        }
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
