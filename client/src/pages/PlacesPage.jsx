import { Link } from "react-router-dom";
import AccountNav from "../AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";
import PlaceImg from "../PlaceImg";

export default function PlacesPage() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    axios.get("/api/user-places")
      .then(({ data }) => setPlaces(data))
      .catch(error => console.error("Error fetching places:", error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6">
      <AccountNav />

      {/* Add new place button */}
      <div className="flex justify-center">
        <Link 
          to="/account/places/new" 
          className="flex items-center gap-2 bg-blue-600 text-white py-3 px-6 rounded-full shadow-lg hover:bg-blue-700 transition-all"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="currentColor" 
            className="w-6 h-6"
          >
            <path 
              fillRule="evenodd" 
              d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" 
              clipRule="evenodd" 
            />
          </svg>
          <span className="text-lg font-medium">Add New Place</span>
        </Link>
      </div>

      {/* Loading and Empty States */}
      {loading ? (
        <p className="text-center text-gray-500 text-lg mt-6">Loading your places...</p>
      ) : places.length === 0 ? (
        <p className="text-center text-gray-500 text-lg mt-6">You haven't added any places yet.</p>
      ) : (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {places.map(place => (
            <Link 
              to={`/account/places/${place._id}`} 
              key={place._id}
              className="flex flex-col bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden p-1 transition-all"
            >
              {/* Image */}
              <div className="w-full object-contain">
                <PlaceImg place={place} className='rounded-lg' />
              </div>

              {/* Text Details */}
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-900">{place.title}</h2>
                <p className="text-sm text-gray-600 mt-2">{(place.description).slice(0,200)} <span>...</span></p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
