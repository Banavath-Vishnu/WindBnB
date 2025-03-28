import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '../models/User.js';
import { bcryptSalt, jwtSecret } from '../config/config.js';

const register = async (req, res) => {
  const {name, email, password} = req.body;
  
  if (!name || !email || !password) {
    return res.status(422).json({ message: 'All fields are required' });
  }

  try {
    await mongoose.connect(process.env.MONGO_URL);
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);
  } catch (e) {
    if (e.code === 11000) {
      res.status(422).json({ message: 'Email already exists' });
    } else {
      res.status(422).json({ message: 'Registration failed. Please try again.' });
    }
  }
};

const login = async (req, res) => {
  const {email, password} = req.body;
  const userDoc = await User.findOne({email});
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign({
        email: userDoc.email,
        id: userDoc._id
      }, jwtSecret, {}, (err, token) => {
        if (err) throw err;
        res.cookie('token', token).json(userDoc);
      });
    } else {
      res.status(422).json('pass not ok');
    }
  } else {
    res.json('not found');
  }
};

const getProfile = (req, res) => {
  const {token} = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const {name, email, _id} = await User.findById(userData.id);
      res.json({name, email, _id});
    });
  } else {
    res.json(null);
  }
};

const logout = (req, res) => {
  res.cookie('token', '').json(true);
};

export {
  register,
  login,
  getProfile,
  logout
}; 