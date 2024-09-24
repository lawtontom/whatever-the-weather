import { useEffect, useState } from "react";

import { LocationList } from "./screens/LocationList";
import { Weather } from "./screens/Weather";

import { location } from "./types/location";

interface ContentProps {
    userLocation: string;
}
export const Content: React.FC<ContentProps> = ({ userLocation }) => {
    const [location, setLocation] = useState<location | null>(null);

    useEffect(() => {
        setLocation(null);
    }, [userLocation]);

    //If the user has yet to submit a location, display a message
    if (!userLocation) {
        return (
            <p className="search-help">
                Please search for a location to see the weather.
            </p>
        );
    }

    //If there's a location selected, display the weather
    if (location) {
        return <Weather location={location} />;
    }

    //If there's data, display the location list
    return (
        <LocationList userLocation={userLocation} setLocation={setLocation} />
    );
};
