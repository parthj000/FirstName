// src/pages/api/login.js
import clientPromise from "../../lib/mongodb";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export default async (req, res) => {
  if (req.method !== "POST") {
    //NOT EQUAL
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password } = req.body;
  var identifier;
  if (isValidEmail(email)) {
    identifier = "email";
  } else {
    identifier = "username";
  }

  try {
    const client = await clientPromise;
    const db = client.db(""); //handler tries to find a user document with given email
    let user;

    user = await db.collection("users").findOne({ [identifier]: email });
    console.log(identifier);

    if (!user) {
      return res.status(401).json({ message: "Invalid username or email" });
    }

    //check if provided password matches the stored hashed password.
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    //check username or email and password are valid, handler generates a JWT token using jwt.sign
    //token includes user's ID and email, and it expires in 1 hour.
    const sixMonthsInSeconds = 6 * 30 * 24 * 60 * 60; // expires in 6 months in seconds
    const token = jwt.sign(
      { userId: user._id, email: user.email, username: user.username },
      process.env.JWT_SECRET,
      {
        expiresIn: sixMonthsInSeconds,
      }
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
