import { useState, useEffect } from 'react';
import { fetchSuggestions } from '../services/WeatherService.js';
import { Suggestion } from '../services/weatherTypes.js';

export const useSuggestions = (query: string) => {
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetch = async () => {
            try {
                const data = await fetchSuggestions(query);
                setSuggestions(data);
            } catch (error) {
                console.error("Error fetching suggestions:", error);
                setError("Произошла ошибка при получении данных. Пожалуйста, попробуйте позже.");
            }
        }
        if (query) {
            fetch();
        } else {
            setSuggestions([]);
        }
    }, [query]);

    return { suggestions, error };
}
