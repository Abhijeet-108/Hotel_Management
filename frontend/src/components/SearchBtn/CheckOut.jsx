import React from 'react';

function CheckOut({
  checkOutRef,
  isAnySectionActive,
  showCheckOut,
  setShowCheckOut,
  setShowDestination,
  setShowCheckIn,
  setShowGuests,
  checkOut,
  setCheckOut
}) {
  return (
    <div
      className={`flex-1 border-r border-gray-300 p-2 cursor-pointer relative w-full hover:bg-[#e8e8e8] hover:rounded-full ${
        showCheckOut
          ? "bg-white rounded-l-full rounded-r-full shadow-md "
          : isAnySectionActive
            ? "bg-[#e8e8e8] "
            : "bg-white rounded-l-full "
      }`} 
      onClick={() => {
        setShowCheckOut(!showCheckOut);
        setShowDestination(false);
        setShowCheckIn(false);
        setShowGuests(false);
      }}
      ref={checkOutRef}
    >
      <div className="font-semibold pl-6">Check out</div>
      <div className="text-gray-500 pl-6">{checkOut || "Add dates"}</div>
      {showCheckOut && (
        <div className="absolute top-16 left-0 bg-white shadow-lg rounded-lg p-4 w-64 z-10">
          <input
            type="date"
            className="w-full p-2 border rounded"
            onChange={(e) => {
              setCheckOut(e.target.value);
              setShowCheckOut(false);
            }}
          />
        </div>
      )}
    </div>
  );
}

export default CheckOut;
