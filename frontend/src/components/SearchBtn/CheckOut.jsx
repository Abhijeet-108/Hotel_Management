import React,{useState} from 'react';
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
    <div
      className={`flex-1 border-gray-300 p-2 cursor-pointer relative w-full border-r hover:bg-[#e8e8e8] hover:rounded-full 
        ${showCheckOut ? "bg-white rounded-l-full rounded-r-full shadow-md" : isAnySectionActive ? "bg-[#e8e8e8]" : "bg-white rounded-l-full"}`}
      onClick={(e) => {
        e.stopPropagation();
        setShowCheckOut(!showCheckOut);
        setShowDestination(false);
        setShowCheckIn(false);
        setShowGuests(false);
      }}
      ref={checkOutRef}
    >
      <div className="font-semibold pl-6">Check Out</div>
      <div className="text-gray-500 pl-6">{checkOut ? new Date(checkOut).toLocaleDateString() : "Add dates"}</div>
      {showCheckOut && (
        <div className="absolute top-16 right-0 bg-white shadow-lg rounded-lg p-4 w-[40rem] z-10 mt-4">
          
          {/* Buttons */}
          <div className="flex justify-center mb-4 p-2 ">
            <div className="flex justify-center items-center bg-gray-200 p-2 rounded-3xl">
              <button 
              onClick={(e) => {
                e.stopPropagation();
                setMode("Dates");
              }}
              className={`px-2 py-1 mr-1 ${mode === "Dates" ? "bg-white" : "bg-gray-200"} rounded-3xl`}
              >
                Dates
              </button>
              <button 
              onClick={(e) => {
                e.stopPropagation();
                setMode("Months");
              }}
              className={`px-2 py-1 mr-1 ${mode === "Months" ? "bg-white" : "bg-gray-200"} rounded-3xl`}
              >
                Months
              </button>
              <button 
              onClick={(e) => {
                e.stopPropagation();
                setMode("Flexible");
              }}
              className={`px-2 py-1 mr-1 ${mode === "Flexible" ? "bg-white" : "bg-gray-200"} hover:rounded-3xl`}
              >
                Flexible
              </button>
            </div>
          </div>

          {mode === "Dates" && (
            <div>
              <Day setCheckIn={setCheckOut} setShowCheckIn={setShowCheckOut} />
            </div>
          )}

          {mode === "Months" && (
              <div className="flex flex-col items-center">
                <MonthDial />
              </div>
          )}
          
        </div>
      )}
    </div>
  );
}

export default CheckOut;



