import React from 'react';

function CheckIn({ 
    checkInRef, 
    isAnySectionActive,
    showCheckIn,
    setShowCheckIn,
    setShowDestination,
    setShowCheckOut,
    setShowGuests,
    checkIn,
    setCheckIn
 }) {
    return (
        <div
            className={`flex-1 border-gray-300 p-2 cursor-pointer relative w-full border-r hover:bg-[#e8e8e8] hover:rounded-full ${
                showCheckIn 
                    ? "bg-white rounded-l-full rounded-r-full shadow-md" 
                    : isAnySectionActive 
                        ? "bg-[#e8e8e8]" 
                        : "bg-white rounded-l-full"
            }`}
            onClick={() => {
                setShowCheckIn(!showCheckIn);
                setShowDestination(false);
                setShowCheckOut(false);
                setShowGuests(false);
            }}
            ref={checkInRef}
        >
            <div className="font-semibold pl-6">Check in</div>
            <div className="text-gray-500 pl-6">{checkIn || "Add dates"}</div>
            {showCheckIn && (
                <div className="absolute top-16 left-0 bg-white shadow-lg rounded-lg p-4 w-64 z-10">
                    <input
                        type="date"
                        className="w-full p-2 border rounded"
                        onChange={(e) => {
                            setCheckIn(e.target.value);
                            setShowCheckIn(false);
                        }}
                    />
                </div>
            )}
        </div>
    );
}

export default CheckIn;
