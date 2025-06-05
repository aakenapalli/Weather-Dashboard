
import WeatherCard from './WeatherCard';

export default function ForecastList({ forecast }) {
  return (
    <div className="forecast-list">
      {forecast.map(day => (
        <WeatherCard key={day.dt} weather={{
          name: new Date(day.dt * 1000).toLocaleDateString(),
          main: day.main,
          weather: day.weather
        }} />
      ))}
    </div>
  );
}
