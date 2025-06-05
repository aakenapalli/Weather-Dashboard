import { useState } from 'react';
import '../styles/SearchBar.css';

const cityList = [
  "New York", "Los Angeles", "Chicago", "Houston", "Phoenix",
  "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose",
  "London", "Paris", "Tokyo", "Toronto", "Mumbai", "Delhi", "Dubai"
];

export default function SearchBar({ onSearch }) {
  const [input, setInput] = useState('');
  const [filtered, setFiltered] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);
    if (value.length > 1) {
      const matches = cityList.filter(city =>
        city.toLowerCase().startsWith(value.toLowerCase())
      );
      setFiltered(matches);
    } else {
      setFiltered([]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim());
      setFiltered([]);
    }
  };

  const handleSuggestionClick = (city) => {
    setInput(city);
    onSearch(city);
    setFiltered([]);
  };

  return (
    <div className="search-bar-container">
      <form className="search-bar" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city name…"
          value={input}
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form>
      {filtered.length > 0 && (
        <ul className="suggestions">
          {filtered.map((city, index) => (
            <li key={index} onClick={() => handleSuggestionClick(city)}>
              {city}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
