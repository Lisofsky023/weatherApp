// import { useState, useEffect } from 'react';
// import { fetchSuggestions } from '../services/WeatherService';
// import { Suggestion } from '../services/weatherTypes';
// import { useDebounce } from './useDebounce'

// export const useSuggestions = (query: string) => {
//     const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
//     const [error, setError] = useState<string | null>(null);
    
//     const debouncedQuery = useDebounce(query, 500);

//     useEffect(() => {
//         const fetch = async () => {
//             try {
//                 const data = await fetchSuggestions(debouncedQuery);
//                 setSuggestions(data);
//             } catch (error) {
//                 console.error("Error fetching suggestions:", error);
//                 setError("Произошла ошибка при получении данных. Пожалуйста, попробуйте позже.");
//             }
//         }
//         if (debouncedQuery) {
//             fetch();
//         } else {
//             setSuggestions([]);
//         }
//     }, [debouncedQuery]);

//     return { suggestions, error };
// }
import { useState, useEffect } from 'react';
import { fetchSuggestions } from '../services/WeatherService';
import { Suggestion } from '../services/weatherTypes';
import { useDebounce } from './useDebounce';

export const useSuggestions = (query: string) => {
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [error, setError] = useState<string | null>(null);

    const debouncedQuery = useDebounce(query, 500);

    useEffect(() => {
        const fetch = async () => {
            // Проверка localStorage на наличие данных
            const storedSuggestions = localStorage.getItem(`suggestions_${debouncedQuery}`);
            const storedTime = localStorage.getItem(`suggestionsTime_${debouncedQuery}`);
            const currentTime = new Date().getTime();
            const oneHour = 20 * 60 * 1000;

            if (storedSuggestions && storedTime && (currentTime - Number(storedTime) < oneHour)) {
                setSuggestions(JSON.parse(storedSuggestions));
            } else {
                try {
                    const data = await fetchSuggestions(debouncedQuery);
                    setSuggestions(data);

                    // Сохранение данных и текущего времени в localStorage
                    localStorage.setItem(`suggestions_${debouncedQuery}`, JSON.stringify(data));
                    localStorage.setItem(`suggestionsTime_${debouncedQuery}`, currentTime.toString());
                } catch (error) {
                    console.error("Error fetching suggestions:", error);
                    setError("Произошла ошибка при получении данных. Пожалуйста, попробуйте позже.");
                }
            }
        }

        if (debouncedQuery) {
            fetch();
        } else {
            setSuggestions([]);
        }
    }, [debouncedQuery]);

    return { suggestions, error };
}
