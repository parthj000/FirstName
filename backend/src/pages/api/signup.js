// src/pages/api/signup.js
import { sendMail } from "@/lib/nodemailer";
import clientPromise from "../../lib/mongodb";
import bcrypt from "bcryptjs";
const crypto = require("crypto");

export default async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { username, email, firstname, lastname } = req.body;

  if (!username || !email || !firstname || !lastname) {
    return res
      .status(400)
      .json({ message: "First name, last name, username and email  are required" });
  }

  try {
    const password = generateSimplePassword();
    const hashedPassword = await bcrypt.hash(password, 10);

    const client = await clientPromise;
    const db = client.db("");

    const isEmail = await db
      .collection("users")
      .findOne({ email: req.body.email });
    const isUsername = await db
      .collection("users")
      .findOne({ username: req.body.username });

    console.log(isUsername, "this is username");
    console.log(isEmail, "this is the email");

    if (!isUsername && !isEmail) {
      const newUser = {
        username,
        email,
        password: hashedPassword,
        firstname:firstname,
        lastname:lastname,
        confirm: false,
        force: true,
      };

      await db.collection("users").insertOne(newUser);
      await sendMail({ ...newUser, tempPassword: password });

      res.status(201).json({ message: "User created successfully" });
    }

    if (isEmail) {
      if (isEmail.username === req.body.username && !isEmail.confirm) {
        await db
          .collection("users")
          .updateOne(
            { email: isEmail.email },
            { $set: { password: hashedPassword } }
          );
        await sendMail({ ...isEmail, tempPassword: password });
        return await res
          .status(200)
          .json({ message: "Verification Email has been sent to you" });
      }
      return res.status(401).json({ message: "Email already exsit" });
    }
    if (isUsername) {
      if (isUsername.email === req.body.email && !isUsername.confirm) {
        await db
          .collection("users")
          .updateOne(
            { username: isUsername.username },
            { $set: { password: hashedPassword } }
          );
        await sendMail({ ...isUsername, tempPassword: password });
        return await res
          .status(200)
          .json({ message: "Verification Email has been sent to you" });
      }
      return res.status(401).json({ message: "Username already exsit" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const generateSimplePassword = (length = 6) => {
  const randomBytes = crypto.randomBytes(length);

  const base64String = randomBytes.toString("base64");
  const password = base64String.replace(/[^a-zA-Z0-9]/g, "").slice(0, length);
  return password;
};