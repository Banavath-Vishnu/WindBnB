import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  place: { type: mongoose.Schema.Types.ObjectId, ref: 'Place', required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  phone: { type: String, required: true },
  guests: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
