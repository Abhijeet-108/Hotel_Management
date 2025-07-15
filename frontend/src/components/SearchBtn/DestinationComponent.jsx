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
  const destinations = [
    {
      name: 'Nearby',
      image: 'nearby.png',
      para: "Find what's around you"
    },
    {
      name: 'New Delhi,Delhi',
      image: 'delhi.png',
      para: 'For sights like India Gate'
    },
    {
      name: 'Guwahati,Assam',
      image: 'delhi.png',
      para: 'For nature lovers'
    },
    {
      name: 'Darjeeling,West Bengal',
      image: 'delhi.png',
      para: 'Popular with travellers near you'
    },
    {
      name: 'Puri,Odisha',
      image: 'delhi.png',
      para: 'For its seaside allure'
    },
    {
      name: 'Jaipur,Rajasthan',
      image: 'delhi.png',
      para: 'For sights like Amber Fort'
    },
    {
      name: 'Puducherry,Puducherry',
      image: 'delhi.png',
      para: 'Popular beach destination'
    },
    {
      name: 'Patna,Bihar',
      image: 'delhi.png',
      para: 'A hidden gem'
    },
    {
      name: 'Kolkata',
      image: 'delhi.png',
      para: 'Gems of India'
    },
    {
      name: 'Pune City,Maharastra',
      image: 'delhi.png',
      para: 'For sights of temple'
    },
    {
      name: 'South Goa,Goa',
      image: 'delhi.png',
      para: 'Great for Summer gateways'
    },
  ];

  return (
    <div ref={destRef} className='w-1/3 relative'>
      <button
        ref={destRef}
        className={`flex-1 cursor-pointer justify-center items-center relative border-r border-gray-200 rounded-l-full w-full
          ${showDestination ? "bg-white rounded-full h-16" : isAnySectionActive ? "bg-[#e8e8e8] h-16 rounded-full" : "bg-white hover:bg-[#e8e8e8] hover:h-16 hover:rounded-full"}`}
        onClick={(e) => {
          setShowDestination(!showDestination);
          setShowCheckIn(false);
          setShowCheckOut(false);
          setShowGuests(false);
        }}
      >
        <div className="font-semibold text-left pl-4 justify-center items-center">Where</div>
        <div className={`text-left pl-4 justify-center items-center ${destination ? "text-black font-medium" : "text-gray-500"}`}>
          {destination || "Search destinations"}
        </div>
      </button>

      {/* Move popup outside the button */}
      {showDestination && (
        <div className="absolute top-20 bg-white shadow-lg rounded-3xl p-5 w-96 h-96 z-10 overflow-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <p className="font-semibold text-gray-500 text-sm mb-1">Suggested destinations</p>
          {destinations.map((dest) => (
            <div
              key={dest.name}
              className="flex items-start p-3 rounded-xl cursor-pointer hover:bg-gray-100 transition"
              onClick={() => {
                setDestination(dest.name);
                setShowDestination(false);
              }}
            >
              {dest.image && (
                <img
                  src={dest.image}
                  alt={`${dest.name} icon`}
                  className="w-12 h-12 rounded-2xl flex-shrink-0 mr-3"
                />
              )}
              <div className="flex flex-col text-left">
                <span className="font-semibold text-gray-800">{dest.name}</span>
                <span className="text-gray-500 text-sm">{dest.para}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DestinationComponent;
