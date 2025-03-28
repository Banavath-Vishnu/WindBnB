import PhotosUploader from "../PhotosUploader.jsx";
import Perks from "../Perks.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import AccountNav from "../AccountNav";
import { Navigate, useParams } from "react-router-dom";

export default function PlacesFormPage() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(100);
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    
    setLoading(true);
    axios
      .get(`/api/places/${id}`)
      .then((response) => {
        const { data } = response;
        setTitle(data.title);
        setAddress(data.address);
        setAddedPhotos(data.photos);
        setDescription(data.description);
        setPerks(data.perks);
        setExtraInfo(data.extraInfo);
        setCheckIn(data.checkIn);
        setCheckOut(data.checkOut);
        setMaxGuests(data.maxGuests);
        setPrice(data.price);
      })
      .catch((error) => console.error("Error fetching place data:", error))
      .finally(() => setLoading(false));
  }, [id]);

  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }

  function inputDescription(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }

  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  async function savePlace(ev) {
    ev.preventDefault();
    setLoading(true);

    const placeData = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    };

    try {
      if (id) {
        // Update place
        await axios.put(`/api/updatePlace/${id}`, placeData);
      } else {
        // Create new place
        await axios.post("/api/addPlace", placeData);
      }
      setRedirect(true);
    } catch (error) {
      console.error("Error saving place:", error);
    } finally {
      setLoading(false);
    }
  }

  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }

  return (
    <div>
      <AccountNav />
      {loading && <p className="text-center text-gray-500">Loading...</p>}
      <form onSubmit={savePlace} className={loading ? "opacity-50 pointer-events-none" : ""}>
        {preInput("Title", "Title for your place. Should be short and catchy as in advertisement")}
        <input
          type="text"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          placeholder="Example: Cozy Beach House"
        />

        {preInput("Address", "Address of this place")}
        <input
          type="text"
          value={address}
          onChange={(ev) => setAddress(ev.target.value)}
          placeholder="Example: 123 Main St, Miami"
        />

        {preInput("Photos", "More = better")}
        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

        {preInput("Description", "Description of the place")}
        <textarea value={description} onChange={(ev) => setDescription(ev.target.value)} />

        {preInput("Perks", "Select all the perks of your place")}
        <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          <Perks selected={perks} onChange={setPerks} />
        </div>

        {preInput("Extra Info", "House rules, etc.")}
        <textarea value={extraInfo} onChange={(ev) => setExtraInfo(ev.target.value)} />

        {preInput("Check-in & Check-out Times", "Add check-in and out times, allowing a buffer for cleaning")}
        <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="mt-2 -mb-1">Check-in Time</h3>
            <input
              type="time"
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Check-out Time</h3>
            <input
              type="time"
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Max Number of Guests</h3>
            <input
              type="number"
              value={maxGuests}
              onChange={(ev) => setMaxGuests(parseInt(ev.target.value, 10) || 1)}
              min="1"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Price per Night (₹)</h3>
            <input
              type="number"
              value={price}
              onChange={(ev) => setPrice(parseInt(ev.target.value, 10) || 100)}
              min="1"
            />
          </div>
        </div>

        <button type="submit" className="primary my-4" disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
}
