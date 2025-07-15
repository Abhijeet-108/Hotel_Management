import React, { useState } from "react";
import Day from "./CheckIn_Component/Day";
import MonthDial from "./CheckIn_Component/MonthDial";

function CheckIn({
  checkInRef,
  isAnySectionActive,
  showCheckIn,
  setShowCheckIn,
  setShowDestination,
  setShowCheckOut,
  setShowGuests,
  checkIn,
  setCheckIn,
}) {
  const [mode, setMode] = useState("Dates");

  return (
    <div ref={checkInRef} className="w-1/5">
      <button
      className={`flex-1 cursor-pointer justify-center w-full items-center relative border-r border-gray-200 
            ${showCheckIn ? "bg-white rounded-full h-16" : isAnySectionActive ? "bg-[#e8e8e8] h-16" : "bg-white hover:bg-[#e8e8e8] hover:h-16 hover:rounded-full"}`}
      onClick={(e) => {
        e.stopPropagation();
        setShowCheckIn(!showCheckIn);
        setShowDestination(false);
        setShowCheckOut(false);
        setShowGuests(false);
      }}
    >
      <div className="font-semibold text-left pl-4 justify-center items-center">Check in</div>
      <div className={`text-left pl-4 justify-center items-center ${checkIn ? "text-black font-medium" : "text-gray-500"}`}>
        {checkIn ? new Date(checkIn).toLocaleDateString() : "Add dates"}
      </div>
    </button>

    {showCheckIn && (
      <div className="absolute top-44 left-[25%] bg-white shadow-lg rounded-lg p-4 w-[40rem] z-10">
        <div className="flex justify-center mb-4 p-2">
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
            <Day setCheckIn={setCheckIn} setShowCheckIn={setShowCheckIn} />
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

export default CheckIn;


{/*  */}