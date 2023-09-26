import { useState, useEffect } from 'react';
import { fetchSuggestions } from '../services/WeatherService';

export const useSuggestions = (query) => {
    const [suggestions, setSuggestions] = useState([]);
    const [error, setError] = useState(null);

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
};
