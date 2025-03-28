import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import Image from "../Image.jsx";

export default function IndexPage() {
  const [places,setPlaces] = useState([]);
  useEffect(() => {
    axios.get('/api/places')
    .then(response => {
      setPlaces(response.data);
    })
    .catch(error => {
      console.error('Error fetching places:', error);
    });
  }, []);
  
  return (
    <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 p-2 lg:grid-cols-3">
      {places.length > 0 && places.map(place => (
        <Link to={'/place/'+place._id} className="shadow-xl p-4 rounded-md border-2 border-zinc-100 lg:min-w-[70%] hover:border-zinc-200 hover:shadow-md ">
          <div className="bg-gray-500 mb-2 shadow-md rounded-2xl flex">
            {place.photos?.[0] && (
              <Image className="rounded-2xl object-cover aspect-square" src={place.photos?.[0]} alt=""/>
            )}
          </div>
          <h2 className="font-bold">{place.address}</h2>
          <h3 className="text-sm text-gray-500">{place.title}</h3>
          <div className="mt-1">
            <div className=" p-2 rounded-xl shadow-md border w-fit"><span className="font-bold">₹{place.price}</span> per night</div>
            <div>{place.description.slice(0, 150)}<span> ...</span></div>
            </div>
        </Link>
      ))}
    </div>
  );
}
