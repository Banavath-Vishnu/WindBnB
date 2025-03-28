import jwt from 'jsonwebtoken';
import Place from '../models/Place.js';
import { jwtSecret } from '../config/config.js';

const createPlace = (req, res) => {
  const {token} = req.cookies;
  const {
    title, address, addedPhotos, description, price,
    perks, extraInfo, checkIn, checkOut, maxGuests,
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const placeDoc = await Place.create({
      owner: userData.id, price,
      title, address, photos: addedPhotos, description,
      perks, extraInfo, checkIn, checkOut, maxGuests,
    });
    res.json(placeDoc);
  });
};

const getUserPlaces = (req, res) => {
  const {token} = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    const {id} = userData;
    res.json(await Place.find({owner: id}));
  });
};

const getPlaceById = async (req, res) => {
  const {id} = req.params;
  res.json(await Place.findById(id));
};

export const getPlace = async (req, res) => {
  try {
    const { id } = req.params;
    const place = await Place.findById(id);
    if (!place) {
      return res.status(404).json({ error: 'Place not found' });
    }
    res.json(place);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch place' });
  }
};

const updatePlace = async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ error: "Unauthorized: No token provided" });

    const {
      title, address, addedPhotos, description,
      perks, extraInfo, checkIn, checkOut, maxGuests, price
    } = req.body;

    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) return res.status(403).json({ error: "Forbidden: Invalid token" });

      const placeDoc = await Place.findById(req.params.id); // Use req.params.id
      if (!placeDoc) return res.status(404).json({ error: "Place not found" });

      if (userData.id !== placeDoc.owner.toString()) {
        return res.status(403).json({ error: "Forbidden: You are not the owner" });
      }

      placeDoc.set({
        title, address, photos: addedPhotos, description,
        perks, extraInfo, checkIn, checkOut, maxGuests, price,
      });

      await placeDoc.save();
      res.json({ success: true, message: "Place updated successfully" });
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const getAllPlaces = async (req, res) => {
  res.json(await Place.find());
};

export {
  createPlace,
  getUserPlaces,
  getPlaceById,
  updatePlace,
  getAllPlaces
}; 