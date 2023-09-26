import React from 'react';

export default function SuggestionsList({ suggestions, onSelect }) {
  return (
    <ul>
      {suggestions.map((city) => (
        <li key={city.id} onClick={() => onSelect(city)}>
          {city.name}, {city.country}
        </li>
      ))}
    </ul>
  );
}