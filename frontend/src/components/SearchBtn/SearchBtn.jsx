import React, { useState, useRef } from "react";
import useOutsideClick from "../useOutsideClick";
import DestinationComponent from "./DestinationComponent";
import CheckIn from "./CheckIn";
import CheckOut from "./CheckOut";
import Guest from "./Guest";

function SearchBtn() {
    const [showDestination, setShowDestination] = useState(false);
    const [destination, setDestination] = useState("");
    const [showCheckIn, setShowCheckIn] = useState(false);
    const [showCheckOut, setShowCheckOut] = useState(false);
    const [showGuests, setShowGuests] = useState(false);
    
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [adults, setAdults] = useState(0);
    const [children, setChildren] = useState(0);
    const [infants, setInfants] = useState(0);

    

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
        <div className="flex items-center shadow-lg border-gray-300 bg-white w-3/4 max-w-4xl mt-4 mb-4 rounded-full">
            {/* Destination */}
            <div className="w-2/5">
                <DestinationComponent
                    destRef={destRef}
                    isAnySectionActive={isAnySectionActive}
                    showDestination={showDestination}
                    setShowDestination={setShowDestination}
                    setShowCheckIn={setShowCheckIn}
                    setShowCheckOut={setShowCheckOut}
                    setShowGuests={setShowGuests}
                    destination={destination}
                    setDestination={setDestination}
                />
            </div>
            

            {/* Check In */}
            <div className="w-1/5">
                <CheckIn 
                    checkInRef={checkInRef}
                    isAnySectionActive={isAnySectionActive}
                    showCheckIn={showCheckIn}
                    setShowCheckIn={setShowCheckIn}
                    setShowDestination={setShowDestination}
                    setShowCheckOut={setShowCheckOut}
                    setShowGuests={setShowGuests}
                    checkIn={checkIn}
                    setCheckIn={setCheckIn}
                />
            </div>


            {/* Check Out */}
            <div className="w-1/6">
                <CheckOut
                    checkOutRef={checkOutRef}
                    isAnySectionActive={isAnySectionActive}
                    showCheckOut={showCheckOut}
                    setShowCheckOut={setShowCheckOut}
                    setShowDestination={setShowDestination}
                    setShowCheckIn={setShowCheckIn}
                    setShowGuests={setShowGuests}
                    checkOut={checkOut}
                    setCheckOut={setCheckOut}
                />
            </div>

            {/* Guests */}
            <div className="w-1/6">
                <Guest
                    guestsRef={guestsRef}
                    isAnySectionActive={isAnySectionActive}
                    showGuests={showGuests}
                    setShowGuests={setShowGuests}
                    setShowDestination={setShowDestination}
                    setShowCheckIn={setShowCheckIn}
                    setShowCheckOut={setShowCheckOut}
                    adults={adults}
                    setAdults={setAdults}
                    children={children}
                    setChildren={setChildren}
                    infants={infants}
                    setInfants={setInfants}
                />

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