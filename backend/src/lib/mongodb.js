// src/lib/mongodb.js
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {};

let client; //variable to store the MongoDB client instance
let clientPromise; //promise that resolves to connected MongoDB client

if (!process.env.MONGODB_URI) {
  //checks if MONGODB_URI is present in env vars
  throw new Error("Please add your MongoDB URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
