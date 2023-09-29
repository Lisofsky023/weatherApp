import React from 'react';
import CitySearch from './components/CitySearch/CitySearch';
import CityItem from './components/CityItem/CityItem';
import useInitializeCities from './hooks/useInitializeCities';
import useCityActions from './hooks/useCityActions';
import './App.scss';

function App() {
  // Инициализация начального списка городов, возможно, из localStorage или другого источника.
  const initialCities = useInitializeCities();
  // Используется хук, который предоставляет основные действия по управлению списком городов: добавление, удаление.
  // При этом initialCities передается как аргумент для предустановки начального состояния.
  const { citiesList, addCity, removeCity } = useCityActions(initialCities);

  return (
    <div className="App">
      <div className="container">
        {/* Компонент для поиска и выбора городов. 
           При выборе города вызывается функция addCity. */}
      <CitySearch onCitySelect={addCity} />
        {/* Отображение списка выбранных городов. 
           Каждый элемент списка предоставляет возможность удалить город из списка. */}
      <ul className="cities">
        {citiesList.map(city => (
          <CityItem key={city.id} city={city} onRemove={removeCity} />
      ))}
      </ul>
      </div>
    </div>
  );
}

export default App;


