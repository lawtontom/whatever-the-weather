import { useQuery } from "@tanstack/react-query";

import { location } from "../types/location";

import "../css/locationList.css";

const fetchLocations = async (userLocation: string) => {
    const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${userLocation}&count=10&language=en&format=json`
    );

    return await response.json();
};
interface LocationListProps {
    userLocation: string;
    setLocation: (location: location) => void;
}

export const LocationList: React.FC<LocationListProps> = ({
    userLocation,
    setLocation,
}) => {
    const { data, error, isLoading } = useQuery({
        queryKey: ["locations", userLocation],
        queryFn: () => {
            return fetchLocations(userLocation);
        },
    });
    //If there's been an error, display it
    if (error) {
        return <p className="error">{error.message}</p>;
    }

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (!data?.results || data.results.length === 0) {
        return <p>No locations found, please try a different search</p>;
    }

    return (
        <section className="location-list">
            {data.results.map((location: location) => (
                <article key={location.id} className="location-card">
                    <h2>{location.name}</h2>
                    <p>{location.admin1}</p>
                    <p>{location.admin2}</p>
                    <p>{location.country}</p>
                    <p
                        style={{
                            display: "flex",
                            alignItems: "end",
                            flexGrow: 1,
                        }}
                    >
                        <button onClick={() => setLocation(location)}>
                            View weather
                        </button>
                    </p>
                </article>
            ))}
        </section>
    );
};
