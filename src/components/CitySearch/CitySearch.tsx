import React, { useState } from 'react';
import SearchInput from './SearchInput';
import SuggestionsList from './SuggestionsList';
import { useSuggestions } from '../../hooks/useSuggestions';
import { Suggestion } from '../../services/weatherTypes';

interface CitySearchProps {
    onCitySelect: (city: Suggestion) => void;
  }

  const CitySearch: React.FC<CitySearchProps> = ({ onCitySelect }) => {
    const [query, setQuery] = useState<string>('');
    const { suggestions, error } = useSuggestions(query);
  
    return (
      <div>
          <SearchInput
              value={query}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
              placeholder="Введите название города..."
          />
          {error && <div className="error">{error}</div>}
          {suggestions.length > 0 && (
              <SuggestionsList suggestions={suggestions} onSelect={onCitySelect} />
          )}
      </div>
    );
  }
  
  export default CitySearch;
