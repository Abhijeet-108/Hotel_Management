import React from 'react';

function DestinationComponent({
  destRef,
  isAnySectionActive,
  showDestination,
  setShowDestination,
  setShowCheckIn,
  setShowCheckOut,
  setShowGuests,
  destination,
  setDestination
}) {
  const destinations = ["Paris", "New York", "Tokyo", "London", "Sydney"];

  return (
    <button
      className={`flex-1 border-gray-300 p-2 cursor-pointer relative w-full border-r hover:bg-[#e8e8e8] hover:rounded-full ${
        showDestination
          ? "bg-white rounded-l-full  rounded-r-full shadow-md"
          : isAnySectionActive
            ? "bg-[#e8e8e8] rounded-l-full"
            : "bg-white rounded-l-full "
      }`}
      onClick={() => {
        setShowDestination(!showDestination);
        setShowCheckIn(false);
        setShowCheckOut(false);
        setShowGuests(false);
      }}
      ref={destRef}
    >
      <div className="font-semibold text-start pl-6">Where</div>
      <div className="text-gray-500 text-start pl-6">{destination || "Search destinations"}</div>
      {showDestination && (
        <div className="absolute top-16 left-0 bg-white shadow-lg rounded-3xl p-5 w-96 h-96 z-10 mt-4">
          <p className="font-semibold text-gray-500 text-sm text-start">Suggested destinations</p>
          {destinations.map((dest) => (
            <div
              key={dest}
              className="p-2 hover:bg-gray-100 cursor-pointer text-start"
              onClick={() => {
                setDestination(dest);
                setShowDestination(false);
              }}
            >
              {dest}
            </div>
          ))}
        </div>
      )}
    </button>
  );
}

export default DestinationComponent;
