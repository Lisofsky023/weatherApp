import React, { useState } from 'react';
import SearchInput from './SearchInput';
import SuggestionsList from './SuggestionsList';
import { useSuggestions } from '../../hooks/useSuggestions';

export default function CitySearch({ onCitySelect }) {
  const [query, setQuery] = useState('');
  const { suggestions, error } = useSuggestions(query);

    return (
        <div>
            <SearchInput
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Введите название города..."
            />
            {error && <div className="error">{error}</div>}
            {suggestions.length > 0 && (
                <SuggestionsList suggestions={suggestions} onSelect={onCitySelect} />
            )}
        </div>
    );
}
