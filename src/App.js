import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import ForecastList from './components/ForecastList';
import './styles/App.css';
import './styles/SearchBar.css';
import './styles/WeatherCard.css';

export default function App() {
  console.log("Loaded API key:", process.env.REACT_APP_OPENWEATHER_KEY);

  const [city, setCity] = useState('');
  const [current, setCurrent] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!city) return;

    const key = process.env.REACT_APP_OPENWEATHER_KEY;
    const encodedCity = encodeURIComponent(city);
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${encodedCity}&units=imperial&appid=${key}`;
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${encodedCity}&units=imperial&appid=${key}`;

    console.log("Weather URL:", weatherURL);

    fetch(weatherURL)
      .then(res => {
        if (!res.ok) throw new Error("City not found");
        return res.json();
      })
      .then(data => {
        console.log("Current weather data:", data);
        setCurrent(data);
        setError('');
      })
      .catch(err => {
        console.error("Weather error:", err.message);
        setError("City not found or API error");
        setCurrent(null);
        setForecast([]);
      });

    fetch(forecastURL)
      .then(res => {
        if (!res.ok) throw new Error("Forecast fetch failed");
        return res.json();
      })
      .then(data => {
        if (!data.list) throw new Error("Forecast data is malformed");

        const daily = data.list.filter(item =>
          item.dt_txt.endsWith("12:00:00")
        );

        console.log("Filtered entries:", daily.map(f => f.dt_txt));

        const limited = daily.slice(0, 4);
        console.log("Filtered 4-day forecast:", limited);

        setForecast(limited);
      })
      .catch(err => {
        console.error("Forecast error:", err.message);
        setForecast([]);
      });
  }, [city]);

  return (
    <div className="app-container">
      <SearchBar onSearch={setCity} />
      {error && <p className="error">{error}</p>}
      {current && <WeatherCard weather={current} />}
      {forecast.length > 0 && <ForecastList forecast={forecast} />}
    </div>
  );
}
