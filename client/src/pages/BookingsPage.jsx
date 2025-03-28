import AccountNav from "../AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";
import PlaceImg from "../PlaceImg";
import BookingDates from "../BookingDates";
import { Link } from "react-router-dom";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);  // ✅ Loading state

  useEffect(() => {
    axios.get("/api/bookings/getUserBookings")
      .then(response => {
        setBookings(response.data);
      })
      .catch(error => console.error("Error fetching bookings:", error))
      .finally(() => setLoading(false));  // ✅ Stop loading when request completes
  }, []);

  return (
    <div>
      <AccountNav />
      
      {loading ? (
        <p className="text-center text-gray-500 text-xl mt-6">Loading your bookings...</p>
      ) : bookings.length === 0 ? (
        <p className="text-center text-gray-500 text-xl mt-6">You have no bookings yet.</p>
      ) : (
        <div className="grid gap-4">
          {bookings.map(booking => (
            <Link 
              to={`/account/bookings/${booking._id}`} 
              key={booking._id}  
              className="flex items-center justify-center p-1 gap-4 bg-gray-100 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-48">
                <PlaceImg place={booking.place} className='rounded-xl shadow-xl' />
              </div>
              <div className="py-3 pr-3 flex-grow">
                <h2 className="text-xl font-semibold">{booking.place.title}</h2>
                <div className="text-xl text-gray-600">
                  <BookingDates booking={booking} className="mb-2 mt-4" />
                  <div className="flex items-center gap-1 mt-2">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      strokeWidth={1.5} 
                      stroke="currentColor" 
                      className="w-8 h-8 text-red-500"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                    </svg>
                    <span className="text-2xl font-bold text-black">
                      ₹{booking.totalPrice}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
