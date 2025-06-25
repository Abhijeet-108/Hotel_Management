import React from 'react';

function Guest({
  guestsRef,
  isAnySectionActive,
  showGuests,
  setShowGuests,
  setShowDestination,
  setShowCheckIn,
  setShowCheckOut,
  adults,
  setAdults,
  children,
  setChildren,
  infants,
  setInfants,
}) {
  return (
    <div
      className={`flex-1 border-gray-300 p-2 cursor-pointer relative w-full hover:bg-[#e8e8e8] ${
        showGuests
          ? "bg-white rounded-l-full rounded-r-full shadow-md "
          : isAnySectionActive
            ? "bg-[#e8e8e8]"
            : "bg-white rounded-l-full rounded-r-full"
      }`}
      onClick={() => {
        setShowGuests(!showGuests);
        setShowDestination(false);
        setShowCheckIn(false);
        setShowCheckOut(false);
      }}
      ref={guestsRef}
    >
      <div className="font-semibold pl-4">Who</div>
      <div className="text-gray-500 pl-4">
        {adults + children + infants > 0
          ? `${adults + children + infants} guests`
          : "Add guests"}
      </div>
      {showGuests && (
        <div className="absolute top-16 right-0 bg-white shadow-lg rounded-lg p-4 w-64 z-10">
          {["Adults", "Children", "Infants"].map((label, idx) => {
            const value = [adults, children, infants][idx];
            const setter = [setAdults, setChildren, setInfants][idx];
            return (
              <div key={label} className="flex justify-between items-center mb-2">
                <div>{label}</div>
                <div className="flex items-center">
                  <button
                    className="px-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      setter(Math.max(0, value - 1));
                    }}
                  >
                    -
                  </button>
                  <span className="mx-2">{value}</span>
                  <button
                    className="px-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      setter(value + 1);
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Guest;
