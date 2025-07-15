import React, { useState } from 'react';
import Day from "./CheckIn_Component/Day";
import MonthDial from "./CheckIn_Component/MonthDial";

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
  const [mode, setMode] = useState("Dates");

  return (
    <div ref={checkOutRef} className='w-1/5 relative'>
      <div
        className={`flex-1 cursor-pointer w-full relative border-r border-gray-200
          ${showCheckOut ? "bg-white rounded-full h-16" : isAnySectionActive ? "bg-[#e8e8e8] h-16" : "bg-white hover:bg-[#e8e8e8] hover:h-16 hover:rounded-full"}`}
        onClick={(e) => {
          e.stopPropagation();
          setShowCheckOut(!showCheckOut);
          setShowDestination(false);
          setShowCheckIn(false);
          setShowGuests(false);
        }}
        ref={checkOutRef}
      >
        <div className="font-semibold text-left pl-6">Check Out</div>
        <div className="text-gray-500 text-left pl-6">
          {checkOut ? new Date(checkOut).toLocaleDateString() : "Add dates"}
        </div>
      </div>

      {showCheckOut && (
        <div className="absolute top-20 right-[25%] bg-white shadow-lg rounded-2xl p-4 w-[40rem] z-10">
          <div className="flex justify-center mb-4">
            <div className="flex bg-gray-200 p-1 rounded-full">
              {["Dates", "Months", "Flexible"].map((label) => (
                <button
                  key={label}
                  onClick={(e) => {
                    e.stopPropagation();
                    setMode(label);
                  }}
                  className={`px-3 py-1 text-sm rounded-full ${mode === label ? "bg-white shadow" : "bg-gray-200"}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {mode === "Dates" && (
            <div>
              <Day setCheckIn={setCheckOut} setShowCheckIn={setShowCheckOut} />
            </div>
          )}

          {mode === "Months" && (
            <div className="flex justify-center">
              <MonthDial />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default CheckOut;
