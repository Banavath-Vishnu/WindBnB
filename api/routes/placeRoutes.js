import express from 'express';
import {createPlace,updatePlace, getAllPlaces, getPlace, getUserPlaces } from '../controllers/placeController.js';

const router = express.Router();

router.get('/places', getAllPlaces);
router.get('/places/:id', getPlace);
router.get('/user-places', getUserPlaces);

router.post('/addPlace', createPlace);
router.put('/updatePlace/:id', updatePlace);

export default router; 