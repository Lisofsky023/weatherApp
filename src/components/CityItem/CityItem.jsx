import React from 'react';

export default function CityItem({ city, onRemove }) {
  return (
    <div key={city.id}>
      {city.name}, {city.country}
      {city.weatherData && (
        <div>
          <p>Температура: {city.weatherData.current.temp_c}°C</p>
          <img src={city.weatherData.current.condition.icon} alt={city.weatherData.current.condition.text} />
          <p>{city.weatherData.current.condition.text}</p>
          <p>Влажность: {city.weatherData.current.humidity}%</p>
          <p>Ветер: {city.weatherData.current.wind_kph} км/ч</p>
        </div>
      )}
      <button onClick={() => onRemove(city.name)}>Удалить</button>
    </div>
  );
}
