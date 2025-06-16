import React, { useState, useRef } from "react";
import useOutsideClick from "./useOutsideClick";

function SearchBtn() {
    const [showDestination, setShowDestination] = useState(false);
    const [showCheckIn, setShowCheckIn] = useState(false);
    const [showCheckOut, setShowCheckOut] = useState(false);
    const [showGuests, setShowGuests] = useState(false);
    const [destination, setDestination] = useState("");
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [adults, setAdults] = useState(0);
    const [children, setChildren] = useState(0);
    const [infants, setInfants] = useState(0);

    const destinations = ["Paris", "New York", "Tokyo", "London", "Sydney"];

    const destRef = useRef();
    const checkInRef = useRef();
    const checkOutRef = useRef();
    const guestsRef = useRef();

    useOutsideClick(destRef, () => setShowDestination(false));
    useOutsideClick(checkInRef, () => setShowCheckIn(false));
    useOutsideClick(checkOutRef, () => setShowCheckOut(false));
    useOutsideClick(guestsRef, () => setShowGuests(false));

    const handleSearch = () => {
        console.log({
            destination,
            checkIn,
            checkOut,
            guests: { adults, children, infants },
        });
    };

    // Helper to determine if any section is active
    const isAnySectionActive = showDestination || showCheckIn || showCheckOut || showGuests;

    return (
        <div className="flex items-center bg-white rounded-full shadow-lg border-gray-300 p-1 w-3/4 max-w-4xl mt-4 mb-4">
            {/* Destination */}
            <button
                className={`flex-1 border-r border-gray-300 p-2 cursor-pointer relative ${
                    showDestination ? "bg-white rounded-l-full" : isAnySectionActive ? "bg-[#e8e8e8] rounded-l-full" : "bg-white rounded-l-full"
                }`} // White when active or no section is active, gray otherwise
                onClick={() => {
                    setShowDestination(!showDestination);
                    setShowCheckIn(false);
                    setShowCheckOut(false);
                    setShowGuests(false);
                }}
                ref={destRef}
            >
                <div className="font-semibold">Where</div>
                <div className="text-gray-500">{destination || "Search destinations"}</div>
                {showDestination && (
                    <div className="absolute top-16 left-0 bg-white shadow-lg rounded-3xl p-5 w-96 h-96 z-10 mt-4">
                        <p className="font-semibold text-gray-500 text-sm">Suggested destinations</p>
                        {destinations.map((dest) => (
                            <div
                                key={dest}
                                className="p-2 hover:bg-gray-100 cursor-pointer"
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

            {/* Check In */}
            <div
                className={`flex-1 border-r border-gray-300 p-2 cursor-pointer relative ${
                    showCheckIn ? "bg-white rounded-l-full" : isAnySectionActive ? "bg-[#e8e8e8]" : "bg-white rounded-l-full"
                }`} // White when active or no section is active, gray otherwise
                onClick={() => {
                    setShowCheckIn(!showCheckIn);
                    setShowDestination(false);
                    setShowCheckOut(false);
                    setShowGuests(false);
                }}
                ref={checkInRef}
            >
                <div className="font-semibold">Check in</div>
                <div className="text-gray-500">{checkIn || "Add dates"}</div>
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

            {/* Check Out */}
            <div
                className={`flex-1 border-r border-gray-300 p-2 cursor-pointer relative ${
                    showCheckOut ? "bg-white rounded-l-full" : isAnySectionActive ? "bg-[#e8e8e8] " : "bg-white rounded-l-full"
                }`} // White when active or no section is active, gray otherwise
                onClick={() => {
                    setShowCheckOut(!showCheckOut);
                    setShowDestination(false);
                    setShowCheckIn(false);
                    setShowGuests(false);
                }}
                ref={checkOutRef}
            >
                <div className="font-semibold">Check out</div>
                <div className="text-gray-500">{checkOut || "Add dates"}</div>
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

            {/* Guests */}
            <div
                className={`flex-1 p-2 cursor-pointer relative ${
                    showGuests ? "bg-white rounded-l-full" : isAnySectionActive ? "bg-[#e8e8e8]" : "bg-white rounded-l-full"
                }`} // White when active or no section is active, gray otherwise
                onClick={() => {
                    setShowGuests(!showGuests);
                    setShowDestination(false);
                    setShowCheckIn(false);
                    setShowCheckOut(false);
                }}
                ref={guestsRef}
            >
                <div className="font-semibold">Who</div>
                <div className="text-gray-500">
                    {adults + children + infants > 0 ? `${adults + children + infants} guests` : "Add guests"}
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
                                        <button className="px-2" onClick={() => setter(Math.max(0, value - 1))}>
                                            -
                                        </button>
                                        <span className="mx-2">{value}</span>
                                        <button className="px-2" onClick={() => setter(value + 1)}>
                                            +
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Search Button */}
            <button
                className="bg-pink-500 text-white rounded-full p-4 hover:bg-pink-600"
                onClick={handleSearch}
            >
                <svg
                    className="w-6 h-6"
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
            </button>
        </div>
    );
}

export default SearchBtn;