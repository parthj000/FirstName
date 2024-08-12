// src/pages/api/signup.js
import clientPromise from '../../lib/mongodb';
import bcrypt from 'bcryptjs';

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Username, email, and password are required' });
  }

  try {
    const client = await clientPromise;
    const db = client.db('');
    const existingUser = await db.collection('users').findOne({ 
      $or: [
        { email },
        { username }
      ]
      
    });

    if (existingUser) {
      return res.status(409).json({ message: 'User with this email or username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      username,
      email,
      password: hashedPassword,
      createdAt: Math.floor(Date.now() / 1000)
    };
    
    await db.collection('users').insertOne(newUser);

    res.status(201).json({ message: 'User created successfully' });
  } 
  catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal server error' });
  }
};
