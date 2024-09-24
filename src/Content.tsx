import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { LocationList } from "./screens/LocationList";
import { Weather } from "./screens/Weather";

import { location } from "./types/location";

const fetchLocations = async (userLocation: string) => {
    const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${userLocation}&count=10&language=en&format=json`
    );

    return await response.json();
};

interface ContentProps {
    userLocation: string;
}
export const Content: React.FC<ContentProps> = ({ userLocation }) => {
    const [location, setLocation] = useState<location | null>(null);

    useEffect(() => {
        setLocation(null);
    }, [userLocation]);

    // Queries
    const { data, error, isLoading } = useQuery({
        queryKey: ["locations", userLocation],
        queryFn: () => {
            return fetchLocations(userLocation);
        },
    });
    //If the user has yet to submit a location, display a message
    if (!userLocation) {
        return (
            <p className="search-help">
                Please search for a location to see the weather.
            </p>
        );
    }

    //If there's been an error, display it
    if (error) {
        return <p className="error">{error.message}</p>;
    }

    //If there's a location selected, display the weather
    if (location) {
        return <Weather location={location} />;
    }

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (!data?.results || data.results.length === 0) {
        return <p>No locations found, please try a different search</p>;
    }

    //If there's data, display the location list
    return <LocationList locations={data.results} setLocation={setLocation} />;
};
