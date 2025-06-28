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
  const destinations1 = ["Paris", "New York", "Tokyo", "London", "Sydney"];

  const destinations = [
    {
        name:'Nearby',
        image: 'nearby.png',
        para:'Find what\'s around you'
    },{
        name:'New Delhi,Delhi',
        image: 'delhi.png',
        para: 'For sights like India Gate'
    },{
        name:'Guwahati,Assam',
        image: 'delhi.png',
        para:'For nature lovers'
    },{
        name:'Darjeeling,West Bengal',
        image:'delhi.png',
        para:'Popular with travellers near you'
    },{
        name:'Puri,Odisha',
        image:'delhi.png',
        para:'For its seaside allure'
    },{
        name:'Jaipur,Rajasthan',
        image:'delhi.png',
        para:'For sights like Amber Fort'
    },{
        name:'Puducherry,Puducherry',
        image:'delhi.png',
        para:'Popular beach destination'
    },{
        name:'Patna,Bihar',
        image:'delhi.png',
        para:'A hidden gem',
    },{
        name:'Kolkata',
        image:'delhi.png',
        para:'Gems of India',
    },{
        name:'Pune City,Maharastra',
        image:'delhi.png',
        para:'For sights of temple',
    },{
        name:'South Goa,Goa',
        image:'delhi.png',
        para:'Great for Summer gateways',
    },
  ]

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
        <div className="absolute top-16 left-0 bg-white shadow-lg rounded-3xl p-5 w-96 h-96 z-10 mt-4  overflow-auto">
          <p className="font-semibold text-gray-500 text-sm text-start">Suggested destinations</p>
          {destinations.map((dest) => (
            <div
            key={dest.name}
            className="flex items-start p-3 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors"
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
    </button>
  );
}

export default DestinationComponent;
