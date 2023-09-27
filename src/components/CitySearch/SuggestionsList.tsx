import React from 'react';
import { Suggestion } from '../../services/weatherTypes';

interface SuggestionsListProps {
  suggestions: Suggestion[];
  onSelect: (selectedCity: Suggestion) => void;
}

const SuggestionsList: React.FC<SuggestionsListProps> = ({ suggestions, onSelect }) => {
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

export default SuggestionsList;
