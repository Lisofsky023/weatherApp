import React from 'react';
import { Suggestion } from '../../services/weatherTypes';

// Типизация для свойств компонента
interface SuggestionsListProps {
  // Массив предложений (городов)
  suggestions: Suggestion[];
  // Функция обратного вызова, вызываемая при выборе города из списка
  onSelect: (selectedCity: Suggestion) => void;
}

const SuggestionsList: React.FC<SuggestionsListProps> = ({ suggestions, onSelect }) => {
  return (
    <ul className='suggestions'>
      {/* Отображаем каждое предложение в списке */}
      {suggestions.map((city) => (
        // При клике на элемент списка вызываем функцию обратного вызова и передаем в нее выбранный город
        <li className='suggestions__item' key={city.id} onClick={() => onSelect(city)}>
          {/* Отображаем название города и страну */}
          {city.name}, {city.country}
        </li>
      ))}
    </ul>
  );
}

export default SuggestionsList;
