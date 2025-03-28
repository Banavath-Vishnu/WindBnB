import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import fs from 'fs';
import multer from 'multer';
import userRoutes from './routes/userRoutes.js';
import placeRoutes from './routes/placeRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import User from './models/User.js';
import getUserDataFromReq from './middleware/auth.js';



dotenv.config();
const app = express();
const MongoURL = process.env.MONGO_URL;
const jwtSecret = process.env.JWT_SECRET;

mongoose.set('strictQuery', true);
mongoose.connect(MongoURL)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}



app.use(express.json());
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use('/uploads', express.static('uploads'));


app.use('/api', userRoutes);
app.use('/api', placeRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api', uploadRoutes);

app.get('/api/test', (req, res) => {
  res.json('test ok');
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const userDoc = await User.findOne({ email });
    if (userDoc && bcrypt.compareSync(password, userDoc.password)) {
      jwt.sign({ email: userDoc.email, id: userDoc._id }, jwtSecret, { expiresIn: '7d' }, (err, token) => {
        if (err) throw err;
        res.cookie('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax'
        }).json(userDoc);
      });
    } else {
      res.status(422).json('Invalid credentials');
    }
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

app.post('/api/upload', upload.array('photos', 100), async (req, res) => {
  try {
    const filenames = req.files.map(file => file.filename);
    res.json(filenames);
  } catch (error) {
    res.status(500).json({ error: 'Upload failed' });
  }
});

app.listen(4000, () => {
  console.log('Server running on port 4000');
});
