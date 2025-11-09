import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaSearch,
  FaPhone,
  FaCrosshairs,
} from "react-icons/fa";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  InfoWindow,
} from "@react-google-maps/api";

// --- Types ---
interface Drive {
  location: string;
  date: string;
  time: string;
  organizer: string;
  city: string;
  lat: number;
  lng: number;
}

// --- Sample Drives ---
const sampleDrives: Drive[] = [
  {
    location: "City General Hospital",
    date: "Oct 12, 2025",
    time: "10:00 AM - 4:00 PM",
    organizer: "Red Hope Foundation",
    city: "Chennai",
    lat: 13.0827,
    lng: 80.2707,
  },
  {
    location: "SRM University Main Hall",
    date: "Oct 14, 2025",
    time: "9:00 AM - 3:30 PM",
    organizer: "Youth Bloodline",
    city: "Kattankulathur",
    lat: 12.8231,
    lng: 80.0453,
  },
  {
    location: "Metro Health Center",
    date: "Oct 18, 2025",
    time: "11:00 AM - 5:00 PM",
    organizer: "Rotary Club",
    city: "Tambaram",
    lat: 12.9249,
    lng: 80.1275,
  },
  {
    location: "Community Town Hall",
    date: "Oct 20, 2025",
    time: "10:30 AM - 4:30 PM",
    organizer: "LifeLink Volunteers",
    city: "Velachery",
    lat: 12.9791,
    lng: 80.2215,
  },
];

const FindDrive: React.FC = () => {
  const [query, setQuery] = useState("");
  const [filteredDrives, setFilteredDrives] = useState<Drive[]>(sampleDrives);
  const [places, setPlaces] = useState<google.maps.places.PlaceResult[]>([]);
  const [mapCenter, setMapCenter] = useState({ lat: 12.9716, lng: 77.5946 });
  const [selectedPlace, setSelectedPlace] = useState<google.maps.places.PlaceResult | null>(null);
  const [loading, setLoading] = useState(false);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string,
    libraries: ["places"],
  });

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  // 🧭 Auto-detect current location
  const detectLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setMapCenter({ lat: latitude, lng: longitude });
        await fetchNearbyPlaces(latitude, longitude);
        setLoading(false);
      },
      (error) => {
        alert("Location access denied. Please search manually.");
        console.error(error);
        setLoading(false);
      }
    );
  };

  // 🔍 Manual search handler
  const handleSearch = async () => {
    if (!query.trim()) return;

    const geoUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      query
    )}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
    const geoRes = await fetch(geoUrl);
    const geoData = await geoRes.json();

    if (geoData.results?.[0]) {
      const { lat, lng } = geoData.results[0].geometry.location;
      setMapCenter({ lat, lng });
      await fetchNearbyPlaces(lat, lng);
    }
  };

  // 🏥 Fetch hospitals & clinics nearby
  const fetchNearbyPlaces = async (lat: number, lng: number) => {
    const map = new google.maps.Map(document.createElement("div"), {
      center: { lat, lng },
      zoom: 13,
    });
    const service = new google.maps.places.PlacesService(map);

    const searchPlaces = (type: string) =>
      new Promise<google.maps.places.PlaceResult[]>((resolve) => {
        const request: google.maps.places.PlaceSearchRequest = {
          location: new google.maps.LatLng(lat, lng),
          radius: 5000,
          type,
        };
        service.nearbySearch(request, (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            resolve(results);
          } else resolve([]);
        });
      });

    const [hospitals, clinics] = await Promise.all([
      searchPlaces("hospital"),
      searchPlaces("clinic"),
    ]);
    setPlaces([...hospitals, ...clinics]);

    // Filter blood drives within ~15km
    const drivesNearby = sampleDrives.filter((d) => {
      const dist =
        6371 *
        Math.acos(
          Math.cos((lat * Math.PI) / 180) *
            Math.cos((d.lat * Math.PI) / 180) *
            Math.cos((d.lng - lng) * (Math.PI / 180)) +
            Math.sin((lat * Math.PI) / 180) *
              Math.sin((d.lat * Math.PI) / 180)
        );
      return dist < 15;
    });
    setFilteredDrives(drivesNearby);
  };

  return (
    <div className="font-sans bg-white text-slate-800">
      {/* Hero Section */}
      <section
        className="bg-gradient-to-r from-red-50 to-rose-50 py-28 text-center"
        data-aos="fade-up"
      >
        <h1 className="text-5xl font-extrabold mb-6">
          Find Hospitals, Clinics & Blood Drives Near You 🩸
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
          Automatically locate your nearest medical centers and donation drives or search manually by city.
        </p>

        <div className="flex justify-center gap-3 flex-wrap">
          {/* Manual Search */}
          <div className="flex items-center bg-white shadow-md rounded-full overflow-hidden w-full max-w-lg">
            <FaSearch className="text-slate-500 ml-4" />
            <input
              type="text"
              placeholder="Enter your city..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full px-4 py-3 focus:outline-none text-slate-700"
            />
          </div>
          <button
            onClick={handleSearch}
            className="bg-red-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-700 transition"
          >
            Search
          </button>

          {/* Detect Location Button */}
          <button
            onClick={detectLocation}
            className="bg-gray-800 text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2 hover:bg-gray-900 transition"
          >
            <FaCrosshairs /> Detect My Location
          </button>
        </div>

        {loading && (
          <p className="mt-4 text-slate-600 animate-pulse">
            Detecting your location...
          </p>
        )}
      </section>

      {/* Google Map */}
      <section className="py-16 bg-white" data-aos="fade-up">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Live Map — {query || "Your Location"}</h2>

          {isLoaded ? (
            <GoogleMap
              mapContainerStyle={{
                width: "100%",
                height: "500px",
                borderRadius: "1rem",
              }}
              center={mapCenter}
              zoom={12}
            >
              {/* 🩸 Drives */}
              {filteredDrives.map((d, i) => (
                <Marker
                  key={`drive-${i}`}
                  position={{ lat: d.lat, lng: d.lng }}
                  icon={{ url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png" }}
                  title={`${d.location} (${d.city})`}
                  onClick={() =>
                    window.open(
                      `https://www.google.com/maps/dir/?api=1&destination=${d.lat},${d.lng}`,
                      "_blank"
                    )
                  }
                />
              ))}

              {/* 🏥 Hospitals / Clinics */}
              {places.map((p, i) => {
                const lat = p.geometry?.location?.lat();
                const lng = p.geometry?.location?.lng();
                if (!lat || !lng) return null;

                return (
                  <Marker
                    key={`place-${i}`}
                    position={{ lat, lng }}
                    icon={{ url: "http://maps.google.com/mapfiles/ms/icons/hospitals.png" }}
                    title={p.name}
                    onClick={() => setSelectedPlace(p)}
                  />
                );
              })}

              {/* Info Window */}
              {selectedPlace && selectedPlace.geometry?.location && (
                <InfoWindow
                  position={{
                    lat: selectedPlace.geometry.location.lat(),
                    lng: selectedPlace.geometry.location.lng(),
                  }}
                  onCloseClick={() => setSelectedPlace(null)}
                >
                  <div>
                    <h4 className="font-bold text-red-600">{selectedPlace.name}</h4>
                    <p className="text-sm text-slate-600">
                      {selectedPlace.vicinity || "No address available"}
                    </p>
                    <button
                      onClick={() =>
                        window.open(
                          `https://www.google.com/maps/dir/?api=1&destination=${selectedPlace.geometry?.location?.lat()},${selectedPlace.geometry?.location?.lng()}`,
                          "_blank"
                        )
                      }
                      className="mt-2 bg-red-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Get Directions
                    </button>
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>
          ) : (
            <p>Loading map...</p>
          )}
        </div>
      </section>

      {/* Results */}
      <section className="py-20 container mx-auto px-6" data-aos="fade-up">
        <h2 className="text-3xl font-bold text-center mb-12">
          Nearby Hospitals, Clinics & Drives
        </h2>

        {places.length === 0 && filteredDrives.length === 0 && (
          <p className="text-center text-slate-600">
            No nearby places found. Try detecting location again or search another city.
          </p>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {places.map((p, i) => {
            const lat = p.geometry?.location?.lat();
            const lng = p.geometry?.location?.lng();
            if (!lat || !lng) return null;

            return (
              <div
                key={i}
                className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
              >
                <h4 className="text-xl font-semibold mb-2">{p.name}</h4>
                <p className="text-slate-700 text-sm">{p.vicinity || "No address available"}</p>
                <div className="mt-3 flex items-center gap-2">
                  <FaPhone className="text-red-500" />
                  <span className="text-slate-600 text-sm">
                    {p.formatted_phone_number || "N/A"}
                  </span>
                </div>
                <button
                  onClick={() =>
                    window.open(
                      `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
                      "_blank"
                    )
                  }
                  className="mt-3 bg-red-600 text-white px-4 py-2 rounded text-sm"
                >
                  Get Directions
                </button>
              </div>
            );
          })}
        </div>
      </section>

      <footer className="bg-slate-900 text-white py-12 text-center mt-12">
        <p className="text-slate-400">
          &copy; {new Date().getFullYear()} Sahaay. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default FindDrive;
