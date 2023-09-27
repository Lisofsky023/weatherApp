import React from 'react';
import CitySearch from './components/CitySearch/CitySearch';
import CityItem from './components/CityItem/CityItem';
import useInitializeCities from './hooks/useInitializeCities';
import useCityActions from './hooks/useCityActions';

function App() {
  const initialCities = useInitializeCities();
  const { citiesList, addCity, removeCity } = useCityActions(initialCities);

  return (
    <div className="App">
      <CitySearch onCitySelect={addCity} />
        {citiesList.map(city => (
        <CityItem key={city.id} city={city} onRemove={removeCity} />
      ))}
    </div>
  );
}

export default App;