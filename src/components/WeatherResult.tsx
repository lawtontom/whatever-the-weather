import { dailyForecast } from "../types/dailyForecast";
import { WeatherCard } from "./WeatherCard";

interface WeatherResultProps {
    weather: dailyForecast[];
}
export const WeatherResult: React.FC<WeatherResultProps> = ({ weather }) => {
    return (
        <section>
            {weather.map((forecast) => (
                <WeatherCard key={forecast.time} forecast={forecast} />
            ))}
        </section>
    );
};
