// src/components/WeatherCard.jsx
export default function WeatherCard({ weather }) {
  const { name, main, weather: [info] } = weather;
  const iconUrl = `https://openweathermap.org/img/wn/${info.icon}@2x.png`;

  return (
    <div className="weather-card">
      <h2>{name}</h2>
      <img src={iconUrl} alt={info.description} />
      <p className="temp">{Math.round(main.temp)}°F</p>
      <p className="desc">{info.description}</p>
      <ul className="details">
        <li>Humidity: {main.humidity}%</li>
        <li>Pressure: {main.pressure} hPa</li>
      </ul>
    </div>
  );
}
