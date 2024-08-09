import jwt from "jsonwebtoken";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export default async (req, res) => {
  if (req.method !== "POST" && req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  const token = req.headers["x-auth-token"];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const client = await clientPromise;
    const db = client.db("");

    const user = await db.collection("users").findOne({ email: decoded.email });

    if (!user) {
      return res.status(404).json({ message: "the user dont exist" });
    }

    /***
     * 
     * Get request
     */

    if (req.method === "GET") {

      const obj = {
        confirm: String(user.confirm),
        force: String(user.force),
      };
      return res.status(200).json(obj);
    }

    /***
     * 
     * Post request
     */

    

    const { password } = req.body;
    
    if (!password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (!user.force) {
      return res.status(401).json({ message: "Not permitted" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    await db
      .collection("users")
      .updateOne(
        { email: decoded.email },
        { $set: { password: hashedPassword, confirm: true, force: false } }
      );

    return res
      .status(200)
      .json({ message: "Password has been set succesfully!" });


      
  } catch (err) {
    console.log(err);
    return res.status(500).send("Something went wrong!");
  }
};
