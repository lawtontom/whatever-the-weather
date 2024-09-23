import { dailyForecast } from "../types/dailyForecast";
import { WeatherCard } from "./WeatherCard";
import { location } from "../types/location";

import "../css/weatherResult.css";

interface WeatherResultProps {
    weather: dailyForecast[];
    location: location | null;
}
export const WeatherResult: React.FC<WeatherResultProps> = ({
    weather,
    location,
}) => {
    return (
        <div>
            {location && (
                <h3 style={{ marginBottom: "1rem" }}>
                    Weather for {location.name}, {location.country}
                </h3>
            )}
            <section className="weather-result">
                {weather.map((forecast) => (
                    <WeatherCard key={forecast.time} forecast={forecast} />
                ))}
            </section>
        </div>
    );
};
