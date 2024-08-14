// src/pages/api/goals.js
import clientPromise from '../../lib/mongodb';
import { ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';

export default async (req, res) => {
  const token = req.headers["x-auth-token"];

  if (req.method === 'POST') {
    // POST request handler
    const { goalText } = req.body;
  
    if (!token || !goalText) {
      return res.status(400).json({ message: 'Goal text is required' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const client = await clientPromise;
      const db = client.db('');
  
      // Retrieve user's firstname from users collection
      const user = await db.collection('users').findOne({ _id: new ObjectId(decoded.userId) });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const currentTimestamp = Math.floor(Date.now() / 1000);
      const past24Hours = currentTimestamp - 24 * 60 * 60;
  
      // Check if there is an existing goal within the past 24 hours
      const existingGoal = await db.collection('goals').findOne({
        userId: new ObjectId(decoded.userId),
        createdAt: { $gte: past24Hours }
      });
  
      if (existingGoal) {
        // Return an error message if there's an existing goal within the past 24 hours
        return res.status(400).json({ message: 'Goal already exists within the past 24 hours' });
      } else {
        // Insert a new goal if there's no existing goal within the past 24 hours
        const result = await db.collection('goals').insertOne({
          userId: new ObjectId(decoded.userId),
          firstname: user.firstname,
          goalText,
          createdAt: currentTimestamp, // Store timestamp
        });
  
        res.status(201).json({ id: result.insertedId, goalText });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  
  ///////////////////////////////////
  else if (req.method === 'PATCH') {
    // PATCH request handler
    const { goalText } = req.body;
  
    if (!token || !goalText) {
      return res.status(400).json({ message: 'Goal text is required' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const client = await clientPromise;
      const db = client.db('');
  
      // Retrieve user's firstname from users collection
      const user = await db.collection('users').findOne({ _id: new ObjectId(decoded.userId) });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const currentTimestamp = Math.floor(Date.now() / 1000);
  
      // Check if there is an existing goal within the past 24 hours
      const existingGoal = await db.collection('goals').findOne({
        userId: new ObjectId(decoded.userId),
        createdAt: { $gte: currentTimestamp - 24 * 60 * 60 }
      });
  
      if (existingGoal) {
        // Update the existing goalText and add updatedAt field
        await db.collection('goals').updateOne(
          { _id: existingGoal._id },
          { $set: { goalText, updatedAt: currentTimestamp } }
        );
  
        res.status(200).json({ id: existingGoal._id, goalText });
      } else {
        // Return an error message if there's no existing goal
        return res.status(400).json({ message: 'No goal found. Use POST to create a new goal.' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  
  ///////////////////////////////////
  else if (req.method === 'GET') {
    // GET request handler
    if (!token) {
      return res.status(400).json({ message: 'Token is required' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const client = await clientPromise;
      const db = client.db('');
  
      const currentTimestamp = Math.floor(Date.now() / 1000);
      const past24Hours = currentTimestamp - 24 * 60 * 60;
  
      const goal = await db.collection('goals').findOne({
        userId: new ObjectId(decoded.userId),
        createdAt: { $gte: past24Hours }
      });
  
      let goalText = null;
      let goalId = null;
      if (goal) {
        // If goal exists and was created within the last 24 hours, use its goalText
        goalText = goal.goalText;
        goalId = goal._id;
      }
    
      const buffer = Buffer.from(token.split(".")[1], 'base64');
      const details = JSON.parse(buffer.toString());
      const { email } = details;
  
      // Retrieve user's firstname from users collection
      const user = await db.collection('users').findOne({ _id: new ObjectId(decoded.userId) });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      let obj = {
        firstname: user.firstname,
        email,
        goalId,
        goalText,  // goalText will be null if it was created more than 24 hours ago
      };

      res.status(200).json(obj);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  
  ///////////////////////////////////
  else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};