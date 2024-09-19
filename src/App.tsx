import { useEffect, useState } from "react";
import "./App.css";

import logo from "./assets/cloud-sun-rain-solid.svg";
import { LocationList } from "./components/LocationList";
import { WeatherResult } from "./components/WeatherResult";
import { location } from "./types/location";
import { dailyForecast } from "./types/dailyForecast";
import { weatherResponse } from "./types/weatherResponse";

const processWeatherData = (weather: weatherResponse) => {
    const forecast = weather.daily.time.reduce(
        (acc: dailyForecast[], time: string, index: number) => {
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
        },
        []
    );

    return forecast;
};

const App = () => {
    const [weather, setWeather] = useState<dailyForecast[]>([]);
    const [weatherLoaded, setWeatherLoaded] = useState<boolean>(false);
    const [locations, setLocations] = useState<location[]>([]);
    const [userLocation, setUserLocation] = useState<string>("");
    const [location, setLocation] = useState<location | null>(null);

    // Clear the weather data when the location changes
    useEffect(() => {
        if (location) {
            fetchWeather(location);
        }
    }, [location]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setWeather([]);
        setWeatherLoaded(false);
        fetchLocations(userLocation);
    };

    const fetchWeather = async (location: location) => {
        setWeatherLoaded(false);
        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min,wind_speed_10m_max,wind_direction_10m_dominant&timezone=Europe%2FLondon`
        );

        if (response.ok) {
            const data = await response.json();
            setWeather(processWeatherData(data));
            setWeatherLoaded(true);
        }
    };

    const fetchLocations = async (userLocation: string) => {
        const response = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${userLocation}&count=10&language=en&format=json`
        );

        if (response.ok) {
            const data = await response.json();
            setLocations(data.results);
        }
    };

    return (
        <main className="site-wrapper">
            <header>
                <img
                    className="logo"
                    src={logo}
                    alt="Whatever the Weather Logo"
                />
                <h1>Whatever the Weather</h1>
            </header>

            <section className="search-bar">
                <form onSubmit={handleSubmit} className="search-form">
                    <input
                        type="text"
                        placeholder="Enter a location"
                        aria-label="Enter a location"
                        value={userLocation}
                        onChange={(e) => setUserLocation(e.target.value)}
                    />
                    <button>Search</button>
                </form>
            </section>
            {weatherLoaded ? (
                <WeatherResult weather={weather} />
            ) : !userLocation ? (
                <p className="search-help">
                    Please search for a location to see the weather
                </p>
            ) : (
                <LocationList locations={locations} setLocation={setLocation} />
            )}
        </main>
    );
};

export default App;
