import express from 'express';
import { createBooking, getUserBookings } from '../controllers/bookingController.js';

const router = express.Router();

router.post('/createBooking' , createBooking);
router.get('/getUserBookings', getUserBookings);

export default router; 