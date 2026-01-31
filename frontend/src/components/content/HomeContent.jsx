import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function HomeContent() {
    const [hotels, setHotels] = useState([]);
    const [locate, setLocate] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setLocate({
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                });
                // console.log("Current Position:", lat, lng);
            },
            (err) => {
                console.error("Error getting location:", err);
            }
        )
    },[]);

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_BASE_URL}/api/v1/property`
                );
                // const location = await fetch(
                //     `${import.meta.env.VITE_API_BASE_URL}/api/v1/map/get_coordinates`,
                //     {
                //         params: { input: locate },
                //     }
                // )
                const result = await response.json();

                // const locData = await location.json();
                // console.log("LOCATION DATA:", locData);

                // console.log("API RESPONSE:", result);
                setHotels(result.data || []);
            } catch (error) {
                console.error("Error fetching hotels:", error);
            }
        };

        fetchHotels();
    }, []);

    const getDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371;
        const dLat = ((lat2 - lat1) * Math.PI) / 180;
        const dLon = ((lon2 - lon1) * Math.PI) / 180;
        const a = 
            Math.sin(dLat / 2) ** 2 +
            Math.cos(lat1 * Math.PI / 180) *
            Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) ** 2;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        // console.log("Distance:", R * c);
        return R * c;
    }

    const nearbyHotels = locate ? hotels.filter(
        hotel => getDistance(locate.lat, locate.lng, hotel.lat, hotel.lng) <= 50
    ):[];

    const renderHotels = (title, data) => (
        <div className="m-8">
            <h2 className="text-xl font-semibold mb-3">{title}</h2>
            <div className="flex flex-wrap gap-4">
                {data.map(hotel => (
                    <div key={hotel.id} className="w-[200px]" 
                    onClick={() => navigate(`/property/${hotel.id}`)}>
                        <img
                            src={hotel.image}
                            className="rounded-lg"
                            alt={hotel.title}
                        />
                        <h3 className="text-sm font-semibold">
                            {hotel.title} in {hotel.location}
                        </h3>
                        <p className="text-xs text-gray-500">
                            ₹{hotel.price} · ★ {hotel.avgRating || 4.5}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <>
            {renderHotels("🏠 Nearby stays", nearbyHotels)}
            {renderHotels(
                "📍 Popular in Delhi",
                hotels.filter(h =>
                    h.location?.toLowerCase().includes("delhi")
                )
            )}
            {renderHotels(
                "🌴 Stay in Kolkata",
                hotels.filter(h =>
                    h.location?.toLowerCase().includes("kolkata")
                )
            )}
            {renderHotels(
                "🌆 Stay in Bengaluru",
                hotels.filter(h =>
                    h.location?.toLowerCase().includes("bengaluru")
                )
            )}
            {renderHotels(
                "🏖️ Weekend in Puri",
                hotels.filter(h =>
                    h.location?.toLowerCase().includes("puri")
                )
            )}
        </>
    );
}

export default HomeContent;
