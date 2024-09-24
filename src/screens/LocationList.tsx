import { location } from "../types/location";

import "../css/locationList.css";
interface LocationListProps {
    locations: location[];
    setLocation: (location: location) => void;
}

export const LocationList: React.FC<LocationListProps> = ({
    locations,
    setLocation,
}) => {
    return (
        <section className="location-list">
            {locations.map((location) => (
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
