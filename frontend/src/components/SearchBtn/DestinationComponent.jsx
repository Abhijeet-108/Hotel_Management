import { useState, useEffect } from "react";
import axios from "axios";

function DestinationComponent({
  destRef,
  showDestination,
  setShowDestination,
  setShowCheckIn,
  setShowCheckOut,
  setShowGuests,
  destination,
  setDestination,
}) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const staticDestinations = [
    { name: "Nearby", para: "Find what's around you" },
    { name: "New Delhi, Delhi", para: "India Gate & monuments" },
    { name: "Guwahati, Assam", para: "For nature lovers" },
    { name: "Darjeeling, West Bengal", para: "Hill station vibes" },
    { name: "Puri, Odisha", para: "Seaside charm" },
    { name: "Jaipur, Rajasthan", para: "Amber Fort & culture" },
    { name: "Puducherry", para: "Beach destination" },
    { name: "Patna, Bihar", para: "A hidden gem" },
    { name: "Kolkata", para: "City of joy" },
    { name: "Pune, Maharashtra", para: "Cultural hub" },
    { name: "South Goa", para: "Perfect summer getaway" },
  ];

  useEffect(() => {
    if (!query.trim()) {
      setSuggestions(staticDestinations);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/v1/map/get_suggestion`,
          {
            params: { input: query },
          }
        );

        setSuggestions(res.data?.data || []);
      } catch (err) {
        console.error("Suggestion error", err);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div ref={destRef} className="w-1/3 relative">
      {/* Input */}
      <button
        className={`w-full text-left px-4 py-3 rounded-full border 
        ${showDestination ? "bg-white" : "bg-gray-100 hover:bg-gray-200"}`}
        onClick={() => {
          setShowDestination(true);
          setShowCheckIn(false);
          setShowCheckOut(false);
          setShowGuests(false);
        }}
      >
        <p className="font-semibold">Where</p>
        <input
          type="text"
          value={query || destination}
          onChange={(e) => {
            setQuery(e.target.value);
            setDestination("");
          }}
          placeholder="Search destination"
          className="w-full bg-transparent outline-none text-gray-700"
        />
      </button>

      {/* Suggestions */}
      {showDestination && (
        <div className="absolute top-20 left-0 w-96 bg-white rounded-3xl shadow-xl p-4 max-h-96 overflow-auto z-50">
          <p className="text-sm font-semibold text-gray-500 mb-2">
            Suggested destinations
          </p>

          {loading && (
            <p className="text-sm text-gray-400">Searching...</p>
          )}

          {!loading &&
            suggestions.map((item, index) => {
              const label = item.description || item.name;

              return (
                <div
                  key={index}
                  className={`flex gap-3 p-3 rounded-xl cursor-pointer
                  ${
                    label === destination
                      ? "bg-gray-200"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => {
                    setQuery(label);
                    setDestination(label);
                  }}
                >
                  <div className="w-10 h-10 bg-gray-200 rounded-xl flex items-center justify-center">
                  📍
                </div>
                  <div>
                    <p className="font-semibold">{label}</p>
                    <p className="text-sm text-gray-500">
                      {item.structured_formatting?.secondary_text ||
                        item.para}
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}

export default DestinationComponent;
