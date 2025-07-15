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
  handleSearch
}) {
  const totalGuests = adults + children + infants;

  return (
    <div className="flex items-center w-1/4 "ref={guestsRef}>
      <div
        className={`flex-1 pl-4 cursor-pointer relative w-full
          ${showGuests ? "bg-white rounded-full h-16" 
            : isAnySectionActive ? "bg-[#e8e8e8] h-16" 
            : "bg-white hover:bg-[#e8e8e8] hover:h-16"}`}
        onClick={() => {
          setShowGuests(!showGuests);
          setShowDestination(false);
          setShowCheckIn(false);
          setShowCheckOut(false);
        }}
      >
        <div className='flex items-center w-full gap-2 justify-between'>
          <div className='items-center mx-2 '>
            <div className="font-semibold text-left">Who</div>
            <div className="text-gray-500 text-left">
              {totalGuests > 0 ? `${totalGuests} guest${totalGuests > 1 ? 's' : ''}` : "Add guests"}
            </div>
          </div>
          <button
            className="bg-red-500 text-white  end-0 mt-1 items-center justify-center rounded-full p-4 hover:bg-red-600 transition duration-200 shadow-md ml-3 mr-2"
            onClick={handleSearch}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
            {/* <span className="ml-2 hidden md:inline font-semibold">Search</span> */}
          </button>
        </div>
      </div>

      
      {showGuests && (
        <div className="absolute top-48  bg-white shadow-lg rounded-2xl p-4 w-64 z-10">
          {["Adults", "Children", "Infants"].map((label, idx) => {
            const value = [adults, children, infants][idx];
            const setter = [setAdults, setChildren, setInfants][idx];
            return (
              <div key={label} className="flex justify-between items-center mb-3">
                <div className="font-medium">{label}</div>
                <div className="flex items-center">
                  <button
                    className="px-2 py-1 rounded-full bg-gray-200 hover:bg-gray-300 transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      setter(Math.max(0, value - 1));
                    }}
                  >
                    -
                  </button>
                  <span className="mx-2">{value}</span>
                  <button
                    className="px-2 py-1 rounded-full bg-gray-200 hover:bg-gray-300 transition"
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
