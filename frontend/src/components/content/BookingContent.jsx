import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Header1 from "../Header/Header1.jsx";
import Footer from "../Footer/Footer.jsx";
import useOutsideClick from "../useOutsideClick";
import CheckIn from "../SearchBtn/CheckIn.jsx";

function BookingContent() {
    const { id } = useParams();
    const [hotel, setHotel] = useState(null);
    const hasFetched = useRef(false);

    const [showCheckIn, setShowCheckIn] = useState(false);
    const [showCheckOut, setShowCheckOut] = useState(false);

    const [checkIn, setCheckIn] = useState("");

    const checkInRef = useRef();
    const checkOutRef = useRef();

    useOutsideClick(checkInRef, () => setShowCheckIn(false));
    useOutsideClick(checkOutRef, () => setShowCheckOut(false));

    const isAnySectionActive = showCheckIn || showCheckOut;

    const fetchHotel = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_BASE_URL}/api/v1/property/${id}`
            );
            setHotel(response.data.data);
        } catch (error) {
            console.error("Error fetching hotel:", error);
        }
    };

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;
        fetchHotel();
    }, [id]);

    if (!hotel) return <h1 className="text-center mt-10">Loading...</h1>;

    return (
        <>
            <Header1 />

            {/* IMAGE SECTION */}
            <h1 className="text-2xl mx-20 pt-2 mt-2 font-semibold">{hotel.title}</h1>
            <div className="max-w-7xl mx-auto mt-6 px-4">
                <img
                    src={hotel.image}
                    alt={hotel.title}
                    className="w-full h-[420px] object-cover rounded-xl"
                />
            </div>

            {/* MAIN CONTENT */}
            <div className="max-w-7xl mx-auto px-4 mt-8 grid grid-cols-1 md:grid-cols-3 gap-10">

                {/* LEFT SECTION */}
                <div className="md:col-span-2">
                    <h1 className="text-2xl font-semibold">
                        {hotel.type} in {hotel.location}
                    </h1>

                    <p className="text-sm text-gray-600 mt-1">
                        2 guests · {hotel.bedrooms} bedrooms · 1 bed · {hotel.bathrooms} bathroom
                    </p>

                    <div className="border-b my-6" />

                    {/* HOST INFO */}
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gray-300" />
                        <div>
                            <p className="font-medium">
                                Hosted by {hotel.Host?.fullName}
                            </p>
                            <p className="text-sm text-gray-500">
                                Superhost · 2 months hosting
                            </p>
                        </div>
                    </div>

                    <div className="border-b my-6" />

                    {/* FEATURES */}
                    <div className="space-y-4 text-sm">
                        <div>
                            <p className="font-medium">Designed for staying cool</p>
                            <p className="text-gray-500">
                                Beat the heat with the A/C and ceiling fan.
                            </p>
                        </div>

                        <div>
                            <p className="font-medium">Self check-in</p>
                            <p className="text-gray-500">
                                Check yourself in with the lockbox.
                            </p>
                        </div>

                        <div>
                            <p className="font-medium">Free cancellation</p>
                            <p className="text-gray-500">
                                Get a full refund before check-in.
                            </p>
                        </div>
                    </div>
                </div>

                {/* RIGHT SECTION – BOOKING CARD */}
                <div className="border rounded-xl p-6 shadow-lg h-fit sticky top-24">
                    <p className="text-xl font-semibold">
                        ₹{hotel.price} <span className="text-sm font-normal">/ night</span>
                    </p>

                    <div className="border rounded-lg mt-4">
                        <div className="grid grid-cols-2 text-sm">
                            <div className="p-3 border-r">
                                <p className="font-medium">CHECK-IN</p>
                                <p>20/02/2026</p>
                            </div>
                            <div className="p-3">
                                <p className="font-medium">CHECKOUT</p>
                                <p>20/02/2026</p>
                            </div>
                        </div>
                        <div className="border-t p-3 text-sm">
                            <p className="font-medium">GUESTS</p>
                            <p>1 guest</p>
                        </div>
                    </div>

                    <button className="w-full mt-6 bg-rose-500 text-white py-3 rounded-lg font-semibold hover:bg-rose-600">
                        Reserve
                    </button>

                    <p className="text-center text-sm text-gray-500 mt-2">
                        You won’t be charged yet
                    </p>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default BookingContent;
