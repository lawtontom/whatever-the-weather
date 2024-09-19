import { location } from "../types/location";

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
                    <p>{location.country}</p>
                    <button onClick={() => setLocation(location)}>
                        View weather
                    </button>
                </article>
            ))}
        </section>
    );
};
