import { useState } from "react";
import { Content } from "./Content";
import "./App.css";

import logo from "./assets/cloud-sun-rain-solid.svg";

const App = () => {
    const [userLocation, setUserLocation] = useState<string>("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const input = form.elements.namedItem(
            "userLocation"
        ) as HTMLInputElement;
        setUserLocation(input.value);
    };

    return (
        <main className="site-wrapper">
            <header className="header">
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
                        name="userLocation"
                        type="text"
                        placeholder="Enter a location"
                        aria-label="Enter a location"
                        // value={userLocation}
                        // onChange={(e) => setUserLocation(e.target.value)}
                    />
                    <button>Search</button>
                </form>
            </section>
            <section className="content">
                <Content userLocation={userLocation} />
            </section>
        </main>
    );
};

export default App;
