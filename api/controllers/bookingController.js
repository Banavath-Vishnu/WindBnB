import Booking from '../models/Booking.js';
import getUserDataFromReq from '../middleware/auth.js';

const createBooking = async (req, res) => {
  try {
    const userData = await getUserDataFromReq(req);
    
    if (!userData) {
      return res.status(401).json({ error: 'Unauthorized: User not found' });
    }

    const { place, checkIn, checkOut, numberOfGuests, name, phone, price } = req.body;

    // Fix field names
    const booking = await Booking.create({
      place,
      checkIn,
      checkOut,
      guests: numberOfGuests,  // Fix field name
      name,
      phone,
      totalPrice: price,  // Fix field name
      user: userData.id,
    });

    res.status(201).json(booking);
  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const getUserBookings = async (req, res) => {
  try {
    const userData = await getUserDataFromReq(req);
    if (!userData) {
      return res.status(401).json({ error: 'Unauthorized: User not found' });
    }
    
    const bookings = await Booking.find({ user: userData.id }).populate('place');
    res.json(bookings);

  } catch (error) {
    console.error('Fetching bookings error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { createBooking, getUserBookings };
