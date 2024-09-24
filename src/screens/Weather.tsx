import { dailyForecast } from "../types/dailyForecast";
import { WeatherCard } from "../components/WeatherCard";
import { location } from "../types/location";
import { weatherResponse } from "../types/weatherResponse";

import "../css/weatherResult.css";
import { useQuery } from "@tanstack/react-query";

const processWeatherData = (weather: weatherResponse) => {
    const forecast = weather.daily.time
        .slice(0, 5)
        .reduce((acc: dailyForecast[], time: string, index: number) => {
            const daily: dailyForecast = {
                time: time,
                weather_code: weather.daily.weather_code[index],
                temperature_2m_max: weather.daily.temperature_2m_max[index],
                temperature_2m_min: weather.daily.temperature_2m_min[index],
                wind_speed_10m_max: weather.daily.wind_speed_10m_max[index],
                wind_direction_10m_dominant:
                    weather.daily.wind_direction_10m_dominant[index],
            };

            return [...acc, daily];
        }, []);

    return forecast;
};
const fetchWeather = async (location: location) => {
    const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min,wind_speed_10m_max,wind_direction_10m_dominant&timezone=Europe%2FLondon`
    );

    return await response.json();
};
interface WeatherProps {
    location: location;
}
export const Weather: React.FC<WeatherProps> = ({ location }) => {
    const {
        data: weather,
        error,
        isLoading,
    } = useQuery({
        queryKey: ["weather", location.latitude, location.longitude],
        queryFn: () => fetchWeather(location),
    });

    if (error) {
        return <p className="error">{error.message}</p>;
    }

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            {location && (
                <h3 style={{ marginBottom: "1rem" }}>
                    Weather for {location.name}, {location.country}
                </h3>
            )}
            <section className="weather-result">
                {processWeatherData(weather).map((forecast) => (
                    <WeatherCard key={forecast.time} forecast={forecast} />
                ))}
            </section>
        </div>
    );
};
