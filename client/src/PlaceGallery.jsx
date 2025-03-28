import { useState } from "react";
import Image from "./Image.jsx";

export default function PlaceGallery({ place }) {
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  return (
    <div className="relative">
      {/* Fullscreen gallery when showAllPhotos is true */}
      {showAllPhotos ? (
        <div className="fixed inset-0 bg-black text-white flex flex-col z-50">
          {/* Header with title and close button */}
          <div className="flex justify-between items-center p-4 bg-black sticky top-0 z-10">
            <h2 className="text-3xl">Photos of {place.title}</h2>
            <button
              onClick={() => setShowAllPhotos(false)}
              className="py-2 px-4 rounded-2xl bg-white text-black shadow-md"
            >
              Close Photos
            </button>
          </div>

          {/* Scrollable fullscreen gallery */}
          <div className="overflow-y-auto flex-grow p-4">
            <div className="grid grid-cols-3 gap-2">
              {place.photos?.map((photo, index) => (
                <Image
                  key={index}
                  className={`object-cover w-full h-full ${
                    index === 0 ? "col-span-2 row-span-2" : "col-span-1 row-span-1"
                  }`}
                  src={photo}
                  alt={`Photo ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Normal 3x3 gallery view */
        <div className="grid grid-cols-3 grid-rows-3 gap-2 rounded-3xl overflow-hidden">
          {place.photos?.slice(0, 9).map((photo, index) => (
            <Image
              key={index}
              onClick={() => setShowAllPhotos(true)}
              className={`cursor-pointer object-cover w-full h-full ${
                index === 0 ? "col-span-2 row-span-2" : "col-span-1 row-span-1"
              }`}
              src={photo}
              alt={`Photo ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Show more photos button */}
      {!showAllPhotos && (
        <button
          onClick={() => setShowAllPhotos(true)}
          className="flex gap-1 absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow-md"
        >
          Show more photos
        </button>
      )}
    </div>
  );
}
