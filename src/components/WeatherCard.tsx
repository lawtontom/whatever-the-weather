import { dailyForecast } from "../types/dailyForecast";
import weatherCodes from "../data/weatherCodes.json";

interface WeatherCode {
    day: {
        description: string;
        image: string;
    };
    night: {
        description: string;
        image: string;
    };
}

interface WeatherCardProps {
    forecast: dailyForecast;
}

const weatherCodesTyped: { [key: string]: WeatherCode } = weatherCodes;

const getWeatherDescription = (code: number) => {
    //Cast the code to a string to use it as a key
    const weatherCode = code.toString();
    console.log(weatherCode);
    const weatherCodeResult = weatherCodesTyped[weatherCode];
    return (
        weatherCodeResult ?? {
            day: {
                description: "Sunny",
                image: "http://openweathermap.org/img/wn/01d@2x.png",
            },
            night: {
                description: "Clear",
                image: "http://openweathermap.org/img/wn/01n@2x.png",
            },
        }
    );
};

export const WeatherCard: React.FC<WeatherCardProps> = ({ forecast }) => {
    const weatherDescription = getWeatherDescription(forecast.weather_code);

    const date = new Date(forecast.time);
    return (
        <article className="weather-card">
            <h2> {date.toLocaleDateString("en-us", { weekday: "long" })}</h2>
            <h4> {date.toLocaleDateString()}</h4>
            <div className="weather-icon">
                <img
                    src={weatherDescription.day.image}
                    alt={weatherDescription.day.description}
                    title={weatherDescription.day.description}
                />
            </div>

            <div className="weather-info">
                <p className="weather-description">
                    {weatherDescription.day.description}
                </p>
                <p className="weather-temp">
                    {forecast.temperature_2m_min}°C -{" "}
                    {forecast.temperature_2m_max}°C
                </p>
                <p className="weather-wind">
                    {forecast.wind_speed_10m_max}km/h
                </p>
            </div>
        </article>
    );
};
