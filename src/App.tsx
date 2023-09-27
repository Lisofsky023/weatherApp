// import React from 'react';
// import CitySearch from './components/CitySearch/CitySearch';
// import CityItem from './components/CityItem/CityItem';
// import useInitializeCities from './hooks/useInitializeCities';
// import useCityActions from './hooks/useCityActions';
// import { City } from './services/weatherTypes';

// function App() {
//   const initialCities = useInitializeCities();
//   const { citiesList, addCity, removeCity } = useCityActions(initialCities);

//   return (
//     <div className="App">
//       <CitySearch onCitySelect={addCity} />
//         {citiesList.map(city => (
//         <CityItem key={city.id} city={city} onRemove={removeCity} />
//       ))}
//     </div>
//   );
// }

// export default App;
import React from 'react';
import CitySearch from './components/CitySearch/CitySearch';
import CityItem from './components/CityItem/CityItem';
import useInitializeCities from './hooks/useInitializeCities';
import useCityActions from './hooks/useCityActions';
import { City } from './services/weatherTypes';

function App() {
  const initialCities = useInitializeCities();
  const { citiesList, addCity, removeCity } = useCityActions(initialCities);

  return (
    <div className="App">
      <CitySearch onCitySelect={addCity} />
        {citiesList.map((city: City) => ( // Явное указание типа для city
        <CityItem key={city.id} city={city} onRemove={removeCity} />
      ))}
    </div>
  );
}

export default App;
