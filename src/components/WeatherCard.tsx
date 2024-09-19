import { dailyForecast } from "../types/dailyForecast";

interface WeatherCardProps {
    forecast: dailyForecast;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ forecast }) => {
    return (
        <article className="weather-display">
            <h2>{forecast.time}</h2>
            <div className="weather-icon">
                <img
                    src="https://www.weatherbit.io/static/img/icons/r01d.png"
                    alt="Clear sky"
                />
            </div>

            <div className="weather-info">
                <p className="weather-temp">{forecast.temperature_2m_max}</p>
                <p className="weather-description">{forecast.weather_code}</p>
            </div>
        </article>
    );
};
