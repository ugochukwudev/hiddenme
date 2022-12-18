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
  const { email, message, name, receiver } = req.body;

  if (req.method === "POST") {
    if (!email || !message || !name) {
      res.status(422).json({ message: "incomplete credentials" });
      return;
    }

    // if (!client.connected()) await client.connect();
    //if (err) throw err;
    if (!email.includes(".")) {
      res.status(400).json({
        message: "email is not a valid email",
      });
    } else {
      var mailOptions = {
        from: "paulambrose5002@gmail.com", // sender's gmail
        to: receiver, // receiver's gmail
        subject: "someone just filled your portfolio contact form", //subject
        text: ` name: ${name} \n email : ${email} \n message: ${message}`, //message Description
      };
      var mailOptions2 = {
        from: "paulambrose5002@gmail.com", // sender's gmail
        to: email, // receiver's gmail
        subject: "thanks for contacting me", //subject
        text: `dear ${name.toUpperCase()}, please be patient as I have to go through your messsage before replying .`, //message Description
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
      transporter.sendMail(
        mailOptions2,
        function (error: any, info: { response: string }) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        }
      );
      res.status(200).json({
        message: "sent successfully!",
      });
    }
  }

  //db.close();
};
export default handler;
